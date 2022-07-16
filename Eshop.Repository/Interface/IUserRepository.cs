using Eshop.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IUserRepository
    {
        IEnumerable<EshopUser> GetAll();

        EshopUser Get(string userName);

        void Create(EshopUser user);

        void Update(EshopUser user);

        void Delete(EshopUser user);
    }
}
