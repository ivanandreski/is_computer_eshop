using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Projections;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class PostService : IPostService
    {
        private readonly IPostRepository _postRepository;
        private readonly UserManager<EshopUser> _userManager;

        public PostService(IPostRepository postRepository, UserManager<EshopUser> userManager)
        {
            _postRepository = postRepository;
            _userManager = userManager;
        }

        public async Task<ForumPost> Create(ForumPostDto dto, EshopUser user)
        {
            var post = new ForumPost();
            post.Text = dto.Text;
            post.Title = dto.Title;
            if (post.Title == "")
                post.Title = "/";
            post.User = user;
            post.UserId = user.Id;
            post.TimeOfPost = DateTime.Now;
            post.LastModified = post.TimeOfPost;

            return await _postRepository.Create(post);
        }

        public async Task<ForumPost?> Get(long id)
        {
            return await _postRepository.Get(id);
        }

        public async Task<PagedList<UserPostDto>> GetAll(PostFilter filter)
        {
            var param = new PagingParameters();
            param.PageNumber = param.PageNumber > filter.CurrentPage ? param.PageNumber : filter.CurrentPage;
            param.PageSize = param.PageSize > filter.PageSize ? param.PageSize : filter.PageSize;

            var items = _postRepository.GetPaged(param, filter);

            return items;
        }

        public async Task<List<UserPostDto>> GetPostsForUser(EshopUser user)
        {
            return await _postRepository.GetPostsForUser(user);
        }

        public async Task<ForumPost?> Remove(long id, EshopUser user)
        {
            var post = await _postRepository.Get(id);
            if (post == null)
                return null;

            var roles = await _userManager.GetRolesAsync(user);

            if(roles.Contains(UserRoles.Admin) || roles.Contains(UserRoles.Moderator) || post.UserId == user.Id)
                return await _postRepository.Remove(post);

            return null;
        }

        public async Task<ForumPost?> Update(ForumPostDto dto, long id, EshopUser user)
        {
            var post = await _postRepository.Get(id);
            if (post == null)
                return null;

            post.Text = dto.Text;
            post.Title = dto.Title;
            post.LastModified = DateTime.Now;

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains(UserRoles.Admin) || roles.Contains(UserRoles.Moderator) || post.UserId == user.Id)
                return await _postRepository.Update(post);

            return null;
        }
    }
}
