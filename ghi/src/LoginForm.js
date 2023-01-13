import React, { useState } from "react";
import { useToken } from "./auth.js";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [, login] = useToken();


    const handleSubmit = async(e) => {
        e.preventDefault();
        login(username, password);

    };
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Login</h1>
            <form
              onSubmit={handleSubmit}
              className="form-control"
              method="post"
            >
              <label>
                Username:
                <input
                  onChange={(e) => setUsername(e.target.value)}
                  id="username"
                  value={username}
                  required
                  type="text"
                />
              </label>
              <label>
                Password:
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  value={password}
                  required
                  type="text"
                />
              </label>
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </form>
          </div>
        </div>
      </div>
    );
    };
