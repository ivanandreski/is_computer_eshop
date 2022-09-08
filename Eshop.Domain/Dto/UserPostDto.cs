using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class UserPostDto
    {
        public string? HashId { get; set; }
        public string? Title { get; set; }
        public DateTime TimeOfPost { get; set; }
        public string Username { get; set; } = "";

        public UserPostDto()
        {
        }

        public UserPostDto(ForumPost post)
        {
            HashId = post.HashId;
            Title = post.Title;
            TimeOfPost = post.TimeOfPost;
            Username = post.User.UserName;
        }
    }
}
