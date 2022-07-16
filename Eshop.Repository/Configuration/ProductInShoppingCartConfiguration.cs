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
    public class ProductInShoppingCartConfiguration : IEntityTypeConfiguration<ProductInShoppingCart>
    {
        public void Configure(EntityTypeBuilder<ProductInShoppingCart> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.ShoppingCart)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.ShoppingCartId);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.ProductsInShoppingCart)
                .HasForeignKey(x => x.ProductId);
        }
    }
}
