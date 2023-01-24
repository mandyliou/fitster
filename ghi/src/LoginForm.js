import React, { useState } from "react";
import { useToken } from "./auth";
import { Link } from "react-router-dom";
import Modal from 'react-bootstrap/Modal';
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';

function BootstrapInput(props) {
    const { id, placeholder, labelText, value, onChange, type } = props;

    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{labelText}</label>
            <input value={value} onChange={onChange} required type={type} className="form-control" id={id} placeholder={placeholder} />
        </div>
    )
}

export default function LoginForm({
    showLoginForm,
    setShowLoginForm,
    setLoginStatus,
}) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, login] = useToken();
    const [showSpinner, setShowSpinner] = useState('d-none')
    const [showSubmitButton, setShowSubmitButton] = useState("btn btn-outline-secondary")
    
    const [invalid, setInvalid] = useState(false);
    if(token !== null) {
      console.log("You are already signed in")
    }
    const handleCloseLoginForm = () => setShowLoginForm(false);

    const loading = () => {
        setShowSubmitButton("d-none btn btn-outline-secondary");
        setShowSpinner('');
        setInvalid(false);
    }

    const loginError = () => {
        setShowSubmitButton("btn btn-outline-secondary");
        setShowSpinner('d-none');
        setInvalid(true);
    }

    const loginSuccess = () => {
        setShowSubmitButton("btn btn-outline-secondary");
        setShowSpinner('d-none');
        setInvalid(false);
    }

    const clearForm = () => {
        setUsername('');
        setPassword('');
    }


    const handleSubmit = async(e) => {
        e.preventDefault();
        loading();
        const error = await login(username, password);
        if (error) {
           loginError();
        } else {
            setLoginStatus(true);
            handleCloseLoginForm();
            loginSuccess();
            clearForm();
        }
    };
     
    const signupPhrase = `Don't have an account? Sign Up`;

     return (
        <Modal
            show={showLoginForm}
            onHide={handleCloseLoginForm}
            centered
        >
            <Modal.Header
                closeButton
                closeLabel="Close"
            >
                <Modal.Title id="contained-modal-title-vcenter">
                    Login
                </Modal.Title>
            </Modal.Header>
            <form className="register-form" onSubmit={handleSubmit}>
                <Modal.Body>
                    <BootstrapInput
                        id="username"
                        placeholder="foxtrot"
                        labelText="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="username" />
                    <BootstrapInput
                        id="password"
                        placeholder="Case Sensitive"
                        labelText="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password" />
                </Modal.Body>
                <Modal.Footer>
                    <Alert variant="danger" show={invalid}>
                        Invalid Username or Password.
                    </Alert>
                    <Link to="/new-user" className="float-end" variant="body2">
                        {signupPhrase}
                    </Link>
                    <Spinner className={showSpinner} animation="border" variant="secondary" />
                    <button type="submit" className={showSubmitButton}>Submit</button>
                </Modal.Footer>
            </form>
        </Modal>
 );
};