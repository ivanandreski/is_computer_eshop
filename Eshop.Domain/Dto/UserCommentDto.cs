using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class UserCommentDto
    {
        public string? PostHashId { get; set; }
        public string? Text { get; set; }
        public DateTime TimeOfPost { get; set; }
        public int Score { get; set; }
        public string Username { get; set; } = "";

        public UserCommentDto()
        {
        }

        public UserCommentDto(Comment comment)
        {
            PostHashId = comment.ForumPost?.HashId ?? "";
            Text = comment.Text;
            TimeOfPost = comment.TimeOfPost;
            Score = comment.Score;
            Username = comment.User.UserName;
        }
    }
}
