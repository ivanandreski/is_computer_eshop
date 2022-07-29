using Eshop.Domain.Dto;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class StoreService : IStoreService
    {
        private readonly IRepository<Store> _storeRepository;
        private readonly IRepository<Product> _productRepository;
        private readonly IRepository<ProductInStore> _productInStoreRepository;

        public StoreService(IRepository<Store> storeRepository, IRepository<Product> productRepository, IRepository<ProductInStore> productInStoreRepository)
        {
            _storeRepository = storeRepository;
            _productRepository = productRepository;
            _productInStoreRepository = productInStoreRepository;
        }

        public async Task<Store?> AddProduct(long productInStoreId, int quantity)
        {
            if (quantity < 0)
                return null;

            var productInStore = await _productInStoreRepository.Get(productInStoreId);
            if(productInStore == null)
            {
                return null;
            }

            var store = await _storeRepository.Get(productInStore.StoreId);
            var product = await _productRepository.Get(productInStore.ProductId);

            if (store == null || product == null)
                return null;

            productInStore.Quantity = quantity;

            await _productInStoreRepository.Update(productInStore);

            return store;
        }

        public async Task<Store> Create(StoreDto dto)
        {
            var store = DtoToStore(dto);

            store = await _storeRepository.Create(store);

            (await _productRepository.GetAll())
                .ToList()
                .ForEach(async product =>
                {
                    var productInStore = new ProductInStore();
                    productInStore.Product = product;
                    productInStore.ProductId = product.Id;
                    productInStore.Store = store;
                    productInStore.StoreId = store.Id;
                    productInStore.Quantity = 0;

                    await _productInStoreRepository.Create(productInStore);
                });

            return store;
        }

        public async Task<Store?> Get(long id)
        {
            return await _storeRepository.Get(id);
        }

        public async Task<IEnumerable<Store>> GetAll()
        {
            return await _storeRepository.GetAll();
        }

        public async Task<Store?> Remove(long id)
        {
            var store = await _storeRepository.Get(id);
            if (store == null)
                return null;

            return await _storeRepository.Remove(store);
        }

        public async Task<Store?> Update(long id, StoreDto dto)
        {
            var store = await _storeRepository.Get(id);
            if (store == null)
                return null;

            store.Name = dto.Name;
#pragma warning disable CS8604 // Possible null reference argument.
            store.Address = new Address(dto.Street, dto.City, dto.ZipCode, dto.Country);
#pragma warning restore CS8604 // Possible null reference argument.

            return await _storeRepository.Update(store);
        }

        private Store DtoToStore(StoreDto dto)
        {
            var store = new Store();
            store.Name = dto.Name;
#pragma warning disable CS8604 // Possible null reference argument.
            store.Address = new Address(dto.Street, dto.City, dto.ZipCode, dto.Country);
#pragma warning restore CS8604 // Possible null reference argument.

            return store;
        }
    }
}
