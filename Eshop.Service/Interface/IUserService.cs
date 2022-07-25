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
        Task<IEnumerable<EshopUser>> GetAll();

        Task<EshopUser?> Get(ClaimsIdentity identity);

        Task<EshopUser?> Authenticate(LoginModel userLogin);

        Task<string> Register(RegisterModel dto);

        Task<TokenModel> Generate(EshopUser user);

        Task<string> GenerateRefreshToken();

        Task<bool> UserExists(RegisterModel dto);

        Task<bool> PasswordIsValid(string Password);
    }
}
