using Eshop.Domain.Dto;
using Eshop.Domain.Identity;
using Eshop.Domain.Model;
using Eshop.Domain.Relationships;
using Eshop.Repository.Interface;
using Eshop.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class PcBuildService : IPcBuildService
    {
        private readonly IProductRepository _productRepository;
        private readonly IPcBuildRepository _pcBuildRepository;

        public PcBuildService(IProductRepository productRepository, IPcBuildRepository pcBuildRepository)
        {
            _productRepository = productRepository;
            _pcBuildRepository = pcBuildRepository;
        }

        public async Task<PCBuild?> ChangeProduct(EshopUser user, long productId, UpdateProductInPcBuildDto dto)
        {
            var pcBuild = await _pcBuildRepository.GetUserPcBuild(user);
            if (pcBuild == null) return null;

            var product = await _productRepository.Get(productId);
            if(product == null) return null;

            var productInPcBuild = pcBuild.Products.FirstOrDefault(x => x.Key == dto.ProductType);
            if(productInPcBuild == null)
            {
                productInPcBuild = new ProductInPcBuild();
                productInPcBuild.ProductId = productId;
                productInPcBuild.Product = product;
                productInPcBuild.PcBuildId = pcBuild.Id;
                productInPcBuild.PcBuild = pcBuild;
                productInPcBuild.Count = dto.Count;
                productInPcBuild.Key = dto.ProductType;
                pcBuild.Products.Add(productInPcBuild);
            }
            else
            {
                productInPcBuild.ProductId = productId;
                productInPcBuild.Product = product;
                productInPcBuild.Count = dto.Count;
            }

            return await _pcBuildRepository.Update(pcBuild);
        }

        public async Task<PCBuild?> GetUserPcBuild(EshopUser user)
        {
            var pcBuild = await _pcBuildRepository.GetUserPcBuild(user);
            if(pcBuild == null)
            {
                pcBuild = new PCBuild();
                pcBuild.User = user;
                pcBuild.UserId = user.Id;
                pcBuild = await _pcBuildRepository.Create(pcBuild);
            }

            return pcBuild;
        }
    }
}
