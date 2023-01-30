import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import { useToken, useAuthContext } from "./auth.js";
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import "./Nav.css";


function showProfileButton(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showForYouButton(status) {
    if (status === true) {
        return "nav-box"
    } else {
        return "d-none"
    };
};

function showPostButton(status) {
    if (status === true) {
        return "nav-box"
    } else {
        return "d-none"
    };
};


function showOutfitButton(status) {
    if (status === true) {
        return "nav-box"
    } else {
        return "d-none"
    };
};

function showUserName(status) {
    if (status === true) {
        return "user-box"
    } else {
        return "d-none"
    };
};

function showLoginButton(status) {
    if (status === true) {
        return "d-none"
    } else {
        return "nav-box"
    };
};

function showLogoutButton(status) {
    if (status === true) {
        return ""
    } else {
        return "d-none"
    };
};

function showSignupButton(status) {
    if (status === true) {
        return "d-none"
    } else {
        return "nav-box"
    };
};

export default function Navigation({
    loginStatus,
    setLoginStatus,
    setShowLoginForm,
    setShowSignupForm
}) {
    const [, logout] = useToken();
    const handleShowLoginForm = () => setShowLoginForm(true);
    const handleShowSignupForm = () => setShowSignupForm(true);
    const handleLogout = async e => {
        e.preventDefault();
        setLoginStatus(false);
        await logout();

    }

    const { token } = useAuthContext();
    const [userName, setUserName] = useState("");


useEffect(() => {
  if (token !== null) {
    const tokenParts = token.split(".");
    const userData = JSON.parse(atob(tokenParts[1]));
    setUserName(userData.account.username)
  }
}, [token]);

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
                        alt="Fitster"
                        src={`${process.env.PUBLIC_URL}/navlogo.png`}
                        height="50"
                        className="Fitster-logo"
                    />
                </Navbar.Brand>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Nav>
                  <Nav.Link className={showOutfitButton(loginStatus)} as={NavLink} to="/new-outfit">Create Outfit</Nav.Link>
                  <Nav.Link className={showPostButton(loginStatus)} as={NavLink} to="/new-post">Create Post</Nav.Link>
                  <Nav.Link className={showForYouButton(loginStatus)} as={NavLink} to="/ForYou">For You</Nav.Link>
                  <Nav.Link className={showLoginButton(loginStatus)} onClick={handleShowLoginForm}>Login</Nav.Link>
                  <Nav.Link className={showSignupButton(loginStatus)} onClick={handleShowSignupForm}>Signup</Nav.Link>
                  <Dropdown>
                  <Dropdown.Toggle className={showUserName(loginStatus)} >@{userName}</Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className={showProfileButton(loginStatus)} as={NavLink} to="/my-profile">Profile</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item className={showLogoutButton(loginStatus)} onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                  </Dropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar >
    )
};
