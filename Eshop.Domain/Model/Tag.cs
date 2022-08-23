using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class Tag : BaseEntity
    {
        public string? Key { get; set; }
        public string? Value { get; set; }

        [JsonIgnore]
        public long ProductId { get; set; }

        [JsonIgnore]
        public Product? Product { get; set; }

        public Tag(string? key, string? value, long productId)
        {
            Key = key;
            Value = value;
            ProductId = productId;
        }
    }

    public static class TagKeys
    {
        public const string SOCKET = "Socket";
        public const string RAM_TYPE = "Ram type";
        public const string CPU_MANUFACTURER = "Processor manufacturer";
    }
}
