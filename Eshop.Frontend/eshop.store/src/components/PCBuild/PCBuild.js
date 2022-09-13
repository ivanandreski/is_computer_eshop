import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import PCBuildApiService from "../../api/PCBuildApiService";
import PCBuildItem from "./PCBuildItem";

import "./style.css";

const PCBuild = () => {
  const axiosPrivate = useAxiosPrivate();
  const pcBuildApi = new PCBuildApiService(axiosPrivate);

  const [pcBuild, setPcBuild] = useState({});
  const [render, setRender] = useState(0);

  useEffect(() => {
    const fetchPcBuild = async () => {
      try {
        const response = await pcBuildApi.getUserPcBuild();
        setPcBuild(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPcBuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  const getCompatible = () => {
    let htmlTagCompatibility = "<b class";

    if (pcBuild.motherboardProccesorCompatibility === -1) {
      return `${htmlTagCompatibility}="text-danger">X</b>`;
    }

    if (pcBuild.motherboardRamCompatibility === -1) {
      return `${htmlTagCompatibility}="text-danger">X</b>`;
      // return htmlTagCompatibility + "=\"text-danger\">" + "X</ b > ";
    }

    return `${htmlTagCompatibility}="text-success">✓</b>`;
    // return htmlTagCompatibility + "=\"text-success\">" + "✓</ b > ";
  };

  return (
    <div className="container">
      <table className="table">
        <thead>
          <tr className="pc-build-text">
            <th scope="col">Type</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Select</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <PCBuildItem
            item={pcBuild.motherboard}
            type={"Motherboards"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.processor}
            type={"Processors"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.ram}
            type={"RAM"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.graphicsCard}
            type={"Graphics Cards"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.ssd}
            type={"Solid State Drives"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.hdd}
            type={"Hard Drives"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.powerSupply}
            type={"Power Supplies"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <PCBuildItem
            item={pcBuild.pcCase}
            type={"PC Cases"}
            pcBuild={pcBuild}
            setRender={setRender}
          />
          <tr className="pc-build-text">
            <th>Total Price:</th>
            <td></td>
            <td>{pcBuild.totalPrice}</td>
            <td></td>
            <th dangerouslySetInnerHTML={{ __html: getCompatible() }}></th>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PCBuild;
