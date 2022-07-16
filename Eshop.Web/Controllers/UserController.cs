using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Eshop.APIs.AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet("Public")]
        public IActionResult PublicTest()
        {
            return Ok("Yo");
        }

        [HttpGet("Private")]
        [Authorize(Roles = "Admin")]
        public IActionResult PrivateTest()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = _userService.Get(identity);

                if (user != null)
                    return Ok(user);
            }

            return NotFound("User not found");

        }
    }
}
