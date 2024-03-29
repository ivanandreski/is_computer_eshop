﻿using Eshop.Domain.Relationships;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Store : BaseEntity
    {
        [Required]
        public string? Name { get; set; }

        [Required]
        public Address? Address { get; set; }

        // TODO: add working time, working days, bool opened property, delet should change the bool and not delete the entity, same for product

        // Relationships

        [JsonIgnore]
        public virtual IEnumerable<ProductInStore>? Products { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<Order>? Orders { get; set; }

        [JsonIgnore]
        public virtual IEnumerable<ShoppingCart>? ShoppingCarts { get; set; }
    }
}
