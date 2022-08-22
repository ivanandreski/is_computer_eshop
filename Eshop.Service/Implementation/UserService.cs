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
            (await _userRepository.GetAll())
                .Where(user =>
                {
                    if (!param.IsNullOrEmpty())
                    {
                        return user.UserName.Contains(param) || user.Email.Contains(param);
                    }
                    return true;
                })
                .Take(20)
                .ToList()
                .ForEach(async user =>
                {
                    var roles = await _userManager.GetRolesAsync(user);

                    result.Add(new EshopUserProjection(user.UserName, user.Email, (List<string>)roles));
                });

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

        public async Task<bool> UserExists(RegisterModel model)
        {
            return (await _userRepository.GetAll())
                .Where(x => x.UserName == model.Username || x.Email == model.Email)
                .Any();
        }
    }
}
