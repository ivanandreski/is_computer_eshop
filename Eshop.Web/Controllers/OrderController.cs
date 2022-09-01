using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IOrderService _orderService;
        private readonly IHashService _hashService;
        private readonly IUserService _userService;

        public OrderController(IOrderService orderService, IHashService hashService, IUserService userService)
        {
            _orderService = orderService;
            _hashService = hashService;
            _userService = userService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetOrdersForUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return BadRequest();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                return Ok(await _orderService.GetOrdersForUser(user));
            }

            return Unauthorized("User not found");
        }
    }
}
