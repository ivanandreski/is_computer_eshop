using Eshop.Domain.Dto;
using Eshop.Domain.Model;
using Eshop.Domain.ValueObjects;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
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
        private readonly IHashService _hashService;

        public ProductService(IRepository<Product> productRepository, IRepository<Category> categoryRepository, IHashService hashService)
        {
            _productRepository = productRepository;
            _categoryRepository = categoryRepository;
            _hashService = hashService;
        }

        public async Task<Product?> Create(ProductDto dto)
        {
            var product = await DtoToProduct(dto);
            if (product == null)
                return null;

            return await _productRepository.Create(product);
        }

        public async Task<Product?> Get(long id)
        {
            return await _productRepository.Get(id);
        }

        public async Task<IEnumerable<Product>> GetAll()
        {
            return await _productRepository.GetAll();
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
            product.Price.BasePrice = edits.Price.BasePrice;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
            product.Manufacturer = edits.Manufacturer;
            product.Category = edits.Category;
            product.CategoryId = edits.CategoryId;
            product.Image = edits.Image;
            product.Discontinued = edits.Discontinued;

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

            // TODO: more file validation
            if(dto.Image != null)
            {
                if (dto.Image.Length > 0)
                {
                    using (var ms = new MemoryStream())
                    {
                        dto.Image.CopyTo(ms);
                        var fileBytes = ms.ToArray();
                        product.Image = fileBytes;
                    }
                }
            }

            if (dto.CategoryIdHash == null) return null;
            var rawCategoryId = _hashService.GetRawId(dto.CategoryIdHash);
            if (rawCategoryId == null) return null;

            var category = await _categoryRepository.Get(rawCategoryId.Value);
            if (category == null) return null;

            product.Category = category;
            product.CategoryId = rawCategoryId.Value;

            return product;
        }
    }
}
