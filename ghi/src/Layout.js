import { Outlet } from 'react-router-dom'
import Navigation from "./Nav";
import Login from "./LoginForm.js";
import CreateUserForm from "./CreateAccount";


export default function Layout({
    loginStatus,
    setLoginStatus,
    showLoginForm,
    setShowLoginForm,
    userName,
    setUserName,
    userID,
    setUserID,
}) {
    return (
        <>
            <div>
                <div>
                    <Navigation
                        loginStatus={loginStatus}
                        setLoginStatus={setLoginStatus}
                        userName={userName}
                        setShowLoginForm={setShowLoginForm}
                    />
                </div>
                <div>
                    <Outlet />
                </div>
                <div>
                    <Login
                        setShowLoginForm={setShowLoginForm}
                        showLoginForm={showLoginForm}
                        setLoginStatus={setLoginStatus}
                        setUserID={setUserID}
                        setUserName={setUserName}
                    />
                </div>
                <div>
                    <CreateUserForm
                        setLoginStatus={setLoginStatus}
                        setUserID={setUserID}
                        setUserName={setUserName}
                    />
                </div>
            </div>
        </>
    )
}
