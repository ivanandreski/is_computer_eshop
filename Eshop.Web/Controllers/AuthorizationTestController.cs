using Eshop.Domain.Identity;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Eshop.APIs.AuthenticationService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthorizationTestController : ControllerBase
    {
        private readonly UserManager<EshopUser> _userManager;

        public AuthorizationTestController(UserManager<EshopUser> userManager)
        {
            _userManager = userManager;
        }

        [HttpGet("Public")]
        public IActionResult PublicTest()
        {
            return Ok("Yo");
        }

        [HttpGet("Private")]
        [Authorize(Roles = "User")]
        public IActionResult PrivateTest()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                //var user = _userManager.FindByEmailAsync(identity);

                //if (user != null)
                //    return Ok(user);

                var userClaims = identity.Claims;
                var userName = userClaims.FirstOrDefault(o => o.Type == ClaimTypes.Name)?.Value;

                return Ok(_userManager.FindByNameAsync(userName));
            }

            return NotFound("User not found");

        }
    }
}
