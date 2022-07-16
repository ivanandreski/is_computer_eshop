using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Relationships
{
    public class ProductInOrder : BaseEntity
    {
        public int Amount { get; set; }

        // Relatiionships

        public long ProductId { get; set; }
        public Product Product { get; set; }

        public long OrderId { get; set; }
        public Order Order { get; set; }

        public ProductInOrder() { }

        public ProductInOrder(int amount, Product product, Order order)
        {
            Amount = amount;
            Product = product;
            Order = order;
            ProductId = product.Id;
            OrderId = order.Id;
        }

        public ProductInOrder(ProductInShoppingCart product, Order order)
        {
            Amount = product.Amount;
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
