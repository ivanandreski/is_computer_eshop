using Eshop.Domain.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class PCBuild : BaseEntity
    {


        // Relationships

        [JsonIgnore]
        public string? UserId { get; set; }
        public EshopUser? User { get; set; }
    }
}
