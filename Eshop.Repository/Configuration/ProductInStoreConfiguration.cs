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
    public class ProductInStoreConfiguration : IEntityTypeConfiguration<ProductInStore>
    {
        public void Configure(EntityTypeBuilder<ProductInStore> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Store)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.StoreId);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.ProductsInStore)
                .HasForeignKey(x => x.ProductId);

            builder.Navigation(x => x.Store).AutoInclude();
            builder.Navigation(x => x.Product).AutoInclude();
        }
    }
}
