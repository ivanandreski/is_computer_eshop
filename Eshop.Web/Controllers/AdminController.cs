using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Projections;
using Eshop.Service.Interface;
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

        public AdminController(IUserService userService, UserManager<EshopUser> userManager, IOrderService orderService)
        {
            _userService = userService;
            _userManager = userManager;
            _orderService = orderService;
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

        //[HttpPost]
        //[Route("orders/export")]
        //public async Task<IActionResult> ExportOrders([FromBody] ExportOrdersDto dto)
        //{

        //}
    }
}
