using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class UserVoteComment : BaseEntity
    {
        public int Score { get; set; }

        [JsonIgnore]
        public string? UserId { get; set; }
        [JsonIgnore]
        public EshopUser? User { get; set; }
        [NotMapped]
        public string Username { get { return User?.UserName ?? ""; } }

        [JsonIgnore]
        public long CommentId { get; set; }
        [JsonIgnore]
        public Comment? Comment { get; set; }
    }
}
