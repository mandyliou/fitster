import React from 'react';
import { useState } from 'react';
import { useAuthContext, useToken } from "./auth.js";

export default function LoginForm() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
    const [token, login] = useToken();

    // async function onSubmit() {
	// 	const result = await LoginForm(username, password);
	// }
    const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      "username": username,
      "password": password,
    };

    const userURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/token/`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newUser),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(userURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setUsername("");
        setPassword("");
      })
      .catch((e) => console.error("error: ", e));
  };


	return (
		<div className="row">
			<div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <form onSubmit={handleSubmit} id="login-form">
                        <h1> Log in </h1>
                        <div className="form-floating mb-2">
                            <input
                                type="text"
                                placeholder="test"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                id="username"
                                className="form-control" />
                            <label htmlFor="username"> Username </label>
                        </div>
                        <div className="form-floating mb-2">
                            <input
                                type="password"
                                placeholder="test"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                id="password"
                                className="form-control" />
                            <label htmlFor="password"> Password </label>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={onSubmit}>
                            Log in
                        </button>
                    </form>
                </div>
			</div>
		</div>
	);
}
