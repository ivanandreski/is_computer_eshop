using Eshop.Domain.Identity;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
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

        public int Score { get; set; }

        // Relationships

        [JsonIgnore]
        public long ForumPostId { get; set; }
        public ForumPost? ForumPost { get; set; }

        [JsonIgnore]
        public string? UserId { get; set; }
        public EshopUser? User { get; set; }
    }
}
