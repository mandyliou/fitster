import { useEffect } from "react";
import { useState } from "react";
import { createSearchParams, useNavigate } from "react-router-dom";
import { Card, Stack } from "react-bootstrap";

import "./TopFits.scss";

export default function Featured({ setID }) {
    const [posts, setPosts] = useState([]);
    const [searchInput, setSearchInput] = useState("");
    const navigate=useNavigate();
    const handleOnClick= async (event)=>{
      const postsUrl=`${process.env.REACT_APP_USERS_SERVICE_API_HOST}/currentusers/${event}`
      const res= await fetch(postsUrl)
      if(res.ok){
       const data=await res.json()
       console.log(data)
       const user_id=data.id
       const UserpUrl=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/searchuser/${user_id}/posts`
       const res2=await fetch(UserpUrl)
       if(res2.ok){
        const data2=await res2.json()
        console.log(data2)
        navigate({
        pathname:`/UserProfile`,
        search: createSearchParams({
          user_description: data.description,
          user_first_name: data.first_name,
          user_last_name:data.last_name,
          user_profile_photo: data.profile_photo,
          user_username: data.username,
          user_id: data.id
        }).toString(),
       });
       }
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
      setPosts(data);
        }
    fetchData();
    }, []);

    return (
        <>
              <div className="input-group mb-3">
                    <input
                        onChange={handleInputChange}
                        type="text"
                        id="usersearch"
                        name="usersearch"
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
                        >Search For User</button>
                    </div>
                  </div>
                <div className="App">
                    <div className="App-header">
                        <h1 className="featured-title">
                           Top Fits Of The Day!
                        </h1>
                        <div  className="featured">
                            {posts.map((post) => (
                                <div key={post.id} className="col-sm-4 mb-3">

                                <div className="card1">
                                <Card style={{ width: '22rem', height: '40rem',  position: "relative" }}>
                                        <Card.Header
                                            className="title">
                                            {post.post_title}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title
                                                className="handle">
                                                @{post.poster_username}
                                            </Card.Title>
                                            <Card.Subtitle
                                                className="bio">
                                                {post.poster_description}
                                            </Card.Subtitle>
                                           <Stack
                                            style={{ position: "absolute" }}
                                            direction="vertical"
                                            className="justify-content-between mb-3">
                                                <div className="card-body d-flex-column">
                                                <div className="col-5">
                                                <img src={post.top}  alt={post.post_title} className="img-fluid"/> </div>
                                                <div className="col-5">
                                                <img src={post.bottom}  alt={post.post_title} className="img-fluid" /> </div>
                                                <div className="col-5">
                                                <img src={post.shoes}  alt={post.post_title} className="img-fluid" /> </div>
                                                </div>
                                            </Stack>
                                            <Card.Footer style={{ position: "relative", bottom: -450,  }}>
                                              <Card.Text
                                                className="footer">
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
