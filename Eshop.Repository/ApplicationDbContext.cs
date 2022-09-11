using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Eshop.Repository.Configuration;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace Eshop.Repository
{
    public class ApplicationDbContext : IdentityDbContext<EshopUser>
    {
#pragma warning disable CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
#pragma warning restore CS8618 // Non-nullable field must contain a non-null value when exiting constructor. Consider declaring as nullable.
        {
        }

        public virtual DbSet<Comment> Comments { get; set; }
        public virtual DbSet<Category> Categories { get; set; }
        public virtual DbSet<ForumPost> ForumPosts { get; set; }
        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<PCBuild> PCBuilds { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<ShoppingCart> ShoppingCarts { get; set; }
        public virtual DbSet<Store> Stores { get; set; }
        public virtual DbSet<ProductInOrder> ProductsInOrders { get; set; }
        public virtual DbSet<ProductInShoppingCart> ProductsInShoppingCarts { get; set; }
        public virtual DbSet<ProductInStore> ProductsInStores { get; set; }
        public virtual DbSet<ProductInPcBuild> ProductsInPcBuilds { get; set; }
        public virtual DbSet<Tag> Tags { get; set; }
        public virtual DbSet<UserVoteComment> UserVotes { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.ApplyConfiguration(new CategoryConfiguration());
            builder.ApplyConfiguration(new CommentConfiguration());
            builder.ApplyConfiguration(new ForumPostConfiguration());
            builder.ApplyConfiguration(new OrderConfiguration());
            builder.ApplyConfiguration(new PCBuildConfiguration());
            builder.ApplyConfiguration(new ProductConfiguration());
            builder.ApplyConfiguration(new ProductInOrderConfiguration());
            builder.ApplyConfiguration(new ProductInShoppingCartConfiguration());
            builder.ApplyConfiguration(new ProductInStoreConfiguration());
            builder.ApplyConfiguration(new ShoppingCartConfiguration());
            builder.ApplyConfiguration(new StoreConfiguration());
            builder.ApplyConfiguration(new UserConfiguration());
            builder.ApplyConfiguration(new TagConfiguration());
            builder.ApplyConfiguration(new UserVoteCommentConfiguration());
        }
    }
}