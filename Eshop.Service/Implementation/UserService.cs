using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;

namespace Eshop.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;

        public UserService(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public EshopUser? Authenticate(UserLogin userLogin)
        {
            // TODO: hash passwords

            var currentUser = _userRepository.GetAll()
                .Where(user => user.UserName.Equals(userLogin.UserName) &&
                    user.Password.Equals(userLogin.Password))
                .FirstOrDefault();

            if (currentUser != null)
                return currentUser;

            return null;
        }

        public EshopUser? Get(ClaimsIdentity identity)
        {
            if(identity != null)
            {
                var userClaims = identity.Claims;
                var userName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

                return _userRepository.Get(userName);
            }

            return null;
        }

        public IEnumerable<EshopUser> GetAll()
        {
            throw new NotImplementedException();
        }
    }
}
