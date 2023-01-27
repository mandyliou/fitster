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
    console.log(username)
    console.log(user_posts_data)
    return(
        <>
        <div>{username}</div>
        <div>{user_description}</div>
        <div>{user_first_name}</div>
        <div>{user_last_name}</div>
        <div>{user_profile_photo}</div>
        <div>
            {user_posts_data}
        </div>
        </>
        )
};
export default UserProfile;
