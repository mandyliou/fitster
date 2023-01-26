import React, {useEffect, useState} from 'react'
import { useAuthContext } from './auth';

const UpdateAccountForm = () => {
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profile_photo, setProfilePhoto] = useState("");
    const [description, setDescription] = useState("");
    const { token } = useAuthContext();

    const handleSubmit = (event) => {
        event.preventDefault();
        const updateUser = {
            "username": username,
            "first_name": first_name,
            "last_name": last_name,
            "email": email,
            "password": password,
            "profile_photo": profile_photo,
            "description": description,
        };

        console.log(updateUser)

        const userURL = `${process.env.REACT_APP_USERS_SERVICE_API_HOST}/users/${user_id}`;
        if (token !== null) {

            const fetchConfig = {
                method: "put",
                body: JSON.stringify(updateUser),
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            };

            fetch(userURL, fetchConfig)






export default UpdateAccountForm;
