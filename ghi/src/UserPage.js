import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";

const UserPost = () => {
  const [posts, SetPosts] = useState([]);
  //   const [user, SetUserID] = useState([])
  const {token} = useAuthContext();

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
        SetPosts(data);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          {post.post_title} {post.outfit_id} {post.post_description}
        </div>
      ))}
    </div>
  );
};

export default UserPost;
