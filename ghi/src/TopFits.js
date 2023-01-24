import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import "./TopFits.css";

const TopFits=()=>{
    const[posts, SetPosts]=useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [userName, setUserName] = useState("");
    const [profilePhoto, setProfilePhoto]=useState("");
    const [profileDescription, setProfileDescription]=useState("");
    const [userOutfits, setUserOutfits] = useState([]);
    // const[modalShow, setModalShow]=useState();
    const { token } = useAuthContext();

    useEffect(() => {
        if (token !== null) {
          const tokenParts = token.split(".");
          console.log(tokenParts)
          const userData = JSON.parse(atob(tokenParts[1]));
          console.log(userData)
          setUserName(userData.account.username);
          setProfilePhoto(userData.account.profile_photo);
          setProfileDescription(userData.account.description);
        }
    }, [token]);
    const handleChange = async (e) => {
      e.preventDefault();
      const searchUrl= `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/users/${e}`;
      console.log(searchUrl)
      const res2=await fetch(searchUrl)
      if(res2.ok){
        console.log(res2)
      }
    };

    useEffect(()=>{
      const fetchData= async () =>{
      const url=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts/`;
      console.log("From user post " + token);
      if (token !== null) {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data);
        SetPosts(data);
      }
    };
    fetchData();
  }, [token]);

    return(
        <>
      <form className="col-12 col-lg-auto mb-3 mb-lg-0 p-3 ">
        <input type="search"
         className="form-control"
          placeholder="Search..."
          onInput={handleChange}
          value={searchInput} />
      </form>
        <div className="container d-flex flex-wrap justify-content-center">
            <h1 className="fs-1">Top Fits</h1>
        </div>
        <div className="row">
        {posts.map((post)=>(
            <div key={post.id} className='p-3 col-sm-4 mb-3'>
            <div className="card">
                <div className='card-header'>
                    <h5 className='card-title'>{post.post_title}</h5>
                    <p>{userName}</p>
                    <div>
                      <img
                      src={profilePhoto}
                      alt={post.post_title}
                      ></img>
                      </div>
                    <p>{profileDescription}</p>
                </div>
                <div className="card-body d-flex">
                    <div className="col-4">
                    <img
                        src={post.top}
                        alt={post.post_title}
                        className="card-img-top img-fluid"
                    />
                    </div>
                    <div className="col-4">
                    <img
                        src={post.bottom}
                        alt={post.post_title}
                        className="card-img-top img-fluid"
                    />
                    </div>
                    <div className="col-4">
                    <img
                        src={post.shoes}
                        alt={post.post_title}
                        className="card-img-top img-fluid"
                    />
                    </div>
                </div>
                 <div className="card-footer">
                <p className="card-text">{post.post_description}</p>
                </div>
            </div>
         </div>
        ))}
        </div>
    </>
    )
}

export default TopFits;

{/* <header class="p-3 bg-dark text-white">
    <div class="container">
      <div class="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
        <a href="/" class="d-flex align-items-center mb-2 mb-lg-0 text-white text-decoration-none">
          <svg class="bi me-2" width="40" height="32" role="img" aria-label="Bootstrap"><use xlink:href="#bootstrap"></use></svg>
        </a>

        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><a href="#" class="nav-link px-2 text-secondary">Home</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Features</a></li>
          <li><a href="#" class="nav-link px-2 text-white">Pricing</a></li>
          <li><a href="#" class="nav-link px-2 text-white">FAQs</a></li>
          <li><a href="#" class="nav-link px-2 text-white">About</a></li>
        </ul>

        <form class="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
          <input type="search" class="form-control form-control-dark" placeholder="Search..." aria-label="Search">
        </form>

        <div class="text-end">
          <button type="button" class="btn btn-outline-light me-2">Login</button>
          <button type="button" class="btn btn-warning">Sign-up</button>
        </div>
      </div>
    </div>
  </header> */}
