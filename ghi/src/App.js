import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Construct from "./Construct.js";
import ErrorNotification from "./ErrorNotification";
import "./App.css";
import CreateUserForm from "./CreateAccount";
import LoginForm from "./LoginForm.js";
import Ratings from "./Ratings.js";
import { AuthProvider, useToken } from "./auth.js";

function GetToken() {
  useToken();
  return null;
}

// function App() {
//   const [launch_info, setLaunchInfo] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function getData() {
//       let url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users`;
//       console.log("fastapi url: ", url);
//       let response = await fetch(url);
//       console.log("------- hello? -------");
//       let data = await response.json();

//       if (response.ok) {
//         console.log("got launch data!");
//         setLaunchInfo(data.launch_details);
//       } else {
//         console.log("drat! something happened");
//         setError(data.message);
//       }
//     }
//     getData();
//   }, []);

export default function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <GetToken />
          <div className="container">
            <Routes>
              {/* <Route path="/" element={<MainPage />} /> */}
              <Route path="/new-user" element={<CreateUserForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/ratings" element={<Ratings />} />
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

// export default App;
