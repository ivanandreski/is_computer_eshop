using Eshop.Domain.Model;
using Eshop.Service.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Service.Implementation
{
    public class TagService : ITagService
    {
        public List<Tag> CreateTags(Product product)
        {
            switch (product?.Category?.Name)
            {
                case "Motherboards":
                    return getMotherboardTags(product);
                case "Processors":
                    return getProcessorTags(product);
                case "RAM":
                    return getRAMTags(product);
                default:
                    return new List<Tag>();
            }
        }

        private List<Tag> getMotherboardTags(Product product)
        {
            if (product == null || product.Name == null)
                return new List<Tag>();

            string name = product.Name;
            long productId = product.Id;

            List<Tag> tags = new List<Tag>();
            if (name.Contains("LGA"))
            {
                var split = name.Split(" ");
                for (int i = 0; i < split.Count(); i++)
                {
                    if (split[i].StartsWith("LGA"))
                    {
                        tags.Add(new Tag(TagKeys.SOCKET, split[i], productId));
                        break;
                    }
                }

                tags.Add(new Tag(TagKeys.CPU_MANUFACTURER, "INTEL", productId));
            }
            else
            {
                tags.Add(new Tag(TagKeys.SOCKET, "AM4", productId));
                tags.Add(new Tag(TagKeys.CPU_MANUFACTURER, "AMD", productId));
            }

            if (name.Contains("DDR3"))
                tags.Add(new Tag(TagKeys.RAM_TYPE, "DDR3", productId));
            else if (name.Contains("DDR4"))
                tags.Add(new Tag(TagKeys.RAM_TYPE, "DDR4", productId));
            else if (name.Contains("DDR5"))
                tags.Add(new Tag(TagKeys.RAM_TYPE, "DDR5", productId));

            return tags;
        }

        private List<Tag> getProcessorTags(Product product)
        {
            if (product == null || product.Name == null)
                return new List<Tag>();

            string name = product.Name;
            long productId = product.Id;

            List<Tag> tags = new List<Tag>();
            if (name.Contains("Intel"))
            {
                tags.Add(new Tag(TagKeys.CPU_MANUFACTURER, "INTEL", productId));
                var split = name.Split(" ");
                for (int i = 0; i < split.Count(); i++)
                {
                    if (split[i].StartsWith("LGA"))
                    {
                        tags.Add(new Tag(TagKeys.SOCKET, split[i] + split[i + 1], productId));
                        break;
                    }
                }
            }
            else
            {
                var split = name.Split(" ");
                for (int i = 0; i < split.Count(); i++)
                {
                    if (split[i].Contains("GHz"))
                    {
                        tags.Add(new Tag(TagKeys.SOCKET, split[i + 1], productId));
                        break;
                    }
                }

                tags.Add(new Tag(TagKeys.CPU_MANUFACTURER, "AMD", productId));
            }

            return tags;
        }

        private List<Tag> getRAMTags(Product product)
        {
            if (product == null || product.Name == null)
                return new List<Tag>();

            string name = product.Name;
            long productId = product.Id;

            List<Tag> tags = new List<Tag>();
            if (name.Contains("DDR4"))
                tags.Add(new Tag(TagKeys.RAM_TYPE, "DDR4", productId));
            else if (name.Contains("DDR3"))
                tags.Add(new Tag(TagKeys.RAM_TYPE, "DDR3", productId));
            else if (name.Contains("DDR5"))
                tags.Add(new Tag(TagKeys.RAM_TYPE, "DDR5", productId));

            return tags;
        }
    }
}
