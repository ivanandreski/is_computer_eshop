using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Projections;
using Eshop.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Implementation
{
    public class PostRepository : IPostRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<ForumPost> _entities;

        public PostRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<ForumPost>();
        }

        public async Task<ForumPost> Create(ForumPost post)
        {
            _entities.Add(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<ForumPost> Remove(ForumPost post)
        {
            _entities.Remove(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public async Task<ForumPost?> Get(long id)
        {
            return await _entities.FirstOrDefaultAsync(post => post.Id == id);
        }

        public async Task<List<UserPostDto>> GetPostsForUser(EshopUser user)
        {
            return await _entities
                .Where(post => post.UserId == user.Id)
                .Select(post => new UserPostDto(post))
                .ToListAsync();
        }

        public async Task<ForumPost> Update(ForumPost post)
        {
            _entities.Update(post);
            await _context.SaveChangesAsync();

            return post;
        }

        public PagedList<UserPostDto> GetPaged(PagingParameters pagingParams, PostFilter filter)
        {
            IQueryable<ForumPost> query = _entities.AsQueryable();

            if(!string.IsNullOrEmpty(filter.SearchParams))
            {
                query = query.Where(x => x.Title.ToLower().Contains(filter.SearchParams.ToLower()));
            }
            if (filter.FromDate != null)
            {
                query = query.Where(post => post.TimeOfPost.Date > filter.FromDate.Value.Date);
            }
            if (filter.ToDate != null)
            {
                query = query.Where(post => post.TimeOfPost.Date < filter.ToDate.Value.Date);
            }

            var items = query.OrderByDescending(post => post.TimeOfPost).Select(item => new UserPostDto(item));

            return PagedList<UserPostDto>.ToPagedList(items, pagingParams.PageNumber, pagingParams.PageSize);
        }
    }
}
