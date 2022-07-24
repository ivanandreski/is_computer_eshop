using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    [Authorize]
    public class ShoppingCartController : ControllerBase
    {
        private readonly IHashService _hashService;
        private readonly IShoppingCartService _shoppingCartService;
        private readonly IUserService _userService;

        public ShoppingCartController(IHashService hashService, IShoppingCartService shoppingCartService, IUserService userService)
        {
            _hashService = hashService;
            _shoppingCartService = shoppingCartService;
            _userService = userService;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = await _userService.Get(identity);

                if (user != null)
                {
                    return Ok(await _shoppingCartService.Get(user));
                }

            }

            return NotFound("User not found");
        }

        [HttpPut]
        public async Task<ActionResult> Clear()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = await _userService.Get(identity);

                if (user != null)
                {
                    return Ok(await _shoppingCartService.Clear(user));
                }

            }

            return NotFound("User not found");
        }

        [HttpPut]
        public async Task<ActionResult> AddProduct([FromForm] string productHashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = await _userService.Get(identity);

                if (user != null)
                {
                    var rawId = _hashService.GetRawId(productHashId);
                    if (rawId == null)
                        return NotFound("Product not found");

                    return Ok(await _shoppingCartService.AddProduct(user, rawId.Value));
                }

            }

            return NotFound("User not found");
        }

        [HttpPut]
        public async Task<ActionResult> ChangeQuantity([FromForm] string productInCartHashId,[FromForm] int quantity)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = await _userService.Get(identity);

                if (user != null)
                {
                    var rawId = _hashService.GetRawId(productInCartHashId);
                    if (rawId == null)
                        return NotFound("Product not found");

                    var cart = await _shoppingCartService.ChangeQuantity(user, rawId.Value, quantity);

                    return cart == null ? BadRequest("User and product do not match") : Ok(cart);
                }

            }

            return NotFound("User not found");
        }

        [HttpPut]
        public async Task<ActionResult> Edit([FromForm] string storeHashId, [FromForm] bool delivery)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = await _userService.Get(identity);

                if (user != null)
                {
                    var rawId = _hashService.GetRawId(storeHashId);
                    if (rawId == null)
                        return NotFound("Store not found");

                    var cart = await _shoppingCartService.Edit(user, rawId.Value, delivery);

                    return cart == null ? NotFound("Store not found") : Ok(cart);
                }

            }

            return NotFound("User not found");
        }

        [HttpPut]
        public async Task<ActionResult> RemoveProduct([FromForm] string productInCartHashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;

            if (identity != null)
            {
                var user = await _userService.Get(identity);

                if (user != null)
                {
                    var rawId = _hashService.GetRawId(productInCartHashId);
                    if (rawId == null)
                        return NotFound("Product not found");

                    var cart = await _shoppingCartService.RemoveProduct(user, rawId.Value);

                    return cart == null ? BadRequest("User and product do not match") : Ok(cart);
                }

            }

            return NotFound("User not found");
        }
    }
}
