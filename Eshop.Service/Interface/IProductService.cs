using Eshop.Domain.Dto;
using Eshop.Domain.Dto.Filters;
using Eshop.Domain.Model;
using Eshop.Domain.Projections;
using Eshop.Domain.Relationships;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Interface
{
    public interface IProductService
    {
        Task<PagedList<ProductCardDto>> GetAll(ProductFilter filter);

        Task<Product?> Get(long id);

        Task<IEnumerable<ProductInStore>> GetAvailability(long id);

        Task<Product?> Create(ProductDto dto);

        Task<Product?> Update(long id, ProductDto dto);

        Task<Product?> AddImages(long id, IEnumerable<IFormFile> images);

        Task<Product?> RemoveImage(long imageId);

        Task<Product?> Remove(long id);

        Task<Product> ImportScrapedProduct(ProductScrapedDto dto);

        Task<IEnumerable<ProductPcBuildDto>> GetAllFromType(string type);
    }
}
