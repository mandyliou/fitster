import React from 'react';
import { NavLink } from 'react-router-dom';
import { useToken } from "./auth.js";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';


function showUserName(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showLogoutButton(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showLoginButton(status) {
    if (status === true) {
        return "d-none"
    } else {
        return ""
    };
};

export default function Navigation({
    loginStatus,
    setLoginStatus,
    userName,
    setShowLoginForm,
}) {
    const [, logout] = useToken();
    const handleShowLoginForm = () => setShowLoginForm(true);
    const handleLogout = async e => {
        e.preventDefault();
        /* handle status update before logout to prevent
        401 responses from useToken looping fetch calls */
        setLoginStatus(false);
        await logout();
    }

    return (
        <Navbar
            className="navbar-visual"
            sticky="top"
        >
            <Navbar.Collapse>
                <Navbar.Brand
                    as={NavLink}
                    to="/"
                >
                    <img
                        alt="Fitster Logo"
                        src={`${process.env.PUBLIC_URL}/navlogo.svg`}
                        height="50"
                        className="d-inline-block align-top"
                    />
                </Navbar.Brand>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                    <Navbar.Text className={showUserName(loginStatus)} >Signed in as: {userName} |</Navbar.Text>
                   <Nav.Link className={showLoginButton(loginStatus)} onClick={handleShowLoginForm}>Login</Nav.Link>
                   <NavLink className="navbar-brand" to="/new-user">Signup</NavLink>
                      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                      </button>
                   <Nav.Link className={showLogoutButton(loginStatus)} onClick={handleLogout}>Logout</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
};
