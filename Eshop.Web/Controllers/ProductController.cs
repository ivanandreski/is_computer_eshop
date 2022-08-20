using Eshop.Domain.Dto;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private readonly IProductService _productService;
        private readonly IHashService _hashService;

        public ProductController(IProductService productService, IHashService hashService)
        {
            _productService = productService;
            _hashService = hashService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _productService.GetAll());
        }

        [HttpGet("{hashId}")]
        public async Task<ActionResult> Get(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Product not found");

            var product = await _productService.Get(rawId.Value);
            if (product == null)
                return NotFound("Product not found");

            return Ok(product);
        }

        [HttpGet("{hashId}/availability")]
        public async Task<ActionResult> GetAvailability(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Product not found");

            var productInStores = await _productService.GetAvailability(rawId.Value);

            return Ok(productInStores);
        }

        [HttpPost]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult> Create([FromForm] ProductDto dto)
        {
            var result = await _productService.Create(dto);
            if (result == null)
                return NotFound("Category does not exist!");

            return Ok(result);
        }

        [HttpPut("{hashId}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult> Update(string hashId, [FromForm] ProductDto dto)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Product not found");

            var product = await _productService.Update(rawId.Value, dto);
            if (product == null)
                return NotFound("Product or category not found");

            return Ok(product);
        }

        [HttpPost("{hashId}/addImages")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult> AddImages(string hashId, [FromForm] IEnumerable<IFormFile> images)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Product not found");

            var product = await _productService.AddImages(rawId.Value, images);
            if (product == null)
                return NotFound("Product not found");

            return Ok(product);
        }

        [HttpDelete("{hashId}/deleteImage")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult> RemoveImage(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Image not found");

            var product = await _productService.RemoveImage(rawId.Value);

            return product == null ? BadRequest("Something went wrong!") : Ok(product);
        }

        [HttpDelete("{hashId}")]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<ActionResult> Remove(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Product not found");

            var product = await _productService.Remove(rawId.Value);
            if (product == null)
                return NotFound("Product not found");

            return Ok(product);
        }
    }
}
