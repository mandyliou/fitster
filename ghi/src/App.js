import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuthContext } from "./auth.js";
import { useLocalStorage } from 'usehooks-ts'
import "./App.css";
import UserPost from "./UserPage.js";
import ForYou from "./ForYouPage.js";
// import MainPage from ./MainPage'
import TopFits from "./TopFits.js";
import CreateOutfitForm from "./CreateOutfit.js";
import CreatePostForm from "./PostForm.js";
import Layout from './Layout.js';
// import ForYouPage from './ForYouPage'



export default function App() {

   const [loginStatus, setLoginStatus] = useLocalStorage("loginStatus", false)
   const [userID, setUserID] = useLocalStorage("userID", null)
   const [userName, setUserName] = useLocalStorage("userName", '')
   const [showLoginForm, setShowLoginForm] = useState(false)
   const [showSignupForm, setShowSignupForm] = useState(false)
   const { token } = useAuthContext();

    useEffect(() => {
        if (token === false) {
            setUserID(null);
            setUserName('');
            localStorage.clear();
        }
    }, [token, setUserID, setUserName, setLoginStatus ]);

  return (
    <div>
      <Routes>
       <Route path="/" element={<Layout
            loginStatus={loginStatus}
            setLoginStatus={setLoginStatus}
            showLoginForm={showLoginForm}
            setShowLoginForm={setShowLoginForm}
            showSignupForm={showSignupForm}
            setShowSignupForm={setShowSignupForm}
            userName={userName}
            setUserName={setUserName}
            userID={userID}
            setUserID={setUserID}
        />} ></Route>
              <Route path="/my-profile" element={<UserPost />} />
              <Route path="/new-user" element={<CreateUserForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/ForYou" element={<ForYou />} />
              <Route path="/TopFits" element={<TopFits />} />
              <Route path="/my-posts" element={<UserPost />} />
              <Route path="/new-outfit" element={<CreateOutfitForm />} />
              <Route path="/new-post" element={<CreatePostForm />} />
      </Routes>
    </div>
  );
}

// export default App;
