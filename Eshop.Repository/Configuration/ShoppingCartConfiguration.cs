using Eshop.Domain.Identity;
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
    public class ShoppingCartConfiguration : IEntityTypeConfiguration<ShoppingCart>
    {
        public void Configure(EntityTypeBuilder<ShoppingCart> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Store)
                .WithMany(x => x.ShoppingCarts)
                .HasForeignKey(x => x.StoreId);

            builder.OwnsOne(x => x.TotalPrice);

            builder.Navigation(x => x.User).AutoInclude();
            builder.Navigation(x => x.Store).AutoInclude();
            builder.Navigation(x => x.Products).AutoInclude();
        }
    }
}
