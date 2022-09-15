import React from "react";
import CustomPCBuildItem from "./CustomPCBuildItem";

import "./CustomPcBuilds.css";

import entry1 from "../../../resources/images/pcBuilds/entry1.png";
import entry2 from "../../../resources/images/pcBuilds/entry2.png";
import entry3 from "../../../resources/images/pcBuilds/entry3.png";

import mid1 from "../../../resources/images/pcBuilds/mid1.png";
import mid2 from "../../../resources/images/pcBuilds/mid2.png";
import mid3 from "../../../resources/images/pcBuilds/mid3.png";

import high1 from "../../../resources/images/pcBuilds/high1.png";
import high2 from "../../../resources/images/pcBuilds/high2.png";
import high3 from "../../../resources/images/pcBuilds/high3.png";

const entryLevelImages = [entry1, entry2, entry3];
const midRangeImages = [mid1, mid2, mid3];
const highEndImages = [high1, high2, high3];

const entryLevelTitle = "Entry Level gaming pc";
const midRangeTitle = "Mid Range gaming pc";
const highEndTitle = "High End gaming pc";

const entryLevelSpecs =
  "CPU: Intel i5-11400F\nGraphics Card: MSI AMD RX 6600XT 8GB GDDR6\nRAM: Kingston Fury Beast RGB 16GB DDR4-3200 CL16 (2x8GB)\nSSD: Gigabyte AORUS NVMe RGB 512GB\nMotherboard: MSI B560M A-PRO\nPower Supply: Sharkoon WPM 550W Gold ZERO 80 Plus GOLD\nCase: Deepcool CG540 Mid-Tower (Black)";
const midRangeSpecs =
  "CPU: Intel i5-11400F\nGraphics Card: MSI GeForce RTX 3070 VENTUS 3X OC 8GB GDDR6\nRAM: Kingston Fury Beast RGB 16GB DDR4-3200 CL16 (2x8GB)\nSSD: Samsung NVMe 970 EVO Plus 1TB\nMotherboard: MSI B560M A-PRO\nPower Supply: Deepcool DQ750M-V2L 750W Full Modular 80Plus Gold\nCase: Deepcool CG540 Mid-Tower (Black)";
const highEndSpecs =
  "CPU: Intel i7-12700K\nGraphics Card: MSI GeForce RTX 3080 GAMING Z TRIO 12GB LHR GDDR6X\nRAM: Kingston Fury Renegade RGB 32GB DDR4-3600 CL16 (2x16GB)\nSSD: Samsung NVMe 970 EVO Plus 1TB\nMotherboard: Gigabyte Z690M DS3H\nPower Supply: Deepcool DQ850-M-V2L 850W Full Modular 80Plus Gold\nCase: Deepcool CK560 Mid-Tower (Black)";

const entryLevelDescription =
  "Our entry level gaming pc, is designed to offer gamers a budget-friendly system that doesn't sacrifice component quality. This system is intended for 1080P Ultra gaming at 60FPS, and a smooth operational experience.";
const midRangeDescription =
  "A journeyman system, the Mid Range PC is an excellent option for gamers trying to improve their experience while balancing price and performance. This PC offers solid 1080P performance and a great introduction to higher resolutions.";
const highEndDescription =
  "The High End PC is an enthusiast's dream come true. High-end performance without exorbitant costs, each of these systems is powerful and capable of a fluid gaming experience, from 1080P to 4K.";

const entryLevelPrice = "61990.00 den";
const midRangePrice = "84990.00 den";
const highEndPrice = "102990.00 den";

const CustomPcBuilds = () => {
  return (
    <div className="mt-3 p-5">
      <div className="ps-5 pb-5 pe-5 builds-container">
        <h1 className="pt-3 pb-3">Our custom build gaming computers</h1>
        <div className="row">
          <div className="col-md-4">
            <CustomPCBuildItem
              title={entryLevelTitle}
              description={entryLevelDescription}
              specs={entryLevelSpecs}
              images={entryLevelImages}
              price={entryLevelPrice}
            />
          </div>
          <div className="col-md-4">
            <CustomPCBuildItem
              title={midRangeTitle}
              description={midRangeDescription}
              specs={midRangeSpecs}
              images={midRangeImages}
              price={midRangePrice}
            />
          </div>
          <div className="col-md-4">
            <CustomPCBuildItem
              title={highEndTitle}
              description={highEndDescription}
              specs={highEndSpecs}
              images={highEndImages}
              price={highEndPrice}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomPcBuilds;
