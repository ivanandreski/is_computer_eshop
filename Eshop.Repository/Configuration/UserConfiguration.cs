﻿using Eshop.Domain.Identity;
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
    public class UserConfiguration : IEntityTypeConfiguration<EshopUser>
    {
        public void Configure(EntityTypeBuilder<EshopUser> builder)
        {
            builder.HasKey(user => user.Id);

            builder.HasOne(x => x.ShoppingCart)
                .WithOne(x => x.User)
                .HasForeignKey<ShoppingCart>(x => x.UserId);

            builder.HasOne(x => x.PCBuild)
                .WithOne(x => x.User)
                .HasForeignKey<PCBuild>(x => x.UserId);

            builder.OwnsOne(x => x.Address);
        }
    }
}
