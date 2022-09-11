using Eshop.Domain.Model;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using System.Text.Json.Serialization;
using Eshop.Domain.Relationships;

namespace Eshop.Domain.Identity
{
    public class EshopUser : IdentityUser
    {
        [JsonIgnore]
        public string? RefreshToken { get; set; }
        [JsonIgnore]
        public DateTime RefreshTokenExpiryTime { get; set; }

        [Required]
        public string? FirstName { get; set; }

        [Required]
        public string? LastName { get; set; }

        public Address? Address { get; set; }

        public byte[]? Image { get; set; }

        // Relationships

        [JsonIgnore]
        public virtual IEnumerable<Order>? Orders { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<ForumPost>? ForumPosts { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<Comment>? Comments { get; set; }

        [JsonIgnore]
        public long PCBuildId { get; set; }
        public PCBuild? PCBuild { get; set; }

        [JsonIgnore]
        public long ShoppingCartId { get; set; }
        public ShoppingCart? ShoppingCart { get; set; }

        [JsonIgnore]
        public List<UserVoteComment> UserVotes { get; set; } = new List<UserVoteComment>();
    }
}
