using Eshop.Domain.Dto;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StoreController : ControllerBase
    {
        private readonly IStoreService _storeService;
        private readonly IHashService _hashService;

        public StoreController(IStoreService storeService, IHashService hashService)
        {
            _storeService = storeService;
            _hashService = hashService;
        }

        [HttpGet]
        public async Task<ActionResult> GetAll()
        {
            return Ok(await _storeService.GetAll());
        }

        [HttpGet("{hashId}")]
        public async Task<ActionResult> Get(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if(rawId == null)
                return NotFound("Store not found!");

            var store = await _storeService.Get(rawId.Value);

            return store == null ? NotFound("Store not found!") : Ok(store);
        }

        [HttpPost]
        public async Task<ActionResult> Create([FromBody] StoreDto dto)
        {
            return Ok(await _storeService.Create(dto));
        }

        [HttpPut("{hashId}")]
        public async Task<ActionResult> Update(StoreDto dto, string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Store not found!");

            var store = await _storeService.Update(rawId.Value, dto);

            return store == null ? NotFound("Store not found!") : Ok(store);
        }

        [HttpDelete("{hashId}")]
        public async Task<ActionResult> Update(string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null)
                return NotFound("Store not found!");

            var store = await _storeService.Remove(rawId.Value);

            return store == null ? NotFound("Store not found!") : Ok(store);
        }
    }
}
