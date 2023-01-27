import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import {  Button } from "react-bootstrap";
import { useNavigate } from 'react-router';


const UserPost = () => {
  const [posts, SetPosts] = useState([]);
  const navigate = useNavigate();
  const { token } = useAuthContext();

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
    <div>
      <h1 className="title">My Outfit Posts</h1>
      <div className="updateButton">
        <Button
          variant="btn btn-outline-success" onClick={() => navigate("/update-account")}
        >
          Update Profile
        </Button>
      </div>
      <div className="row">
        {posts.map((post) => (
          <div key={post.id} className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">{post.post_title}</h5>
              </div>
              <div className="card-body d-flex">
                <div className="col-4">
                  <img
                    src={post.top}
                    alt={post.post_title}
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src={post.bottom}
                    alt={post.post_title}
                    className="img-fluid"
                  />
                </div>
                <div className="col-4">
                  <img
                    src={post.shoes}
                    alt={post.post_title}
                    className="img-fluid"
                  />
                </div>
              </div>
              <div className="card-footer">
                <p className="card-text">{post.post_description}</p>
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPost;
