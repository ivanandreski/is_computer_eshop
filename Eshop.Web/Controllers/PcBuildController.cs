using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.Text;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PcBuildController : ControllerBase
    {
        private readonly IHashService _hashService;
        private readonly IPcBuildService _pcBuildService;
        private readonly IUserService _userService;
        private readonly IShoppingCartService _shoppingCartService;
        private readonly UserManager<EshopUser> _userManager;

        public PcBuildController(IHashService hashService, IPcBuildService pcBuildService, IUserService userService, IShoppingCartService shoppingCartService, UserManager<EshopUser> userManager)
        {
            _hashService = hashService;
            _pcBuildService = pcBuildService;
            _userService = userService;
            _shoppingCartService = shoppingCartService;
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

        [HttpGet]
        [Authorize]
        [Route("forumQuestion")]
        public async Task<IActionResult> GetPCBuildForQuestion()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var pcBuild = await _pcBuildService.GetUserPcBuild(user);
                if (pcBuild == null) return Ok("");

                var stringBuilder = new StringBuilder();
                stringBuilder.AppendLine($"* Motherboard: \n{pcBuild.Motherboard?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"* Processor: \n{pcBuild.Processor?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"* RAM: \n{pcBuild.Ram?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"     Number of sticks: {pcBuild.Ram?.Count ?? 0}");
                stringBuilder.AppendLine($"* Graphics Card: \n{pcBuild.GraphicsCard?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"* Power Supply: \n{pcBuild.PowerSupply?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"* PC Case: \n{pcBuild.PcCase?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"* Hard Drive: \n{pcBuild.Hdd?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine($"* Solid state drive: \n{pcBuild.Ssd?.Product?.Name ?? "/"}");
                stringBuilder.AppendLine();
                stringBuilder.AppendLine($"* Total price: \n{pcBuild.TotalPrice}.00 den");
                return Ok(stringBuilder.ToString());
            }

            return NotFound("User not found");
        }

        [HttpPost]
        [Authorize]
        [Route("order")]
        public async Task<IActionResult> OrderPC([FromBody] OrderDetailsDto dto)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var pcBuild = await _pcBuildService.GetUserPcBuild(user);
                if (pcBuild == null) return NotFound("This user has no pc build");

                var cart = await _shoppingCartService.OrderPc(user, pcBuild);
                return Ok(cart);
            }

            return NotFound("User not found");
        }
    }
}
