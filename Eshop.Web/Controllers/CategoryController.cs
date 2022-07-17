using Eshop.Service.Interface;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoryController : ControllerBase
    {
        private readonly ICategoryService _categoryService;
        private readonly IHashService _hashService;

        public CategoryController(ICategoryService categoryService, IHashService hashService)
        {
            _categoryService = categoryService;
            _hashService = hashService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _categoryService.GetAll());
        }

        [HttpGet("{hashId}")]
        public async Task<ActionResult> Get(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Category not found");

            var category = await _categoryService.Get(rawId.Value);
            if (category == null)
                return NotFound("Category not found");

            return Ok(category);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromForm] string name)
        {
            var category = await _categoryService.Create(name);

            return category != null ? Ok(category) : BadRequest();
        }

        [HttpPut("{hashId}")]
        public async Task<ActionResult> Update(string hashId, [FromForm] string name)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Category not found");

            var category = await _categoryService.Update(rawId.Value, name);
            if (category == null)
                return NotFound("Category not found");

            return Ok(category);
        }

        [HttpDelete("{hashId}")]
        public async Task<ActionResult> Remove(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Category not found");

            var category = await _categoryService.Remove(rawId.Value);
            if (category == null)
                return NotFound("Category not found");

            return Ok(category);
        }
    }
}
