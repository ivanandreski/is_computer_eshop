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
    public class ProductInPcBuildConfiguration : IEntityTypeConfiguration<ProductInPcBuild>
    {
        public void Configure(EntityTypeBuilder<ProductInPcBuild> builder)
        {
            builder.HasKey(x => x.Id);

            builder.HasOne(x => x.PcBuild)
                .WithMany(x => x.Products)
                .HasForeignKey(x => x.PcBuildId);

            builder.HasOne(x => x.Product)
                .WithMany(x => x.PcBuildProducts)
                .HasForeignKey(x => x.ProductId);

            builder.Navigation(x => x.Product).AutoInclude();
        }
    }
}
