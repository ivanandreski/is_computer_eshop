import React, { useState } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AdminApiService from "../../api/AdminApiService";

const UploadUsers = () => {
  const axiosPrivate = useAxiosPrivate();
  const adminApi = new AdminApiService(axiosPrivate);

  const [file, setFile] = useState(null);
  const [className, setClassName] = useState();
  const [message, setMessage] = useState("");

  const handleFileUpload = async () => {
    try {
      const response = await adminApi.uploadUserFile(file);
      setMessage(response.data);
      setClassName("text-success");
      setFile(null);
    } catch (error) {
      setClassName("text-danger");
      setMessage(error.message);
    }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <div className="card p-4">
      <div className="mt-3">
        <h1>Upload users</h1>
        <hr />
        <div className="row">
          <div className="col-md-10">
            <input
              type="file"
              className="form-control"
              onChange={handleFileChange}
              //   value={file}
            />
          </div>
          <div className="col-md-2">
            <button
              className="btn btn-primary w-100"
              onClick={handleFileUpload}
            >
              Upload
            </button>
          </div>
        </div>
        <div>
          <strong className={className}>{message}</strong>
        </div>
        <hr />
        <h1>Sample table</h1>
        <table className="table table-bordered">
          <tbody>
            <tr>
              <td>{"{Email1}"}</td>
              <td>{"{Role}"}</td>
            </tr>
            <tr>
              <td>{"{Email2}"}</td>
              <td>{"{Role}"}</td>
            </tr>
            <tr>
              <td>{"{Email3}"}</td>
              <td>{"{Role}"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UploadUsers;
