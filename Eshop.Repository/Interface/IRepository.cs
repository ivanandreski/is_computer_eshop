using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();

        T Get(long id);

        void Create(T entity);

        void Update(T entity);

        void Remove(T entity);
    }
}
