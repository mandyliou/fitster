import React, { useState, useEffect } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useAuthContext } from "./auth";
import "./ForYouPage.css"
import { useSearchParams } from "react-router-dom";

const UserProfile=()=>{
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const username = searchParams.get("user_username");
    const user_description=searchParams.get("user_description")
    const user_first_name=searchParams.get("user_first_name")
    const user_last_name=searchParams.get("user_last_name")
    const user_profile_photo=searchParams.get("user_profile_photo")
    const user_posts_data=searchParams.get("post_data")
    const user_id=searchParams.get("user_id")
    const [posts, setPosts]=useState([]);
    useEffect(()=>{
        const fetchData=async ()=>{
        const UserpUrl=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/searchuser/${user_id}/posts`
        const res=await fetch(UserpUrl)
        const data=await res.json()
        setPosts(data)
        console.log(data)
        }
        fetchData();
    }, []);
    return(
        <>
        <div className="col-sm-4 mb-3">
            <div className="card">
              <div className="card-header">
                <h5 className="card-title">User: {username}</h5>
              </div>
              <div className="card-body d-flex">
                {/* <div className="col-4"> */}
                  <img
                    src={user_profile_photo}
                    alt={user_profile_photo}
                    height="100"
                    width="100"
                  />
                {/* </div> */}
                <div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">User's Name: {user_first_name} {user_last_name} </li>
                        <li className="list-group-item">User Bio: {user_description} </li>
                      </ul>
                </div>
              </div>
            </div>
          </div>
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
        </>
        )
};
export default UserProfile;
