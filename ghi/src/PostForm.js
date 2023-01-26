import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";

const CreatePostForm = () => {
  const [outfitId, setOutfitId] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postTitle, setPostTitle] = useState("");
  const [userOutfits, setUserOutfits] = useState([]);
  const { token } = useAuthContext();

  useEffect(() => {
      const fetchOutfits = async () => {
      const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/api/user/outfits`;
      if (token != null) {const res = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      console.log(token)
      setUserOutfits(data);
      }
    };
    fetchOutfits();
  }, [token]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      "outfit_id": parseInt(outfitId),
      "post_description": postDescription,
      "post_title": postTitle,
    };

    console.log(newPost)

    const postURL = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/api/posts`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newPost),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(postURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setOutfitId("");
        setPostDescription("");
        setPostTitle("");
      })
      .catch((e) => console.error("Error creating post: ", e));
  };

  const handleOutfitIdChange = (event) => {
    const value = event.target.value;
    setOutfitId(value);
  };

  const handlePostDescriptionChange = (event) => {
    const value = event.target.value;
    setPostDescription(value);
  };

  const handlePostTitleChange = (event) => {
    const value = event.target.value;
    setPostTitle(value);
  };


    return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create a Post</h1>
          <form onSubmit={handleSubmit} id="create-post-form">
            <div className="form-floating mb-3">
                <select
                  className="form-control"
                  id="outfit-select"
                  value={outfitId}
                  onChange={handleOutfitIdChange}
                >
                <option 
                  value="" 
                  disabled> Select an Outfit </option>
                {userOutfits.map((outfit) => (
                <option 
                  key={outfit.id}
                  value={outfit.id}>
                  {outfit.outfit_name}
                </option>
            ))}
                </select>
              <label>Select a Fit!</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={postTitle}
                onChange={handlePostTitleChange}
                required
                type="text"
                name="post-title"
                id="post-title"
                className="form-control"
              />
              <label>Post Title</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={postDescription}
                onChange={handlePostDescriptionChange}
                required
                type="post-description"
                name="post-description"
                id="post-description"
                className="form-control"
              />
              <label>Post Description</label>
            </div>
            <button className="btn btn-primary">Create Post</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostForm;