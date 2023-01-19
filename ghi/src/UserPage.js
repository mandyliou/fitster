import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";

const UserPost = () => {
  const [posts, SetPosts] = useState([]);
  //   const [user, SetUserID] = useState([])
  const { token } = useAuthContext();

  useEffect(() => {
    const fetchData = async () => {
      const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts`;
      //   const url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/`;
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

  return (
    <div>
        <h1 className="title">My Outfit Posts</h1>
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
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
};

export default UserPost;
