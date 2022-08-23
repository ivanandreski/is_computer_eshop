using Eshop.Domain.Dto;
using Eshop.Domain.Projections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IRepository<T>
    {
        PagedList<T> GetPaged(PagingParameters pagingParams);

        Task<IEnumerable<T>> GetAll();

        Task<T?> Get(long id);

        Task<T> Create(T entity);

        Task<T> Update(T entity);

        Task<T> Remove(T entity);

        Task<int> Count();
    }
}
