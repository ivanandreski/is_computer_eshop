using Eshop.Domain.Dto;
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

        public AdminController(IUserService userService, UserManager<EshopUser> userManager)
        {
            _userService = userService;
            _userManager = userManager;
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
    }
}
