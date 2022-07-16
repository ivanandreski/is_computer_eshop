using Eshop.Domain.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Configuration
{
    public class UserConfiguration : IEntityTypeConfiguration<EshopUser>
    {
        public void Configure(EntityTypeBuilder<EshopUser> builder)
        {
            builder.HasKey(user => user.Id);

            builder.OwnsOne(x => x.Address);

        }
    }
}
