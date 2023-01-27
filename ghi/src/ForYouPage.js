import React, { useState, useEffect } from "react";
import { createSearchParams, Navigate, useNavigate } from "react-router-dom";
import { useAuthContext } from "./auth";
import "./ForYouPage.scss"
import UserPostPage from "./PostPage";
import { Card, Stack } from "react-bootstrap";


const ForYouPage=()=>{
    const[posts, SetPosts]=useState([]);
    const [searchInput, setSearchInput] = useState("");
    const [userName, setUserName] = useState("");
    const [profilePhoto, setProfilePhoto]=useState("");
    const [profileDescription, setProfileDescription]=useState("");
    const [userOutfits, setUserOutfits] = useState([]);
    const navigate=useNavigate();
    const [postdata, setPostData]=useState("")
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

    const handleOnClick= async (event)=>{
      const postsUrl=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/searchpost/${event}`
      const res= await fetch(postsUrl)
      if(res.ok){
      const tokenParts = token.split(".");
      console.log(tokenParts)
       const data=await res.json()
       console.log(data)
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
    const random_posts=posts.sort(() => 0.5 - Math.random());
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
  <div className="App">
                    <div className="App-header">
                        <h1 
                          style={{ position: "absolute", top: 150 }} 
                          className="ForYouTitle">
                          For You
                        </h1>
                        <div  className="ForYou">
                            {random_posts.slice(0,3).map((post) => (
                                <div key={post.id} className="col-sm-4 mb-3">
                                <div className="card1"  style={{ position: "relative", top: 40 }} >
                                <Card style={{ width: '22rem', height: '38rem',  position: "relative" }}>
                                        <Card.Header 
                                            className="ForTitle">
                                            {post.post_title}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title
                                                className="ForName">
                                                @{post.outfit_name}
                                            </Card.Title>
                                           <Stack
                                            style={{ position: "absolute" }}
                                            direction="vertical"
                                            className="ForImages">
                                                <div className="card-body d-flex-column">
                                                <div className="col-5">
                                                <img src={post.top}  alt={post.post_title} className="img-fluid"/> </div>
                                                <div className="col-5">
                                                <img src={post.bottom}  alt={post.post_title} className="img-fluid" /> </div>
                                                <div className="col-5">
                                                <img src={post.shoes}  alt={post.post_title} className="img-fluid" /> </div>
                                                </div>
                                            </Stack>
                                            <Card.Text
                                                 style={{ position: "right" }}
                                                 className="ForYou-text">
                                                 <div>Outfit Category:</div>
                                                 <div className="ForText">{post.outfit_category}</div>
                                                 <div>Gender:</div>
                                                 <div className="ForText">{post.outfit_gender}</div>
                                                 <div>Outfit Description:</div>
                                                 <div className="ForText">{post.outfit_brand}</div>
                                            </Card.Text>
                                            <Card.Footer style={{ position: "relative", bottom: -270,  }}>
                                              <Card.Text
                                                className="ForFooter">
                                                {post.post_description}
                                              </Card.Text>
                                            </Card.Footer>
                                        </Card.Body>
                                </Card>
                            </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </>
    )
}


export default ForYouPage;


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