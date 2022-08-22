import React, { useState, useEffect } from "react";
import { Button, Collapse } from "react-bootstrap";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AdminApiService from "../../api/AdminApiService";
import Select from "react-select";

const UserCollapsableTableRow = ({ user, number }) => {
  const axiosPrivate = useAxiosPrivate();
  const adminApi = new AdminApiService(axiosPrivate);

  const [open, setOpen] = useState(false);
  const [roles, setRoles] = useState([]);
  const [newRole, setNewRole] = useState("");
  const [userRoles, setUserRoles] = useState(user.roles);

  useEffect(() => {
    const getRoles = async () => {
      try {
        const response = await adminApi.getRoles();
        setRoles(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getRoles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getOptions = () => {
    return roles.map((role) => {
      return {
        value: role,
        label: role,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const roles = user.roles;
      roles.push(newRole);
      const response = await adminApi.setRoles(user.username, roles);
      user.roles = [...response.data.roles];
      console.log(user.roles);
      setUserRoles(response.data.roles);
      setNewRole("");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (role) => {
    try {
      const roles = user.roles.filter((r) => r !== role);
      const response = await adminApi.setRoles(user.username, roles);
      user.roles = [...response.data.roles];
      setUserRoles(response.data.roles);
    } catch (error) {
      console.log(error);
    }
  };

  const renderRoles = () => {
    return userRoles?.map((role, key) => (
      <React.Fragment key={key}>
        <div className="row mb-2">
          <div className="col-md-10">{`${key + 1}. ${role}`}</div>
          <div className="col-md-2 d-flex justify-content-center">
            <button
              className="btn btn-danger "
              onClick={() => handleDelete(role)}
            >
              Remove
            </button>
          </div>
        </div>
        <hr />
      </React.Fragment>
    ));
  };

  return (
    <>
      <tr>
        <th>{number}</th>
        <td>{user.username}</td>
        <td>{user.email}</td>
        <td className="d-flex justify-content-center">
          <Button
            onClick={() => setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <b>+</b>
          </Button>
        </td>
      </tr>
      <Collapse in={open}>
        <tr>
          <td colSpan={4}>
            <h5>Roles:</h5>
            <hr />
            {renderRoles()}
            <form onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-10">
                  <label htmlFor="role">Add role:</label>
                  <Select
                    options={getOptions()}
                    onChange={(e) => setNewRole(e.value)}
                  />
                </div>
                <div className="col-md-2">
                  <button type="submit" className="btn btn-primary w-100">
                    Add to Role
                  </button>
                </div>
              </div>
            </form>
          </td>
        </tr>
      </Collapse>
    </>
  );
};

export default UserCollapsableTableRow;
