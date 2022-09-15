using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Projections;
using Eshop.Service.Interface;
using ExcelDataReader;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(Roles = "Admin")]
    public class AdminController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<EshopUser> _userManager;
        private readonly IOrderService _orderService;
        private readonly RoleManager<EshopUser> _roleManager;
        private readonly IHashService _hashService;

        private static Random random = new Random();

        public AdminController(IUserService userService, UserManager<EshopUser> userManager, IOrderService orderService, RoleManager<EshopUser> roleManager, IHashService hashService)
        {
            _userService = userService;
            _userManager = userManager;
            _orderService = orderService;
            _roleManager = roleManager;
            _hashService = hashService;
        }

        [HttpGet]
        [Route("users")]
        public async Task<IActionResult> GetEshopUsers(string? param)
        {
            return Ok(await _userService.GetEshopUsers(param));
        }

        [HttpGet]
        [Route("roles")]
        public IActionResult GetRoles()
        {
            return Ok(UserRoles.GetRoles());
        }

        [HttpPut]
        [Route("setRoles")]
        public async Task<IActionResult> SetRoles([FromBody] SetRolesDto dto)
        {
            var result = await _userService.SetRoles(dto);

            return result == null
                ? NotFound("Username not found")
                : Ok(result);
        }

        [HttpGet]
        [Route("orders")]
        public async Task<IActionResult> GetOrders()
        {
            var filter = new ExportOrdersFilter(Request.Query);

            return Ok(await _orderService.GetOrdersAdmin(filter));
        }

        [HttpPost]
        [Authorize(Roles = UserRoles.Admin)]
        [Route("importUsers")]
        public async Task<IActionResult> ImportUsers([FromBody] IFormFile userTable)
        {
            System.Text.Encoding.RegisterProvider(System.Text.CodePagesEncodingProvider.Instance);
            int counter = 0;
            using (var stream = new MemoryStream())
            {
                userTable.CopyTo(stream);
                stream.Position = 0;
                using (var reader = ExcelReaderFactory.CreateReader(stream))
                {
                    while (reader.Read()) //Each row of the file
                    {
                        string email = reader.GetValue(0).ToString();

                        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
                        string password = new string(Enumerable.Repeat(chars, 10)
                            .Select(s => s[random.Next(s.Length)]).ToArray());
                        string role = reader.GetValue(1).ToString();

                        EshopUser user = new()
                        {
                            Email = email,
                            SecurityStamp = Guid.NewGuid().ToString(),
                            UserName = email.Split("@")[0],
                            FirstName = email.Split("@")[0],
                            LastName = role,
                        };
                        var result = await _userManager.CreateAsync(user, password);
                        if (!result.Succeeded)
                            continue;

                        user = await _userManager.FindByEmailAsync(email);

                        if(UserRoles.GetRoles().Contains(role))
                            await _userManager.AddToRoleAsync(user, role);
                        else
                            await _userManager.AddToRoleAsync(user, UserRoles.User);
                        counter++;
                    }
                }
            }

            return Ok($"{counter} users added successfully");
        }
    }
}
