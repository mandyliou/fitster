import React, { useState, useEffect } from "react";
import { useAuthContext, useUser } from "./auth";
import { Button, Card, Stack } from "react-bootstrap";
import { useNavigate } from 'react-router';
import "./UserPage.scss";


export default function UserPost() {
  const [posts, SetPosts] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const user = useUser (token);

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/api/user/posts`;
      if (token !== null) {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        SetPosts(data);
      }
    };
    fetchData();
  }, [token]);

  const handleDelete = async (postId) => {
    try {
      const deleteUrl = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts/${postId}`;
      const res2 = await fetch(deleteUrl, {
        method: "Delete",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res2.ok) {
        SetPosts(posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
           <>
                <div className="App">
                    <div className="App-header">
                        <h1 className="featured-title" >
                           <img
                            style={{ position: "absolute", top: 90, }} 
                            className="profilePhoto"
                            type="profile_photo"
                            src={user?.profile_photo}
                            alt="profile_photo"
                           ></img>
                        </h1>
                        <h2
                           style={{ position: "absolute", top: 245 }} 
                           className="profileUser" >
                           @{user?.username}
                        </h2>
                        <h3
                          style={{ position: "absolute", top: 275 }} 
                          className="profileName" >
                          {user?.first_name} {user?.last_name}
                        </h3>
                        <h4
                         style={{ position: "absolute", top: 300 }} 
                         className="profileDescription" >
                           {user?.description}
                        </h4>
                        <h5
                          style={{ position: "absolute", top: 360 }} 
                          className="MyPosts" >
                          My Posts
                        </h5>
                        <div className="featured">
                            {posts.map((post) => (
                                <div key={post.id} className="col-sm-4 mb-3">
                                <div className="profilecard1"  style={{ position: "relative", top: 250 }} >
                                <Card style={{ width: '20rem', height: '29rem',  position: "relative" }}>
                                        <Card.Header
                                            className="Profile-Title">
                                            <div>{post.post_title}</div>
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title
                                                className="Profile-User">
                                            <div>                          
                                              <img
                                                  className="post-photo"
                                                  src={user?.profile_photo}
                                                  alt={post.post_title}>
                                              </img>
                                            </div>
                                                <div className="post-user">@{user?.username}</div>
                                            </Card.Title>
                                            <Card.Subtitle>
                                            </Card.Subtitle>
                                           <Stack
                                            style={{ position: "absolute" }}
                                            direction="vertical"
                                            className="post-images">
                                                <div className="card-body d-flex-column">
                                                <div className="col-3">
                                                <img src={post.top}  alt={post.post_title} className="img-fluid"/> </div>
                                                <div className="col-3">
                                                <img src={post.bottom}  alt={post.post_title} className="img-fluid" /> </div>
                                                <div className="col-3">
                                                <img src={post.shoes}  alt={post.post_title} className="img-fluid" /> </div>
                                                </div>
                                            </Stack>
                                            <Card.Text
                                                 style={{ position: "right" }}
                                                 className="Mid-Text">
                                                 <div>Outfit Category:</div>
                                                 <div className="SubText">{post.outfit_category}</div>
                                                 <div>Gender:</div>
                                                 <div className="SubText">{post.outfit_gender}</div>
                                                 <div>Outfit Description:</div>
                                                 <div className="SubText">{post.outfit_description}</div>
                                            </Card.Text>
                                            <Card.Footer style={{ position: "relative", bottom: -75,  }}>
                                              <Card.Text
                                                className="profile-footer">
                                                {post.post_description}
                                              </Card.Text>
                                            <Button 
                                                 className="DeletePost"
                                                 variant="DeletePost" 
                                                onClick={() => handleDelete(post.id)}>
                                                Delete Post
                                            </Button>
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