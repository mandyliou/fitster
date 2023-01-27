import React, {useState} from 'react'
import { useAuthContext } from './auth';

const UpdateAccountForm = ({userId}) => {
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

    const userURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/${userId}`;

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
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              placeholder="Enter username"
              value={username}
              onChange={handleUsernameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="first_name">First Name</label>
            <input
              type="text"
              className="form-control"
              id="first_name"
              placeholder="Enter first name"
              value={first_name}
              onChange={handFirstNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="last_name"
              placeholder="Enter last name"
              value={last_name}
              onChange={handleLastNameChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter password"
              value={password}
              onChange={handlePasswordChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="profile_photo">Profile Photo</label>
            <input
              type="text"
              className="form-control"
              id="profile_photo"
              placeholder="Enter profile photo URL"
              value={profile_photo}
              onChange={handleProfilePhotoChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              className="form-control"
              id="description"
              rows="3"
              value={description}
              onChange={handleDescriptionChange}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary">
            Update Account
          </button>
        </form>
      </div>
    </div>
  );
}


export default UpdateAccountForm;
