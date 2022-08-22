import React, { useState, useEffect } from "react";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import AdminApiService from "../../api/AdminApiService";
import UserCollapsableTableRow from "./UserCollapsableTableRow";

const Users = () => {
  const axiosPrivate = useAxiosPrivate();
  const adminApi = new AdminApiService(axiosPrivate);

  const [users, setUsers] = useState();
  const [params, setParams] = useState("");

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await adminApi.getUsers(params);
        setUsers(response.data);
      } catch (error) {}
    };

    getUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params, JSON.stringify(users)]);

  const renderUsers = () => {
    return users?.map((user, key) => (
      <UserCollapsableTableRow key={key} user={user} number={key + 1} />
    ));
  };

  return (
    <>
      <h1 className="mt-2">User role manager</h1>
      <hr />
      <div className="row mt-2">
        <div className="col-md-12">
          <input
            type="text"
            className="form-control w-100"
            onChange={(e) => setParams(e.target.value)}
            placeholder="Search"
          />
        </div>
      </div>
      <hr />
      <div className="row mt-2">
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Email</th>
              <th className="text-center">Details</th>
            </tr>
          </thead>
          <tbody>{renderUsers()}</tbody>
        </table>
      </div>
      <footer>
        <p>
          Limited to 20 users. Give a detailed search parameter to find more
          users!
        </p>
      </footer>
    </>
  );
};

export default Users;
