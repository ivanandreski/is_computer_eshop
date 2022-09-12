using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PcBuildController : ControllerBase
    {
        private readonly IHashService _hashService;
        private readonly IPcBuildService _pcBuildService;
        private readonly IUserService _userService;
        private readonly UserManager<EshopUser> _userManager;

        public PcBuildController(IHashService hashService, IPcBuildService pcBuildService, IUserService userService, UserManager<EshopUser> userManager)
        {
            _hashService = hashService;
            _pcBuildService = pcBuildService;
            _userService = userService;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize]
        public async Task<IActionResult> GetUserPcBuild()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                return Ok(await _pcBuildService.GetUserPcBuild(user));
            }

            return NotFound("User not found");
        }

        [HttpPost]
        [Authorize]
        [Route("update")]
        public async Task<IActionResult> UpdateProductInPcBuild([FromBody] UpdateProductInPcBuildDto dto)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            var productRawId = _hashService.GetRawId(dto.ProductHashId);
            if (productRawId == null) return NotFound("Product not found.");

            if (user != null)
            {
                var pcBuild = await _pcBuildService.ChangeProduct(user, productRawId.Value, dto);
                return pcBuild == null ? NotFound("Some value was invalid") : Ok(pcBuild);
            }

            return NotFound("User not found");
        }
    }
}
