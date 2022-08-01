using Eshop.Domain.Dto;
using Eshop.Domain.Model;
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
        Task<IEnumerable<Product>> GetAll();

        Task<Product?> Get(long id);

        Task<IEnumerable<ProductInStore>> GetAvailability(long id);

        Task<Product?> Create(ProductDto dto);

        Task<Product?> Update(long id, ProductDto dto);

        Task<Product?> AddImages(long id, IEnumerable<IFormFile> images);

        Task<Product?> RemoveImage(long imageId);

        Task<Product?> Remove(long id);
    }
}
