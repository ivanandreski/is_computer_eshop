using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
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
    public class CommentService : ICommentService
    {
        private readonly ICommentRepository _commentRepository;
        private readonly IPostRepository _postRepository;
        private readonly UserManager<EshopUser> _userManager;

        public CommentService(ICommentRepository commentRepository, IPostRepository postRepository, UserManager<EshopUser> userManager)
        {
            _commentRepository = commentRepository;
            _postRepository = postRepository;
            _userManager = userManager;
        }

        public async Task<Comment?> Create(CommentDto dto, EshopUser user)
        {
            var comment = new Comment();
            comment.Text = dto.Text;
            comment.UserId = user.Id;
            comment.TimeOfPost = DateTime.Now;
            comment.LastModified = comment.TimeOfPost;

            var post = await _postRepository.Get(dto.PostId);
            if (post == null) return null;

            comment.ForumPostId = post.Id;

            return await _commentRepository.Create(comment);
        }

        public async Task<Comment?> Get(long id)
        {
            return await _commentRepository.Get(id);
        }

        public async Task<List<UserCommentDto>> GetCommentsForUser(EshopUser user)
        {
            return await _commentRepository.GetCommentsForUser(user);
        }

        public async Task<Comment?> Remove(long id, EshopUser user)
        {
            var comment = await _commentRepository.Get(id);
            if (comment == null) return null;

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains(UserRoles.Admin) || roles.Contains(UserRoles.Moderator) || comment.UserId == user.Id)
                return await _commentRepository.Remove(comment);

            return null;
        }

        public async Task<Comment?> Update(CommentDto dto, long id, EshopUser user)
        {
            var comment = await _commentRepository.Get(id);
            if (comment == null) return null;

            comment.Text = dto.Text;

            var roles = await _userManager.GetRolesAsync(user);

            if (roles.Contains(UserRoles.Admin) || roles.Contains(UserRoles.Moderator) || comment.UserId == user.Id)
                return await _commentRepository.Update(comment);

            return null;
        }

        public async Task<Comment?> Vote(long commentId, EshopUser user, int score)
        {
            var comment = await _commentRepository.Get(commentId);
            if (comment == null) return null;

            var userVote = comment.UserVotes.FirstOrDefault(vote => vote.UserId == user.Id);
            if(userVote == null)
            {
                userVote = new UserVoteComment();
                userVote.UserId = user.Id;
                userVote.User = user;
                userVote.CommentId = commentId;
                userVote.Comment = comment;
                userVote.Score = 0;

                comment.UserVotes.Add(userVote);
            }
            
            if(userVote.Score == 0) userVote.Score = score;
            else
            {
                if (userVote.Score == score) userVote.Score = 0;
                else userVote.Score = score;
            }

            return await _commentRepository.Update(comment);
        }
    }
}
