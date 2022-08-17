import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../../hooks/useAxiosPrivate";

const Users = () => {
  const [users, setUsers] = useState();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate("/AuthorizationTest/private", {
          signal: controller.signal,
        });

        isMounted && setUsers(response.data.result);
      } catch (error) {
        console.log(error);

        if (error.message !== "canceled")
          navigate("/login", { state: { from: location }, replace: true });
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, navigate, location]);

  return (
    <article>
      <h2>Users list</h2>
      {users ? (
        <ul>
          <li>{users.firstName}</li>
          <li>{users.lastName}</li>
        </ul>
      ) : (
        <p>No users</p>
      )}
    </article>
  );
};

export default Users;
