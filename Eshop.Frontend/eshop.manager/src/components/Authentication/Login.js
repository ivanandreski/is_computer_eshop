import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import useAuth from "../../hooks/useAuth";
import AuthenticationApiService from "../../api/AuthenticationApiService";

const Login = () => {
  const { setAuth, persist, setPersist } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await AuthenticationApiService.login(user, password);

    if (typeof response === "string") {
      setErrMsg(response);
      errRef.current.focus();
    } else {
      const accessToken = response?.data?.accessToken;
      setAuth({ user, accessToken });

      // reroute to /home
      navigate(from, { replace: true });
    }
  };

  const togglePersist = () => {
    setPersist(!persist);
    localStorage.setItem("persist", !persist);
  };

  return (
    <div>
      <section>
        <p
          ref={errRef}
          className={errMsg ? "errmsg" : "offscreen"}
          aria-live="assertive"
        >
          {errMsg}
        </p>
        <h1>Log in</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              className="form-control"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => {
                setUser(e.target.value);
              }}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>

          <div className="row mb-3">
            <div className="col-md-12">
              <span style={{ marginRight: "10px" }}>
                <input
                  type="checkbox"
                  id="persist"
                  onChange={togglePersist}
                  checked={persist}
                />
              </span>
              <label htmlFor="persist">Trust this machine?</label>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col-md-6">
              <button className="btn btn-primary w-100">Log in</button>
            </div>
          </div>
        </form>

        <p>
          Need an Account?
          <br />
          <span className="line">
            <Link className="text-secondary" to="/register">
              Register
            </Link>
          </span>
        </p>
      </section>
    </div>
  );
};

export default Login;
