using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
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
        private readonly IShoppingCartService _shoppingCartService;

        // Stripe
        //private readonly IOptions<StripeOptions> options;
        //private readonly IStripeClient client;

        public OrderController(IOrderService orderService, IHashService hashService, IUserService userService, IShoppingCartService shoppingCartService)
        {
            _orderService = orderService;
            _hashService = hashService;
            _userService = userService;
            _shoppingCartService = shoppingCartService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetOrdersForUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                return Ok(await _orderService.GetOrdersForUser(user));
            }

            return Unauthorized("User not found");
        }

        [HttpGet]
        [Authorize]
        [Route("{hashId}")]
        public async Task<IActionResult> GetOrder(string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            long? rawOrderId = _hashService.GetRawId(hashId);
            if (rawOrderId == null) return NotFound("Order not found");

            if (user != null)
            {
                return Ok(await _orderService.Get(user, rawOrderId.Value));
            }

            return Unauthorized("User not found");
        }

        //[HttpPost]
        //[Authorize]
        //[Route("checkout")]
        //public async Task<IActionResult> Checkout()
        //{
        //    return Ok();
        //}

        [HttpPost]
        [Authorize]
        [Route("create-payment-intent")]
        public async Task<IActionResult> PayOrder()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);
            if (user == null) return Unauthorized();

            //var storeRawId = _hashService.GetRawId(storeHashId);
            //if (storeRawId == null) return NotFound("Store not found!");

            var cart = await _shoppingCartService.Get(user);

            var options = new PaymentIntentCreateOptions
            {
                Amount = (long)cart.TotalPrice.Amount * 100,
                Currency = "MKD",
                PaymentMethodTypes = new List<string>
                {
                    "card",
                },
            };
            var service = new PaymentIntentService();

            try
            {
                var paymentIntent = await service.CreateAsync(options);

                return Ok(new { clientSecret = paymentIntent.ClientSecret });
            }
            catch (StripeException e)
            {
                return BadRequest(new { error = new { message = e.StripeError.Message } });
            }
        }

        [HttpPost]
        [Authorize]
        [Route("createOrder")]
        public async Task<IActionResult> CreateOrder()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);
            if (user == null) return Unauthorized();

            var order = await _orderService.MakeOrder(user, null);
            if (order == null) return BadRequest("Something went wrong");

            await _shoppingCartService.Clear(user);

            return Ok(order.HashId);
        }

        [HttpPost]
        [Authorize]
        public async Task<IActionResult> MakeOrder([FromBody] string storeHashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);
            long? storeRawId = _hashService.GetRawId(storeHashId);

            if (user != null)
            {
                return Ok(await _orderService.MakeOrder(user, storeRawId));
            }

            return Unauthorized("User not found");
        }
    }
}
