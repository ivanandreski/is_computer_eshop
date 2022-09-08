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

namespace Eshop.Repository.Interface
{
    public interface IPostRepository
    {
        PagedList<UserPostDto> GetPaged(PagingParameters pagingParams, PostFilter filter);

        Task<List<UserPostDto>> GetPostsForUser(EshopUser user);

        Task<ForumPost?> Get(long id);

        Task<ForumPost> Create(ForumPost post);

        Task<ForumPost> Update(ForumPost post);

        Task<ForumPost> Remove(ForumPost post);
    }
}
