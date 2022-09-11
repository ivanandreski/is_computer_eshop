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
    public class PCBuildConfiguration : IEntityTypeConfiguration<PCBuild>
    {
        public void Configure(EntityTypeBuilder<PCBuild> builder)
        {
            builder.HasKey(x => x.Id);

            builder.Navigation(x => x.User).AutoInclude();
            builder.Navigation(x => x.Products).AutoInclude();
        }
    }
}
