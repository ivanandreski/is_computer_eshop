﻿using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class ProductInStore : BaseEntity
    {
        public int Amount { get; set; }

        // Relatiionships

        public long ProductId { get; set; }
        public Product Product { get; set; }

        public long StoreId { get; set; }
        public Store Store { get; set; }
    }
}
