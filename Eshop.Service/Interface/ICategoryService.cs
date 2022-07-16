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
        List<Category> GetAll();

        Category? Get(string hashedId);

        void Create(string name);

        void Update(string hashedId, string name);

        void Remove(string hashedId);
    }
}
