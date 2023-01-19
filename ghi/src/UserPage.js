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
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.post_title}</h3>
          <img src={post.top} alt={post.post_title} />
          <img src={post.bottom} alt={post.post_title} />
          <img src={post.shoes} alt={post.post_title} />
          <p>{post.post_description}</p>
        </div>
      ))}
    </div>
  );
};


export default UserPost;


// import React, { useState, useEffect } from "react";


// const UserPost = () => {
//   const [posts, SetPosts] = useState([]);
// //   const [user, SetUserID] = useState([])


// let user_id = 1

//   useEffect(() => {
//       const fetchData = async () => {
//       const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts/${user_id}`;
//     //   const url = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/`;
//       const res = await fetch(url);
//       const data = await res.json();
//       SetPosts(data);
//     };
//     fetchData();
//   }, []);

//   return (
//     <div>
//       {posts.map((post) => (
//         <div key={post.id}>{post.post_title} {post.outfit_id} {post.post_description}</div>
//       ))}
//     </div>
//   );
// };

// export default UserPost;
