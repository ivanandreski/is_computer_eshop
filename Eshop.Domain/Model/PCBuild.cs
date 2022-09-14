using Eshop.Domain.Identity;
using Eshop.Domain.Relationships;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
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
        [JsonIgnore]
        public EshopUser? User { get; set; }

        [JsonIgnore]
        public IList<ProductInPcBuild> Products { get; set; } = new List<ProductInPcBuild>();

        // Display properties

        [NotMapped]
        public ProductInPcBuild? Processor
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.Processor);
            }
        }

        [NotMapped]
        public ProductInPcBuild? Ram
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.RAM);
            }
        }

        [NotMapped]
        public ProductInPcBuild? Ssd
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.SSD);
            }
        }

        [NotMapped]
        public ProductInPcBuild? Hdd
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.HDD);
            }
        }

        [NotMapped]
        public ProductInPcBuild? GraphicsCard
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.GraphicsCard);
            }
        }

        [NotMapped]
        public ProductInPcBuild? PcCase
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.PcCase);
            }
        }

        [NotMapped]
        public ProductInPcBuild? PowerSupply
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.PowerSupply);
            }
        }

        [NotMapped]
        public ProductInPcBuild? Motherboard
        {
            get
            {
                return Products.FirstOrDefault(x => x.Key == PcBuildKeys.Motherboard);
            }
        }

        [NotMapped]
        public double TotalPrice
        {
            get
            {
                return Products.Select(x => x.Price).Sum();
            }
        }

        // Compatibility

        public int MotherboardProccesorCompatibility
        {
            get
            {
                if (Motherboard == null) return 0;
                if (Processor == null) return 0;

                var motherBoardSocketVendor = Motherboard?.Product?.Tags.FirstOrDefault(x => x.Key == TagKeys.CPU_MANUFACTURER);
                var processorSocketVendor = Processor?.Product?.Tags.FirstOrDefault(x => x.Key == TagKeys.CPU_MANUFACTURER);
                if (motherBoardSocketVendor == null || processorSocketVendor == null) return 0;
                if (motherBoardSocketVendor.Value != processorSocketVendor.Value) return -1;

                var motherBoardSocket = Motherboard?.Product?.Tags.FirstOrDefault(x => x.Key == TagKeys.SOCKET);
                var processorSocket = Processor?.Product?.Tags.FirstOrDefault(x => x.Key == TagKeys.SOCKET);
                if (motherBoardSocket == null || processorSocket == null) return 0;
                if (motherBoardSocket.Value != processorSocket.Value) return -1;

                return 1;
            }
        }

        public int MotherboardRamCompatibility
        {
            get
            {
                if (Motherboard == null) return 0;
                if (Ram == null) return 0;

                var motherboardRamType = Motherboard?.Product?.Tags.FirstOrDefault(x => x.Key == TagKeys.RAM_TYPE);
                var ramType = Ram?.Product?.Tags.FirstOrDefault(x => x.Key == TagKeys.RAM_TYPE);
                if (motherboardRamType == null || ramType == null) return 0;
                if (ramType.Value != motherboardRamType.Value) return -1;

                return 1;
            }
        }

    }

    public static class PcBuildKeys
    {
        public const string Processor = "Processors";
        public const string RAM = "RAM";
        public const string SSD = "Solid State Drives";
        public const string HDD = "Hard Drives";
        public const string Motherboard = "Motherboards";
        public const string PcCase = "PP Cases";
        public const string GraphicsCard = "Graphics Cards";
        public const string PowerSupply = "Power Supplies";
    }
}
