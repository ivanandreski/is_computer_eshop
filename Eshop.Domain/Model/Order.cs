using Eshop.Domain.Identity;
using Eshop.Domain.Relationships;
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
    public class Order : BaseEntity
    {
        [DataType(DataType.DateTime)]
        public DateTime TimeOfPurcahse { get; set; }

        public Money? TotalPrice { get; set; }

        [Required]
        public OrderStatus? Status { get; set; }

        public bool Delivery { get; set; }

        // Relatonships

        public virtual List<ProductInOrder> Products { get; set; } = new List<ProductInOrder>();

        [JsonIgnore]
        public string? UserId { get; set; }
        public EshopUser? User { get; set; }

        [JsonIgnore]
        public long? StoreId { get; set; }
        public Store? Store { get; set; }
    }
}
