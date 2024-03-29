import React, { useState, useEffect } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import "./ForYouPage.scss"
import { Card, Stack } from "react-bootstrap";

const ForYouPage=()=>{
    const[posts, SetPosts]=useState([]);
    const [searchInput, setSearchInput] = useState("");

    const navigate=useNavigate();

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
      const res = await fetch(url)
      const data = await res.json();
      SetPosts(data);
        }
    fetchData();
    }, []);
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
                            {random_posts.map((post) => (
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