using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class ProductInOrder : BaseEntity
    {
        public int Quantity { get; set; }

        // Relatiionships

        [JsonIgnore]
        public long ProductId { get; set; }
        public Product? Product { get; set; }

        [JsonIgnore]
        public long OrderId { get; set; }
        public Order? Order { get; set; }

        public ProductInOrder()
        {
        }

        public ProductInOrder(int quantity, Product product, Order order)
        {
            Quantity = quantity;
            Product = product;
            Order = order;
            ProductId = product.Id;
            OrderId = order.Id;
        }

        public ProductInOrder(ProductInShoppingCart product, Order order)
        {
            Quantity = product.Quantity;
            Product = product.Product;
            ProductId = product.ProductId;
            Order = order;
            OrderId = order.Id;
        }

        public static IEnumerable<ProductInOrder> ConvertShoppingCartProductsToOrder(IEnumerable<ProductInShoppingCart> products, Order order)
        {
            return products.Select(x => new ProductInOrder(x, order))
                .ToList();
        }
    }
}
