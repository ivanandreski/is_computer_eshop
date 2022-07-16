using Eshop.Domain.Model;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Configuration
{
    public class CommentConfiguration : IEntityTypeConfiguration<Comment>
    {
        public void Configure(EntityTypeBuilder<Comment> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.User)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.UserId);

            builder.HasOne(x => x.ForumPost)
                .WithMany(x => x.Comments)
                .HasForeignKey(x => x.ForumPostId);

            builder.Navigation(x => x.User).AutoInclude();
            builder.Navigation(x => x.ForumPost).AutoInclude();
        }
    }
}
