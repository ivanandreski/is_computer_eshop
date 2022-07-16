using Eshop.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;

        // TODO: change methods from void to bool and objects

        public CategoryController(ICategoryService categoryService)
        {
            _categoryService = categoryService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            return Ok(_categoryService.GetAll());
        }

        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            return Ok(_categoryService.Get(id));
        }

        [HttpPost]
        public IActionResult Create([FromForm] string name)
        {
            _categoryService.Create(name);

            return Ok();
        }

        [HttpPut("{id}")]
        public IActionResult Update(string id, [FromForm] string name)
        {
            _categoryService.Update(id, name);

            return Ok();
        }

        [HttpDelete("{id}")]
        public IActionResult Remove(string id)
        {
            _categoryService.Remove(id);

            return Ok();
        }
    }
}
