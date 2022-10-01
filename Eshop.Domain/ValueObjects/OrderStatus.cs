using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.ValueObjects
{
    public class OrderStatus : ValueObject
    {
        public string? Status { get; }

        public string? StatusMessage { get; }

        protected override IEnumerable<object> GetAtomicValues()
        {
            yield return Status != null ? Status : "";
            yield return StatusMessage != null ? StatusMessage : "";
        }

        [NotMapped]
        public static readonly List<string> Statuses = new List<string>()
        {
            "COMPLETED", "IN_PROGRESS", "CANCELED"
        };

        public OrderStatus()
        {
        }

        public OrderStatus(string status)
        {
            Status = nameof(status);
            StatusMessage = status;
        }
    }

    public static class OrderStatuses
    {
        public const string PROCESSED = "Processed";
        public const string READY_FOR_SHIPMENT = "Ready for shipment";
        public const string SHIPPED = "Shipped";
        public const string READY_FOR_PICKUP_IN_STORE = "Ready for pickup at store";
        public const string COMPLETED = "Completed";
    }
}
