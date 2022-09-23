import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import PCBuildApiService from "../../api/PCBuildApiService";
import PCBuildItem from "./PCBuildItem";

import "./style.css";

const PCBuild = () => {
  const axiosPrivate = useAxiosPrivate();
  const pcBuildApi = new PCBuildApiService(axiosPrivate);
  const navigate = useNavigate();

  const [pcBuild, setPcBuild] = useState({});
  const [render, setRender] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPcBuild = async () => {
      try {
        const response = await pcBuildApi.getUserPcBuild();
        setPcBuild(response.data);
        setLoading(false);
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
    }

    return `${htmlTagCompatibility}="text-success">✓</b>`;
  };

  const handleOrderClick = async () => {
    try {
      await pcBuildApi.orderPc();
      navigate("/cart");
    } catch (error) {
      console.log(error);
    }
  };

  return loading ? (
    <h1 className="text-light">Loading...</h1>
  ) : (
    <div className="container mt-2">
      <table className="table table-bordered">
        <thead>
          <tr className="pc-build-text">
            <th scope="col">Type</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Price</th>
            <th scope="col">Quantity</th>
            <th scope="col">Select</th>
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
            <th colSpan="3">Total Price:</th>
            <td>{pcBuild.totalPrice}</td>
            <th>Compatibility:</th>
            <th>
              <strong
                dangerouslySetInnerHTML={{ __html: getCompatible() }}
              ></strong>
            </th>
          </tr>
        </tbody>
      </table>
      <div className="row mt-2">
        <div className="col-md-2">
          <button className="btn btn-primary w-100" onClick={handleOrderClick}>
            Order now!
          </button>
        </div>
      </div>
    </div>
  );
};

export default PCBuild;
