using Eshop.Domain.Identity;
using Eshop.Domain.Relationships;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Comment : BaseEntity
    {
        public string? Text { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime TimeOfPost { get; set; }

        [DataType(DataType.DateTime)]
        public DateTime LastModified { get; set; }

        // Relationships

        [JsonIgnore]
        public long ForumPostId { get; set; }
        [JsonIgnore]
        public ForumPost? ForumPost { get; set; }

        [JsonIgnore]
        public string? UserId { get; set; }

        [JsonIgnore]
        public EshopUser? User { get; set; }

        [NotMapped]
        public string Username { get { return User?.UserName ?? ""; } }

        public List<UserVoteComment> UserVotes { get; set; } = new List<UserVoteComment>();

        [NotMapped]
        public int Score
        {
            get
            {
                return UserVotes.Select(vote => vote.Score).Sum();
            }
        }
    }
}
