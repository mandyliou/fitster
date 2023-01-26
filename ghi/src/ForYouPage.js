import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import "./ForYouPage.css"

const ForYouPage=()=>{
    const[posts, SetPosts]=useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [userName, setUserName] = useState("");
    const [profilePhoto, setProfilePhoto]=useState("");
    const [profileDescription, setProfileDescription]=useState("");
    const [userOutfits, setUserOutfits] = useState([]);
    // const[modalShow, setModalShow]=useState();
    const { token } = useAuthContext();
  //   useEffect(() => {
  //     const fetchOutfits = async () => {
  //     const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/api/user/outfits`;
  //     if (token != null) {const res = await fetch(url, {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     const data = await res.json();
  //     console.log(token)
  //     setUserOutfits(data);
  //     }
  //   };
  //   fetchOutfits();
  // }, [token]);
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

    const handleOnClick= async (event)=>{
      const postsUrl=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/searchpost/${event}`
    };
    const handleInputChange = (e) => {
      const value=e.target.value;
      setSearchInput(value);
    };

    useEffect(()=>{
      const fetchData= async () =>{
      const url=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts`;
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
                <div className="input-group mb-3">
                    <input
                        onChange={handleInputChange}
                        type="text"
                        id="postsearch"
                        name="postsearch"
                        className="form-control"
                        placeholder="Search" aria-label="search"
                        aria-describedby="basic-addon2"
                        value={searchInput}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={() => handleOnClick(searchInput)}
                        >Search For Post by Title</button>
                    </div>
                  </div>
            <div className="container d-flex flex-wrap justify-content-center">
                <h1 className="fs-1">For You</h1>
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
                          className="post-photo"
                          src={profilePhoto}
                          alt={post.post_title}
                          ></img>
                          </div>
                        <p>{profileDescription}</p>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Outfit Name: {post.outfit_name}</li>
                      </ul>
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
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Outfit Category: {post.outfit_category}</li>
                        <li className="list-group-item">Outfit Description: {post.outfit_description}</li>
                        <li className="list-group-item">Outfit Gender: {post.outfit_gender}</li>
                      </ul>
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

export default ForYouPage;
