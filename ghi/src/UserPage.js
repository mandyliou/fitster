import React, { useState, useEffect } from "react";


const UserPost = () => {
  const [posts, SetPosts] = useState([]);
//   const [user, SetUserID] = useState([])


let user_id = 1

  useEffect(() => {
      const fetchData = async () => {
      const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts/${user_id}`;
    //   const url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/`;
      const res = await fetch(url);
      const data = await res.json();
      SetPosts(data);
    };
    fetchData();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>{post.post_title} {post.outfit_id} {post.post_description}</div>
      ))}
    </div>
  );
};

export default UserPost;
