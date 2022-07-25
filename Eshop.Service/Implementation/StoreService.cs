using Eshop.Domain.Dto;
using Eshop.Domain.Model;
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

        public StoreService(IRepository<Store> storeRepository)
        {
            _storeRepository = storeRepository;
        }

        public async Task<Store> Create(StoreDto dto)
        {
            var store = DtoToStore(dto);

            return await _storeRepository.Create(store);
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
            store.Address = new Address(dto.Street, dto.City, dto.State, dto.ZipCode, dto.Country);
#pragma warning restore CS8604 // Possible null reference argument.

            return await _storeRepository.Update(store);
        }

        private Store DtoToStore(StoreDto dto)
        {
            var store = new Store();
            store.Name = dto.Name;
#pragma warning disable CS8604 // Possible null reference argument.
            store.Address = new Address(dto.Street, dto.City, dto.State, dto.ZipCode, dto.Country);
#pragma warning restore CS8604 // Possible null reference argument.

            return store;
        }
    }
}
