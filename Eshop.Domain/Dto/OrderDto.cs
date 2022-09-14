using Eshop.Domain.Model;
using Eshop.Domain.ValueObjects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto
{
    public class OrderDto
    {
        public DateTime TimeOfPurchase { get; set; }

        public Money? TotalPrice { get; set; }

        public int Items { get; set; }

        public string Username { get; set; } = "/";

        public OrderDto(Order order)
        {
            TimeOfPurchase = order.TimeOfPurcahse;
            TotalPrice = order.TotalPrice;
            Items = order.Products.Count();
            Username = order.User?.UserName ?? "/";
        }

        public OrderDto()
        {
        }
    }
}
