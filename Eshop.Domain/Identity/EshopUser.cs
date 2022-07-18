using Eshop.Domain.Model;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Identity
{
    public class EshopUser : BaseEntity
    {
        [Required]
        public string UserName { get; set; }

        [Required]
        public string Email { get; set; }

        [Required]
        public string Password { get; set; }

        [Required]
        public string FirstName { get; set; }

        [Required]
        public string LastName { get; set; }

        [Required]
        public string Role { get; set; }

        public Address Address { get; set; }

        public byte[] Image { get; set; }

        // Relationships

        public virtual IEnumerable<Order> Orders { get; set; }

        public virtual IEnumerable<ForumPost> ForumPosts { get; set; }

        public virtual IEnumerable<Comment> Comments { get; set; }

        public long PCBuildId { get; set; }
        public PCBuild PCBuild { get; set; }

        public long ShoppingCartId { get; set; }
        public ShoppingCart ShoppingCart { get; set; }
    }
}
