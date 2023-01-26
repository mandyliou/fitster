import React, {useState} from 'react'
import { useAuthContext } from './auth';


const UpdateAccountForm = () => {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_photo, setProfilePhoto] = useState("");
  const [description, setDescription] = useState("");
  const { token } = useAuthContext();

  const handleSubmit = (event) => {
    event.preventDefault();
    const updateUser = {
      username: username,
      first_name: first_name,
      last_name: last_name,
      email: email,
      password: password,
      profile_photo: profile_photo,
      description: description,
    };

    const userURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/{user_id}`;

    const fetchConfig = {
      method: "put",
      body: JSON.stringify(updateUser),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(userURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setUsername("");
        setFirstName("");
        setLastName("");
        setEmail("");
        setPassword("");
        setProfilePhoto("");
        setDescription("");
      })
      .catch((e) => console.error("error: ", e));
  };

  const handleUsernameChange = (event) => {
    const value = event.target.value;
    setUsername(value);
  };

  const handFirstNameChange = (event) => {
    const value = event.target.value;
    setFirstName(value);
  };

  const handleLastNameChange = (event) => {
    const value = event.target.value;
    setLastName(value);
  };

  const handleEmailChange = (event) => {
    const value = event.target.value;
    setEmail(value);
  };

  const handlePasswordChange = (event) => {
    const value = event.target.value;
    setPassword(value);
  };

  const handleProfilePhotoChange = (event) => {
    const value = event.target.value;
    setProfilePhoto(value);
  };

  const handleDescriptionChange = (event) => {
    const value = event.target.value;
    setDescription(value);
  };

  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Update Account</h1>
          <form onSubmit={handleSubmit} id="update-account-form">
            <div className="form-floating mb-3">
              <input
                value={username}
                onChange={handleUsernameChange}
                required
                type="username"
                name="user_name"
                id="username"
                className="form-control"
              />
              <label>Username</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={first_name}
                onChange={handFirstNameChange}
                required
                type="name"
                name="first_name"
                id="first_name"
                className="form-control"
              />
              <label>First Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={last_name}
                onChange={handleLastNameChange}
                required
                type="name"
                name="last_name"
                id="last_name"
                className="form-control"
              />
              <label>Last Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={email}
                onChange={handleEmailChange}
                required
                type="email"
                name="email"
                id="email"
                className="form-control"
              />
              <label>Email</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={password}
                onChange={handlePasswordChange}
                required
                type="password"
                name="password"
                id="password"
                className="form-control"
              />
              <label>Password</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={profile_photo}
                onChange={handleProfilePhotoChange}
                type="profile_photo"
                name="profile_photo"
                id="profile_photo"
                className="form-control"
              />
              <label>Profile Photo</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={description}
                onChange={handleDescriptionChange}
                type="description"
                name="description"
                id="description"
                className="form-control"
              />
              <label>Description</label>
            </div>
            <button className="btn btn-primary">Update</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateAccountForm;
