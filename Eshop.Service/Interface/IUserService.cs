using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Eshop.Domain.Dto;
using Eshop.Domain.Identity;

namespace Eshop.Service.Interface
{
    public interface IUserService
    {
        IEnumerable<EshopUser> GetAll();

        EshopUser? Get(ClaimsIdentity identity);

        EshopUser? Authenticate(UserLogin userLogin);
    }
}
