using Eshop.Domain.Dto;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IStoreService
    {
        Task<IEnumerable<Store>> GetAll();

        Task<Store?> Get(long id);

        Task<Store> Create(StoreDto dto);

        Task<Store?> Update(long id, StoreDto dto);

        Task<Store?> Remove(long id);
    }
}
