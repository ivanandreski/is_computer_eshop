using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Repository.Interface;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Implementation
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly DbSet<Comment> _entities;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
            _entities = _context.Set<Comment>();
        }

        public async Task<Comment> Create(Comment comment)
        {
            _entities.Add(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment> Remove(Comment comment)
        {
            _entities.Remove(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<Comment?> Get(long id)
        {
            return await _entities.FirstOrDefaultAsync(comment => comment.Id == id);
        }

        public async Task<List<UserCommentDto>> GetCommentsForUser(EshopUser user)
        {
            return await _entities
                .Where(comment => comment.UserId == user.Id)
                .Select(comment => new UserCommentDto(comment))
                .ToListAsync();
        }

        public async Task<Comment> Update(Comment comment)
        {
            _entities.Update(comment);
            await _context.SaveChangesAsync();

            return comment;
        }

        public async Task<int> GetUserScoreFromComments(EshopUser user)
        {
            int score = 0;
            var userVotesByComment = _entities.Where(x => x.UserId == user.Id)
                .Select(x => x.UserVotes);
            foreach(var userVote in userVotesByComment)
            {
                score += userVote.Select(x => x.Score).Sum();
            }

            return score;
        }
    }
}
