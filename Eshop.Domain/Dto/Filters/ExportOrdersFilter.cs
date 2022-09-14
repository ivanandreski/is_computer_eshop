using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto.Filters
{
    public class ExportOrdersFilter
    {
        public DateTime? DateFrom { get; set; }
        public DateTime? DateTo { get; set; }
        public string SearchParams { get; set; } = "";

        public ExportOrdersFilter()
        {
        }

        public ExportOrdersFilter(IQueryCollection query)
        {
            SearchParams = query["searchParams"];
            try
            {
                var temp = query["dateFrom"].ToString();
                if (temp == null) temp = "";
                DateFrom = DateTime.Parse(temp);
            }
            catch (FormatException)
            {
                DateFrom = null;
            }

            try
            {
                var temp = query["dateTo"].ToString();
                if (temp == null) temp = "";
                DateTo = DateTime.Parse(temp);
            }
            catch (FormatException)
            {
                DateTo = null;
            }
        }
    }
}
