using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.ValueObjects;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
using Eshop.Domain.Projections;

namespace Eshop.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly UserManager<EshopUser> _userManager;

        public UserService(IUserRepository userRepository, UserManager<EshopUser> userManager)
        {
            _userRepository = userRepository;
            _userManager = userManager;
        }

        public async Task<List<EshopUserProjection>> GetEshopUsers(string? param)
        {
            List<EshopUserProjection> result = new List<EshopUserProjection>();
            var users = (await _userRepository.GetAll())
                .Where(user =>
                {
                    if (!param.IsNullOrEmpty())
                    {
                        return user.UserName.Contains(param) || user.Email.Contains(param);
                    }
                    return true;
                })
                .Take(20)
                .ToList();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);

                result.Add(new EshopUserProjection(user.UserName, user.Email, (List<string>)roles));
            }

            return result;
        }

        public async Task<EshopUserProjection?> SetRoles(SetRolesDto dto)
        {
            var user = await _userManager.FindByNameAsync(dto.Username);
            if (user == null) return null;

            await _userManager.RemoveFromRolesAsync(user, await _userManager.GetRolesAsync(user));
            await _userManager.AddToRolesAsync(user, dto.Roles);
            await _userManager.UpdateAsync(user);

            var roles = await _userManager.GetRolesAsync(user);

            return new EshopUserProjection(user.UserName, user.Email, (List<string>)roles);
        }

        public async Task<EshopUser?> GetByRefreshToken(string refreshToken)
        {
            return (await _userRepository.GetAll())
                .FirstOrDefault(x => x.RefreshToken == refreshToken);
        }

        public async Task<bool> UserExists(string username)
        {
            return (await _userRepository.GetAll())
                .Where(x => x.UserName == username)
                .Any();
        }

        public async Task<EshopUser?> GetUser(ClaimsIdentity identity)
        {
            var userClaims = identity.Claims;
            var username = userClaims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
            if (username != null)
            {
                return await _userManager.FindByNameAsync(username);
            }

            return null;
        }

        public async Task<UserDetailsDto?> EditDetails(EshopUser user, UserDetailsDto dto)
        {
            user.UserName = dto.Username;
            user.Email = dto.Email;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;
            user.PhoneNumber = dto.Phone;
            user.Address = dto.Address;

            await _userManager.UpdateAsync(user);
            return new UserDetailsDto(user);
        }
    }
}
