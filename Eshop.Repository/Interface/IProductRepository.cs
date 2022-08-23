using Eshop.Domain.Dto;
using Eshop.Domain.Model;
using Eshop.Domain.Projections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IProductRepository
    {
        PagedList<Product> GetPaged(PagingParameters pagingParams);

        Task<IEnumerable<Product>> GetAll();

        Task<Product?> Get(long id);

        Task<Product> Create(Product entity);

        Task<Product> Update(Product entity);

        Task<Product> Remove(Product entity);
    }
}
