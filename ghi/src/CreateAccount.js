import React, {useState} from 'react'
import Modal from 'react-bootstrap/Modal';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
}

export default function CreateUserForm({
    showSignupForm,
    setShowSignupForm,
}) {
  const [username, setUsername] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [profile_photo, setProfilePhoto] = useState("");
  const [description, setDescription] = useState("");
  const [showSubmitButton] = useState("btn btn-outline-secondary")

  const handleCloseSignupForm = () => setShowSignupForm(false);

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

    const userURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users`;

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
        <Modal
            show={showSignupForm}
            onHide={handleCloseSignupForm}
            centered
        >
            <Modal.Header
                closeButton
                closeLabel="Close"
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Sign Up!
                </Modal.Title>
            </Modal.Header>
            <form className="register-form" onSubmit={handleSubmit}>
                <Modal.Body>
                   <BootstrapInput
                        id="username"
                        placeholder="username"
                        labelText="Username"
                        value={username}
                        onChange={handleUsernameChange}
                        type="username" />
                    <BootstrapInput
                        id="first_name"
                        placeholder="Edgar"
                        labelText="First Name"
                        value={first_name}
                        onChange={handFirstNameChange}
                        type="name" />
                    <BootstrapInput
                        id="lastname"
                        placeholder="Jones"
                        labelText="Last Name"
                        value={last_name}
                        onChange={handleLastNameChange}
                        type="name" />
                    <BootstrapInput
                        id="email"
                        placeholder="name@example.com"
                        labelText="Email Address"
                        value={email}
                        onChange={handleEmailChange}
                        type="email" />
                    <BootstrapInput
                        id="password"
                        placeholder="Case Sensitive"
                        labelText="Password"
                        value={password}
                        onChange={handlePasswordChange}
                        type="password" />
                     <BootstrapInput
                        id="profile_photo"
                        placeholder="Url"
                        labelText="Profile Photo"
                        value={profile_photo}
                        onChange={handleProfilePhotoChange}
                        type="profile_photo" />
                       <BootstrapInput
                        id="description"
                        placeholder="Biography"
                        labelText="Description"
                        value={description}
                        onChange={handleDescriptionChange}
                        type="description" />
                </Modal.Body>
                <Modal.Footer>
                    <button type="submit" className={showSubmitButton}>Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
    );
}
