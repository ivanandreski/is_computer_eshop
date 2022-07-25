using System;
using System.Collections.Generic;
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

        public static readonly List<string> Statuses = new List<string>()
        {
            "COMPLETED", "IN_PROGRESS", "CANCELED"
        };
    }
}
