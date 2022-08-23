using Eshop.Domain.Dto;
using Eshop.Domain.Images;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class ProductService : IProductService
    {
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<Category> _categoryRepository;
        private readonly IRepository<Store> _storeRepository;
        private readonly IRepository<ProductInStore> _productInStoreRepository;
        private readonly IRepository<ProductImages> _productImagesRepository;
        private readonly ITagService _tagService;
        private readonly IHashService _hashService;
        private Random random;

        public ProductService(IRepository<Product> productRepository, IRepository<Category> categoryRepository, IRepository<Store> storeRepository, IRepository<ProductInStore> productInStoreRepository, IRepository<ProductImages> productImagesRepository, ITagService tagService, IHashService hashService)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _storeRepository = storeRepository;
            _productInStoreRepository = productInStoreRepository;
            _productImagesRepository = productImagesRepository;
            _tagService = tagService;
            _hashService = hashService;
            random = new Random();
        }

        public async Task<Product?> Create(ProductDto dto)
        {
            var product = await DtoToProduct(dto);
            if (product == null)
                return null;

            product = await _productRepository.Create(product);

            var defaultImage = Convert.FromBase64String(DefaultImage.base64);

            if (dto.Image.Count < 1)
            {
                var image = new ProductImages();
                image.Image = defaultImage;
                image.Product = product;
                image.ProductId = product.Id;

                await _productImagesRepository.Create(image);
            }

            // more validation
            foreach (var imageDto in dto.Image)
            {
                if (imageDto.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        imageDto.CopyTo(ms);
                        var fileBytes = ms.ToArray();

                        var image = new ProductImages();
                        image.Image = fileBytes;
                        image.Product = product;
                        image.ProductId = product.Id;

                        await _productImagesRepository.Create(image);
                    }
                }
            }

            (await _storeRepository.GetAll())
                .ToList()
                .ForEach(async store =>
                {
                    var productInStore = new ProductInStore();
                    productInStore.ProductId = product.Id;
                    productInStore.Product = product;
                    productInStore.StoreId = store.Id;
                    productInStore.Store = store;
                    productInStore.Quantity = 0;

                    await _productInStoreRepository.Create(productInStore);
                });

            return product;
        }

        public async Task<Product?> Get(long id)
        {
            return await _productRepository.Get(id);
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            var param = new PagingParameters();
            param.PageNumber = (int)(await _productRepository.Count() / 12);

            return _productRepository.GetPaged(param);
        }

        public async Task<IEnumerable<ProductInStore>> GetAvailability(long id)
        {
            return (await _productInStoreRepository.GetAll())
                .Where(x => x.ProductId == id)
                .ToList();
        }

        public async Task<Product?> Remove(long id)
        {
            var product = await _productRepository.Get(id);
            if (product == null)
                return null;

            return await _productRepository.Remove(product);
        }

        public async Task<Product?> Update(long id, ProductDto dto)
        {
            var product = await _productRepository.Get(id);
            if (product == null)
                return null;

            var edits = await DtoToProduct(dto);
            if (edits == null)
                return null;

            product.Name = edits.Name;
            product.Description = edits.Description;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
            if (edits.Price.BasePrice != null && edits.Price.BasePrice > 0)
                product.Price.BasePrice = edits.Price.BasePrice;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            product.Manufacturer = edits.Manufacturer;
            product.Category = edits.Category;
            product.CategoryId = edits.CategoryId;
            product.Discontinued = edits.Discontinued;

            return await _productRepository.Update(product);
        }

        public async Task<Product?> AddImages(long id, IEnumerable<IFormFile> images)
        {
            var product = await _productRepository.Get(id);
            if (product == null)
                return null;

            foreach (var image in images)
            {
                if (image.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        image.CopyTo(ms);
                        var fileBytes = ms.ToArray();

                        var productImage = new ProductImages();
                        productImage.Image = fileBytes;
                        productImage.Product = product;
                        productImage.ProductId = product.Id;

                        await _productImagesRepository.Create(productImage);
                    }
                }
            }

            return await _productRepository.Update(product);
        }

        private async Task<Product?> DtoToProduct(ProductDto dto)
        {
            var product = new Product();
            product.Name = dto.Name;
            product.Manufacturer = dto.Manufacturer;
            product.Description = dto.Description;
            product.Price = new Money();
            product.Price.BasePrice = dto.BasePrice;
            product.Discontinued = dto.Discontinued;

            if (dto.CategoryIdHash == null) return null;
            var rawCategoryId = _hashService.GetRawId(dto.CategoryIdHash);
            if (rawCategoryId == null) return null;

            var category = await _categoryRepository.Get(rawCategoryId.Value);
            if (category == null) return null;

            product.Category = category;
            product.CategoryId = rawCategoryId.Value;

            return product;
        }

        public async Task<Product?> RemoveImage(long imageId)
        {
            var image = await _productImagesRepository.Get(imageId);

            if (image == null || image.ProductId == null) return null;

            var product = await _productRepository.Get(image.ProductId.Value);

            if (product == null) return null;

            await _productImagesRepository.Remove(image);

            if ((await _productImagesRepository.GetAll()).Where(i => i.ProductId == product.Id).ToList().Count < 1)
            {
                var defaultImage = Convert.FromBase64String(DefaultImage.base64);

                var noImageAvailable = new ProductImages();
                noImageAvailable.Image = defaultImage;
                noImageAvailable.Product = product;
                noImageAvailable.ProductId = product.Id;

                await _productImagesRepository.Create(noImageAvailable);
            }

            return await _productRepository.Get(product.Id);
        }

        public async Task<Product> ImportScrapedProduct(ProductScrapedDto dto)
        {
            var defaultImage = Convert.FromBase64String(DefaultImage.base64);

            var product = new Product();
            product.Name = dto.Name;
            product.Description = dto.Description;
            product.Manufacturer = dto.Manufacturer;
            product.Price = new Money();
            product.Price.BasePrice = dto.Price;
            product.Discontinued = false;

            var category = (await _categoryRepository.GetAll())
                .Where(category => category.Name == dto.Category)
                .First();
            product.CategoryId = category.Id;
            product.Category = category;

            product.Tags = _tagService.CreateTags(product);

            product = await _productRepository.Create(product);

            if(dto.ImageBase64.Count() < 1)
            {
                var productImage = new ProductImages();
                productImage.Product = product;
                productImage.ProductId = product.Id;
                productImage.Image = defaultImage;

                product.Images.Add(productImage);
            }
            else
            {
                foreach (var imageBase64 in dto.ImageBase64)
                {
                    var productImage = new ProductImages();
                    productImage.Product = product;
                    productImage.ProductId = product.Id;
                    productImage.Image = Convert.FromBase64String(imageBase64);

                    product.Images.Add(productImage);
                }
            }

            int i = 3;
            int randomInt = random.Next(1, 3);
            (await _storeRepository.GetAll())
                .ToList()
                .ForEach(async store =>
                {
                    var productInStore = new ProductInStore();
                    productInStore.ProductId = product.Id;
                    productInStore.Product = product;
                    productInStore.StoreId = store.Id;
                    productInStore.Store = store;

                    if (i == randomInt)
                        productInStore.Quantity = 0;
                    else
                        productInStore.Quantity = random.Next(0, 50);

                    await _productInStoreRepository.Create(productInStore);
                });

            return await _productRepository.Update(product);
        }
    }
}
