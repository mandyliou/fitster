import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import { Modal, Button } from "react-bootstrap";

const AllPosts=(props)=>{
    const[posts, SetPosts]=useState([]);
    // const[modalShow, setModalShow]=useState();
    const { token } = useAuthContext();
    useEffect(()=>{
        const fetchData=async()=>{
        const url=`${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts`;
        }
    },[token]);
}
