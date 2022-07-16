using Eshop.Domain.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Model
{
    public class PCBuild : BaseEntity
    {


        // Relationships

        public long UserId { get; set; }
        public EshopUser User { get; set; }
    }
}
