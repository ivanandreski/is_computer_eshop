using Eshop.Domain.Relationships;
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
        private readonly IDocumentService _documentService;

        public OrderController(IOrderService orderService, IHashService hashService, IUserService userService, IShoppingCartService shoppingCartService, IDocumentService documentService)
        {
            _orderService = orderService;
            _hashService = hashService;
            _userService = userService;
            _shoppingCartService = shoppingCartService;
            _documentService = documentService;
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
        [Route("{hashId}/export")]
        public async Task<IActionResult> ExportOrder(string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);
            if (user == null) return Unauthorized();

            var orderRawId = _hashService.GetRawId(hashId);
            if (orderRawId == null) return NotFound("Order doesnt exist");

            var order = await _orderService.Get(user, orderRawId.Value);
            if (order == null) return BadRequest("Something went wrong");
            if (order.UserId != user.Id) return Unauthorized("This order does not belong to this user");

            

            return Ok(order.HashId);
        }
    }
}
