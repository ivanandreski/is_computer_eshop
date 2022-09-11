import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import PCBuildApiService from "../../api/PCBuildApiService";

const PCBuild = () => {
  const axiosPrivate = useAxiosPrivate();
  const pcBuildApi = new PCBuildApiService(axiosPrivate);

  const [pcBuild, setPcBuild] = useState({});

  useEffect(() => {
    const fetchPcBuild = async () => {
      try {
        const response = await pcBuildApi.getUserPcBuild();
        setPcBuild(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPcBuild();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div>PCBuild</div>;
};

export default PCBuild;
