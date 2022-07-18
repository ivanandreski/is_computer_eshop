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
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace Eshop.Service.Implementation
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _config;

        public UserService(IUserRepository userRepository, IConfiguration config)
        {
            _userRepository = userRepository;
            _config = config;
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

        public Tokens Generate(EshopUser user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.UserName),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.GivenName, user.FirstName),
                new Claim(ClaimTypes.Surname, user.LastName),
                new Claim(ClaimTypes.Role, user.Role)
            };

            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
                _config["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(5),
                signingCredentials: credentials);

            var result = new JwtSecurityTokenHandler().WriteToken(token);
            var refreshToken = GenerateRefreshToken();

            return new Tokens { Token = result, RefreshToken = refreshToken };
        }

        public string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
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

        public string Register(UserRegisterDto dto)
        {
            if (UserExists(dto))
                return "User with username or password already exists";

            if (!PasswordIsValid(dto.Password))
                return "Password is not valid";

            var user = DtoToUser(dto);
            user.Role = "User";
            _userRepository.Create(user);

            return "User created successfully";
        }

        public bool UserExists(UserRegisterDto dto)
        {
            return _userRepository.GetAll()
                .Any(user => user.Email.Equals(dto.Email)
                || user.UserName.Equals(dto.UserName));
        }

        private EshopUser DtoToUser(UserRegisterDto dto)
        {
            var user = new EshopUser();
            user.UserName = dto.UserName;
            user.Email = dto.Email;
            user.Password = dto.Password;
            user.FirstName = dto.FirstName;
            user.LastName = dto.LastName;

            return user;
        }

        public bool PasswordIsValid(string Password)
        {
            // TODO: implement password validator

            return true;
        }
    }
}
