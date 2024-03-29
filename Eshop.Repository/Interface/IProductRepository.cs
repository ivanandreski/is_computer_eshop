﻿using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Model;
using Eshop.Domain.Projections;
using Eshop.Domain.Relationships;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Repository.Interface
{
    public interface IProductRepository
    {
        PagedList<ProductCardDto> GetPaged(PagingParameters pagingParams, ProductFilter filter);

        Task<IEnumerable<Product>> GetAll();

        Task<IEnumerable<ProductPcBuildDto>> GetAllFromCategory(long categoryId);

        Task<Product?> Get(long id);

        Task<IEnumerable<ProductInStore>> GetProductAvailability(long productId);

        Task<Product?> GetProductByName(string title);

        Task<Product> Create(Product entity);

        Task<Product> Update(Product entity);

        Task<Product> Remove(Product entity);

    }
}
