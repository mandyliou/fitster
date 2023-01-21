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
    <div>
      <h1>Create a Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="outfit-select">Select an Outfit:</label>
          <select
            className="form-control"
            id="outfit-select"
            value={outfitId}
            onChange={handleOutfitIdChange}
          >
            <option value="" disabled>
              Select an Outfit
            </option>
            {userOutfits.map((outfit) => (
              <option key={outfit.id} value={outfit.id}>
                {outfit.outfit_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="post-title">Post Title:</label>
          <input
            type="text"
            className="form-control"
            id="post-title"
            value={postTitle}
            onChange={handlePostTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="post-description">Post Description:</label>
          <textarea
            className="form-control"
            id="post-description"
            value={postDescription}
            onChange={handlePostDescriptionChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePostForm;
