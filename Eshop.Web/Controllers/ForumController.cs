using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace Eshop.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ForumController : ControllerBase
    {
        private readonly IPostService _postService;
        private readonly ICommentService _commentService;
        private readonly IHashService _hashService;
        private readonly UserManager<EshopUser> _userManager;
        private readonly IUserService _userService;

        public ForumController(IPostService postService, ICommentService commentService, IHashService hashService, UserManager<EshopUser> userManager, IUserService userService)
        {
            _postService = postService;
            _commentService = commentService;
            _hashService = hashService;
            _userManager = userManager;
            _userService = userService;
        }

        // Posts

        [HttpGet]
        [Route("post")]
        public async Task<IActionResult> GetPosts()
        {
            var filter = new PostFilter();
            filter.CurrentPage = Convert.ToInt32(Request.Query["currentPage"]);
            filter.PageSize = Convert.ToInt32(Request.Query["pageSize"]);
            filter.SearchParams = Request.Query["searchParams"];
            try
            {
                var temp = Request.Query["fromDate"].ToString();
                if (temp == null) temp = "";
                filter.FromDate = DateTime.Parse(temp);
            } catch (FormatException)
            {
                filter.FromDate = null;
            }

            try
            {
                var temp = Request.Query["toDate"].ToString();
                if (temp == null) temp = "";
                filter.ToDate = DateTime.Parse(temp);
            }
            catch (FormatException)
            {
                filter.ToDate = null;
            }

            var result = await _postService.GetAll(filter);

            return Ok(new { Items = result, PageSize = result.PageSize, TotalPages = result.TotalPages });
        }

        [HttpGet]
        [Authorize]
        [Route("post/user")]
        public async Task<IActionResult> GetPostsFromUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                return Ok(await _postService.GetPostsForUser(user));
            }

            return Unauthorized("User not found");
        }

        [HttpGet]
        [Route("post/{hashId}")]
        public async Task<IActionResult> GetPost([FromRoute] string hashId)
        {
            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null) return NotFound("Post not found!");

            var post = await _postService.Get(rawId.Value);
            return post == null
                ? NotFound("Post not found!")
                : Ok(post);
        }

        [HttpPost]
        [Authorize]
        [Route("post")]
        public async Task<IActionResult> CreatePost([FromBody] ForumPostDto dto)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                return Ok(await _postService.Create(dto, user));
            }

            return Unauthorized("User not found");
        }

        [HttpPut]
        [Authorize]
        [Route("post/{hashId}")]
        public async Task<IActionResult> UpdatePost([FromBody] ForumPostDto dto, [FromRoute] string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null) return NotFound("Post not found.");

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var post = await _postService.Update(dto, rawId.Value, user);
                return post == null
                    ? Unauthorized("You do not have permission to update this post")
                    : Ok(post);
            }

            return Unauthorized("User not found");
        }

        [HttpDelete]
        [Authorize]
        [Route("post/{hashId}")]
        public async Task<IActionResult> DeletePost([FromRoute] string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return BadRequest();

            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null) return NotFound("Post not found.");

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var post = await _postService.Remove(rawId.Value, user);
                return post == null
                    ? Unauthorized("You do not have permission to delete this post")
                    : Ok(post);
            }

            return Unauthorized("User not found");
        }

        // Comments

        [HttpGet]
        [Authorize]
        [Route("comment/user")]
        public async Task<IActionResult> GetCommentsFromUser()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return BadRequest();

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                return Ok(await _commentService.GetCommentsForUser(user));
            }

            return Unauthorized("User not found");
        }

        [HttpPost]
        [Authorize]
        [Route("comment")]
        public async Task<IActionResult> CreateComment([FromBody] CommentDto dto)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var user = await _userService.GetUser(identity);

            var postRawId = _hashService.GetRawId(dto.PostHashId);
            if (postRawId == null) return NotFound("Post not found");
            dto.PostId = postRawId.Value;

            if (user != null)
            {
                return Ok(await _commentService.Create(dto, user));
            }

            return Unauthorized("User not found");
        }

        [HttpPut]
        [Authorize]
        [Route("comment/{hashId}")]
        public async Task<IActionResult> UpdateComment([FromBody] CommentDto dto, [FromRoute] string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return Unauthorized();

            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null) return NotFound("Comment not found.");

            var user = await _userService.GetUser(identity);

            var postRawId = _hashService.GetRawId(dto.PostHashId);
            if (postRawId == null) return NotFound("Post not found");
            dto.PostId = postRawId.Value;

            if (user != null)
            {
                var post = await _commentService.Update(dto, rawId.Value, user);
                return post == null
                    ? Unauthorized("You do not have permission to update this comment")
                    : Ok(post);
            }

            return Unauthorized("User not found");
        }

        [HttpDelete]
        [Authorize]
        [Route("comment/{hashId}")]
        public async Task<IActionResult> DeleteComment([FromRoute] string hashId)
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity == null)
                return BadRequest();

            var rawId = _hashService.GetRawId(hashId);
            if (rawId == null) return NotFound("Comment not found.");

            var user = await _userService.GetUser(identity);

            if (user != null)
            {
                var post = await _commentService.Remove(rawId.Value, user);
                return post == null
                    ? Unauthorized("You do not have permission to delete this comment")
                    : Ok(post);
            }

            return Unauthorized("User not found");
        }
    }
}
