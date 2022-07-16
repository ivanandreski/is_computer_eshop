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
    public class OrderConfiguration : IEntityTypeConfiguration<Order>
    {
        public void Configure(EntityTypeBuilder<Order> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.User)
                .WithMany(x => x.Orders)
                .HasForeignKey(x => x.UserId);

            builder.OwnsOne(x => x.TotalPrice);
            builder.OwnsOne(x => x.Status);

            builder.Navigation(x => x.User).AutoInclude();
            builder.Navigation(x => x.Store).AutoInclude();
            builder.Navigation(x => x.Products).AutoInclude();
        }
    }
}
