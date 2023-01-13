import React, {useState} from 'react'

const CreateUserForm = () => {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_photo, setProfilePhoto] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    const newUser = {
      "username": username,
      "first_name": first_name,
      "last_name": last_name,
      "email": email,
      "password": password,
      "profile_photo": profile_photo,
      "description": description,
    };

    console.log(newUser)

    const userURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/`;

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
          <h1>Create an Account!</h1>
          <form onSubmit={handleSubmit} id="create-account-form">
            <div className="form-floating mb-3">
              <input
                value={username}
                onChange={handleUsernameChange}
                required
                type="text"
                name="username"
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
                type="text"
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
                type="text"
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
                type="text"
                name="email"
                id="email"
                className="form-control"
              />
              <label>E-mail</label>
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
                type="url"
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
                type="text"
                name="description"
                id="description"
                className="form-control"
              />
              <label>Description</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;
