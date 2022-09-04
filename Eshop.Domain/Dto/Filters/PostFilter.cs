using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto.Filters
{
    public class PostFilter
    {
        public int CurrentPage { get; set; } = 1;

        public int PageSize { get; set; } = 12;

        public string SearchParams { get; set; } = "";

        public DateTime? FromDate { get; set; }

        public DateTime? ToDate { get; set; }
    }
}
