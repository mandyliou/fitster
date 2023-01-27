import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth";
import "./ForYouPage.css"
import UserPostPage from "./PostPage";

const ForYouPage=()=>{
    const[posts, SetPosts]=useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [userName, setUserName] = useState("");
    const [profilePhoto, setProfilePhoto]=useState("");
    const [profileDescription, setProfileDescription]=useState("");

    const navigate=useNavigate();

    const { token } = useAuthContext();
    useEffect(() => {
        if (token !== null) {
          const tokenParts = token.split(".");

          const userData = JSON.parse(atob(tokenParts[1]));

          setUserName(userData.account.username);
          setProfilePhoto(userData.account.profile_photo);
          setProfileDescription(userData.account.description);
        }
    }, [token]);

    const handleOnClick= async (event)=>{
      const postsUrl=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/searchpost/${event}`
      const res= await fetch(postsUrl)
      if(res.ok){
       const data=await res.json()

       navigate({
        pathname:`/PostPage`,
        search: createSearchParams({
          postid: data.id,
          post_title: data.post_title,
          post_description: data.post_description,
          outfit_id: data.outfit_id,
          outfit_name: data.outfit_name,
          outfit_brand: data.outfit_brand,
          outfit_category: data.outfit_category,
          outfit_gender: data.outfit_gender,
          outfit_top: data.top,
          outfit_bottom: data.bottom,
          outfit_shoes:data.shoes,
          outfit_description:data.outfit_description,
        }).toString(),
       });
      }
    };
    const handleInputChange = (e) => {
      const value=e.target.value;
      setSearchInput(value);
    };

    useEffect(()=>{
      const fetchData= async () =>{
      const url=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts`;

      if (token !== null) {
        const res = await fetch(url)
        if(res.ok){
          const data = await res.json();

          SetPosts(data);
        }
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
                        <p>{post.poster_username}</p>
                        <div>
                          <img
                          className="post-photo"
                          src={post.poster_profile_phot}
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
