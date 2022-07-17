using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface ICategoryService
    {
        Task<IEnumerable<Category>> GetAll();

        Task<Category?> Get(long id);

        Task<Category> Create(string name);

        Task<Category?> Update(long id, string name);

        Task<Category?> Remove(long id);
    }
}
