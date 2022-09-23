using Eshop.Domain.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Eshop.Domain
{
    public static class PreBuiltComputerSpecs
    {
        public static readonly Dictionary<string, string> EntryLevelComputer = new Dictionary<string, string>()
        {
            { PcBuildKeys.Processor, "CPU Intel Core i5-11400 Rocket Lake 6-Core 2.6GHz LGA 1200 12MB BOX"},
            { PcBuildKeys.GraphicsCard, "MSI Radeon RX 6600 MECH 2X OC 8GB GDDR6 HDMI/3xDP PCIe 4.0 DX12U TORX Fan 3.0"},
            { PcBuildKeys.RAM, "DIMM 8GB DDR4 3200MHz Kingston Fury Beast CL16 RGB"},
            { PcBuildKeys.SSD, "SSD M.2 2280 Gigabyte AORUS NVMe RGB 512GB PCIe 3.0 x4 3480/2000 MB/s"},
            { PcBuildKeys.Motherboard, "MB MSI B560M A-PRO LGA1200 DDR4 5200MHz OC SATA3, M.2, USB3.2, PCIe 4.0, 2.5G LAN, HDMI/VGA"},
            { PcBuildKeys.PowerSupply, "PSU 550W Sharkoon WPM Gold ZERO 80 Plus GOLD Real Power Semi-Modular, 140mm Fan"},
            { PcBuildKeys.PcCase, "ATX / E-ATX Midi Tower Case Deepcool CG540 Black w/2x USB 3.0, 3x ARGB Fans+1x 140mm Fan"},
        };

        public static readonly Dictionary<string, string> MidRangeComputer = new Dictionary<string, string>()
        {
            { PcBuildKeys.Processor, "CPU Intel Core i5-11400 Rocket Lake 6-Core 2.6GHz LGA 1200 12MB BOX"},
            { PcBuildKeys.GraphicsCard, "MSI GeForce RTX 3070 VENTUS 3X OC 8GB GDDR6 HDMI/3xDP Triple TORX Fan 3.0 LHR"},
            { PcBuildKeys.RAM, "DIMM 8GB DDR4 3200MHz Kingston Fury Beast CL16 RGB"},
            { PcBuildKeys.SSD, "SSD M.2 Samsung NVMe 970 EVO Plus 1TB PCIe"},
            { PcBuildKeys.Motherboard, "MB MSI B560M A-PRO LGA1200 DDR4 5200MHz OC SATA3, M.2, USB3.2, PCIe 4.0, 2.5G LAN, HDMI/VGA"},
            { PcBuildKeys.PowerSupply, "PSU 750W Deepcool DQ750M-V2L Full Modular 80Plus Gold Black"},
            { PcBuildKeys.PcCase, "ATX / E-ATX Midi Tower Case Deepcool CG540 Black w/2x USB 3.0, 3x ARGB Fans+1x 140mm Fan"},
        };

        public static readonly Dictionary<string, string> HighEndComputer = new Dictionary<string, string>()
        {
            { PcBuildKeys.Processor, "CPU Intel Core i7-12700K Alder Lake 12-Core E2.7GHz/P3.6GHz LGA 1700 25MB BOX w/o Cooler"},
            { PcBuildKeys.GraphicsCard, "MSI GeForce RTX 3080 GAMING Z TRIO 12GB LHR OC GDDR6X HDMI/3xDP Triple Torx Fan 4.0 RGB"},
            { PcBuildKeys.RAM, "DIMM 16GB DDR4 3600MHz Kingston Fury Renegade CL16 RGB"},
            { PcBuildKeys.SSD, "SSD M.2 2280 Gigabyte AORUS NVMe RGB 512GB PCIe 3.0 x4 3480/2000 MB/s"},
            { PcBuildKeys.Motherboard, "MB Gigabyte Z690M DS3H DDR4 LGA1700 5333MHz SATA3 2xM.2 USB3.2/Type-C 2.5Gbit PCIe 4.0 2xDP/HDMI/VGA"},
            { PcBuildKeys.PowerSupply, "PSU 850W Deepcool DQ850-M-V2L Full Modular 80Plus Gold Black"},
            { PcBuildKeys.PcCase, "ATX / E-ATX Midi Tower Case Deepcool CK560 Black w/2x USB 3.0, USB 3.1 Type-C, 3x ARGB+140mm Fans"},
        };
    }
}
