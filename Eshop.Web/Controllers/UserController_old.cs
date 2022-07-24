//using Eshop.Domain.Dto;
//using Eshop.Domain.Identity;
//using Eshop.Service.Interface;
//using Microsoft.AspNetCore.Authorization;
//using Microsoft.AspNetCore.Http;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.IdentityModel.Tokens;
//using System.IdentityModel.Tokens.Jwt;
//using System.Security.Claims;
//using System.Security.Cryptography;
//using System.Text;

//namespace Eshop.APIs.AuthenticationService.Controllers
//{
//    [Route("api/[controller]/[action]")]
//    [ApiController]
//    public class UserController : ControllerBase
//    {
//        private readonly IConfiguration _config;
//        private readonly IUserService _userService;

//        public UserController(IConfiguration config, IUserService userService, IHashService hashService)
//        {
//            _config = config;
//            _userService = userService;
//        }

//        [AllowAnonymous]
//        [HttpPost]
//        public IActionResult Login([FromBody] UserLogin userLogin)
//        {
//            var user = _userService.Authenticate(userLogin);

//            if (user != null)
//            {
//                var token = _userService.Generate(user);

//                return Ok(token);
//            }

//            return NotFound("Login error");
//        }

//        [AllowAnonymous]
//        [HttpPost]
//        public IActionResult Register([FromBody] UserRegisterDto dto)
//        {
//            var message = _userService.Register(dto);

//            if(!message.Equals("User created successfully"))
//                return BadRequest(message);

//            return Ok(message);
//        }

//        //private Tokens Generate(EshopUser user)
//        //{
//        //    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:Key"]));
//        //    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

//        //    var claims = new[]
//        //    {
//        //    new Claim(ClaimTypes.NameIdentifier, user.UserName),
//        //        new Claim(ClaimTypes.Email, user.Email),
//        //        new Claim(ClaimTypes.GivenName, user.FirstName),
//        //        new Claim(ClaimTypes.Surname, user.LastName),
//        //        new Claim(ClaimTypes.Role, user.Role)
//        //    };

//        //    var token = new JwtSecurityToken(_config["Jwt:Issuer"],
//        //        _config["Jwt:Audience"],
//        //        claims,
//        //        expires: DateTime.Now.AddMinutes(5),
//        //        signingCredentials: credentials);

//        //    var result = new JwtSecurityTokenHandler().WriteToken(token);
//        //    var refreshToken = GenerateRefreshToken();

//        //    return new Tokens { Token = result, RefreshToken = refreshToken };

//        //}

//        //private string GenerateRefreshToken()
//        //{
//        //    var randomNumber = new byte[64];
//        //    using var rng = RandomNumberGenerator.Create();
//        //    rng.GetBytes(randomNumber);
//        //    return Convert.ToBase64String(randomNumber);
//        //}
//    }
//}
