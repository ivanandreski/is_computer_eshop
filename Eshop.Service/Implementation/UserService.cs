//using System;
//using System.Collections.Generic;
//using System.IdentityModel.Tokens.Jwt;
//using System.Linq;
//using System.Security.Claims;
//using System.Security.Cryptography;
//using System.Text;
//using System.Threading.Tasks;
//using Eshop.Domain.Dto;
//using Eshop.Domain.Identity;
//using Eshop.Domain.ValueObjects;
//using Eshop.Repository.Interface;
//using Eshop.Service.Interface;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.Extensions.Configuration;
//using Microsoft.IdentityModel.Tokens;

//namespace Eshop.Service.Implementation
//{
//    public class UserService : IUserService
//    {
//        private readonly IUserRepository _userRepository;
//        private readonly IConfiguration _config;
//        private readonly UserManager<EshopUser> _userManager;
//        private readonly RoleManager<IdentityRole> _roleManager;

//        public UserService(IUserRepository userRepository, IConfiguration config, UserManager<EshopUser> userManager, RoleManager<IdentityRole> roleManager)
//        {
//            _userRepository = userRepository;
//            _config = config;
//            _userManager = userManager;
//            _roleManager = roleManager;
//        }

//        public async Task<EshopUser?> Authenticate(UserLogin userLogin)
//        {
//            //var currentUser = _userRepository.GetAll()
//            //    .Where(user => user.UserName.Equals(userLogin.UserName))
//            //    .FirstOrDefault();

//            //if (currentUser == null)
//            //    return null;

//            //if (!_hashService.PasswordsMatch(userLogin.Password, currentUser))
//            //    return null;

//            //return currentUser;


//            var user = await _userManager.FindByNameAsync(userLogin.UserName);
//            if (user != null && await _userManager.CheckPasswordAsync(user, userLogin.Password))
//            {
//                var userRoles = await _userManager.GetRolesAsync(user);

//                var authClaims = new List<Claim>
//                {
//                    new Claim(ClaimTypes.Name, user.UserName),
//                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
//                };

//                foreach (var userRole in userRoles)
//                {
//                    authClaims.Add(new Claim(ClaimTypes.Role, userRole));
//                }

//                var token = CreateToken(authClaims);
//                var refreshToken = GenerateRefreshToken();

//                _ = int.TryParse(_configuration["JWT:RefreshTokenValidityInDays"], out int refreshTokenValidityInDays);

//                user.RefreshToken = refreshToken;
//                user.RefreshTokenExpiryTime = DateTime.Now.AddDays(refreshTokenValidityInDays);

//                await _userManager.UpdateAsync(user);

//                return Ok(new
//                {
//                    Token = new JwtSecurityTokenHandler().WriteToken(token),
//                    RefreshToken = refreshToken,
//                    Expiration = token.ValidTo
//                });
//            }
//            return Unauthorized();
//        }

//        public async Task<TokenModel> Generate(EshopUser user)
//        {
//            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//            var claims = new[]
//            {
//            new Claim(ClaimTypes.NameIdentifier, user.UserName),
//                new Claim(ClaimTypes.Email, user.Email),
//                new Claim(ClaimTypes.GivenName, user.FirstName),
//                new Claim(ClaimTypes.Surname, user.LastName),
//                new Claim(ClaimTypes.Role, user.Role)
//            };

//            var token = new JwtSecurityToken(_config["Jwt:Issuer"],
//                _config["Jwt:Audience"],
//                claims,
//                expires: DateTime.Now.AddMinutes(1000000),
//                signingCredentials: credentials);

//            var result = new JwtSecurityTokenHandler().WriteToken(token);
//            var refreshToken = GenerateRefreshToken();

//            return new TokenModel { Token = result, RefreshToken = refreshToken };
//        }

//        public async Task<string> GenerateRefreshToken()
//        {
//            var randomNumber = new byte[64];
//            using var rng = RandomNumberGenerator.Create();
//            rng.GetBytes(randomNumber);
//            return Convert.ToBase64String(randomNumber);
//        }

//        public async Task<EshopUser?> Get(ClaimsIdentity identity)
//        {
//            if(identity != null)
//            {
//                var userClaims = identity.Claims;
//                var userName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.NameIdentifier)?.Value;

//                return _userRepository.Get(userName);
//            }

//            return null;
//        }

//        public async Task<string> Register(UserRegisterDto dto)
//        {
//            if (UserExists(dto))
//                return "User with username or password already exists";

//            if (dto.Password == null) return "Password is invalid";

//            if (!PasswordIsValid(dto.Password))
//                return "Password is not valid";

//            var user = DtoToUser(dto);
//            user.Role = "User";
//            _userRepository.Create(user);

//            return "User created successfully";
//        }

//        public async Task<bool> UserExists(UserRegisterDto dto)
//        {
//            return _userRepository.GetAll()
//                .Any(user => user.Email.Equals(dto.Email)
//                || user.UserName.Equals(dto.UserName));
//        }

//        private async Task<EshopUser> DtoToUser(UserRegisterDto dto)
//        {
//            var user = new EshopUser();
//            user.UserName = dto.UserName;
//            user.Email = dto.Email;
//            user.Password = _hashService.GetHashedPassword(dto.Password);
//            user.FirstName = dto.FirstName;
//            user.LastName = dto.LastName;

//            return user;
//        }

//        public async Task<bool> PasswordIsValid(string Password)
//        {
//            // TODO: implement password validator

//            return true;
//        }
//    }
//}
