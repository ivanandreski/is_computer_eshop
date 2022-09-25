using Eshop.Domain.Identity;
using Eshop.Domain.Relationships;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Stripe;
using System.Security.Claims;
using System.Linq;

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
        private readonly IMailService _mailService;
        private readonly UserManager<EshopUser> _userManager;

        public OrderController(IOrderService orderService, IHashService hashService, IUserService userService, IShoppingCartService shoppingCartService, IDocumentService documentService, IMailService mailService, UserManager<EshopUser> userManager)
        {
            _orderService = orderService;
            _hashService = hashService;
            _userService = userService;
            _shoppingCartService = shoppingCartService;
            _documentService = documentService;
            _mailService = mailService;
            _userManager = userManager;
        }

        [HttpGet]
        [Authorize(Roles = "Admin,Driver,StoreClerk")]
        [Route("manager")]
        public async Task<IActionResult> GetOrdersManager()
        {
            string searchParams = Request.Query["searchParams"];

            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var role = (await _userManager.GetRolesAsync(user))
                    .Where(role => role != "User")
                    .FirstOrDefault();
                if (role == null) return Unauthorized();

                return Ok(await _orderService.GetOrdersManager(role, searchParams));
            }

            return Unauthorized("User not found");
        }

        [HttpPost]
        [Authorize(Roles = "Driver,StoreClerk")]
        [Route("manager/{hashId}")]
        public async Task<IActionResult> GetOrdersManager(string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var role = (await _userManager.GetRolesAsync(user))
                    .Where(role => role != "User")
                    .FirstOrDefault();
                if (role == null) return Unauthorized();

                var rawOrderId = _hashService.GetRawId(hashId);
                if (rawOrderId == null) return NotFound("Order not found!");

                return Ok(await _orderService.SetOrderStatus(role, rawOrderId.Value));
            }

            return Unauthorized("User not found");
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
            _mailService.SendOrderMail(order);

            return Ok(order.HashId);
        }

        
    }
}
