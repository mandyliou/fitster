import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useToken } from "./auth";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [login] = useToken();
    const [invalid, setInvalid] = useState(false);
    let navigate = useNavigate();


    const handleSubmit = async(e) => {
        e.preventDefault();
        const error = await login(username, password);
        if (error) {
          setInvalid(true);
        } else {
          navigate("/");
        }


    };
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Login</h1>
            <form onSubmit={handleSubmit} id="login-form" method="post">
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  className="form-control"
                  value={username}
                  required
                  type="text"
                />
                <label htmlFor="username">Username </label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="form-control"
                  value={password}
                  required
                  type="text"
                />
                <label htmlFor="password">Password</label>
              </div>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
            {invalid && (
              <div className="alert alert-danger" id="invalid-message">
                <p>Incorrect Username or Password</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
    };
