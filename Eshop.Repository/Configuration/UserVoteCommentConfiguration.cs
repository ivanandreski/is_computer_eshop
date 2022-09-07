using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Configuration
{
    public class UserVoteCommentConfiguration : IEntityTypeConfiguration<UserVoteComment>
    {
        public void Configure(EntityTypeBuilder<UserVoteComment> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.User)
                .WithMany(x => x.UserVotes)
                .HasForeignKey(x => x.UserId);

            builder.HasOne(x => x.Comment)
                .WithMany(x => x.UserVotes)
                .HasForeignKey(x => x.CommentId);

            builder.Navigation(x => x.User).AutoInclude();
            builder.Navigation(x => x.Comment).AutoInclude();
        }
    }
}
