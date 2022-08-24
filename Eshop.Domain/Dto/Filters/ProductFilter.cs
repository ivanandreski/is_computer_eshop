using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain.Dto.Filters
{
    public class ProductFilter
    {
        [FromQuery(Name = "currentPage")]
        public int CurrentPage { get; set; } = 1;

        [FromQuery(Name = "pageSize")]
        public int PageSize { get; set; } = 12;

        //[FromQuery(Name = "searchParams")]
        public string SearchParams { get; set; } = "";

        //[FromQuery(Name = "categoryHash")]
        public string CategoryHash { get; set; } = "";
    }
}
