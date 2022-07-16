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
    public class ProductInOrderConfiguration : IEntityTypeConfiguration<ProductInOrder>
    {
        public void Configure(EntityTypeBuilder<ProductInOrder> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.Order)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.OrderId);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.ProductsInOrder)
                .HasForeignKey(x => x.ProductId);
        }
    }
}
