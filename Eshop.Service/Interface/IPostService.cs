using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Projections;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IPostService
    {
        Task<PagedList<UserPostDto>> GetAll(PostFilter filter);

        Task<List<UserPostDto>> GetPostsForUser(EshopUser user);

        Task<ForumPost?> Get(long id);

        Task<ForumPost> Create(ForumPostDto dto, EshopUser user);

        Task<ForumPost?> Update(ForumPostDto dto, long id, EshopUser user);

        Task<ForumPost?> Remove(long id, EshopUser user);
    }
}
