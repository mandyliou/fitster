// import Ratings from "./Ratings";
import React, { useState, useEffect } from "react";
import { useAuthContext } from "./auth";
import { Modal, Button } from "react-bootstrap";

function BootstrapInputFields(props) {
  const { id, label, value, onChange, type, placeholder } = props;

  return (
    <div className="mb-3">
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      <input
        value={value}
        onChange={onChange}
        required
        type={type}
        className="form-control"
        id={id}
        placeholder={placeholder}
      />
    </div>
  );
}

function UserUpdateModal(props) {
  const [user, setUser] = useState({ ...props.user, password: "" });
  const [errorMessage, setErrorMessage] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      props.update(user);
      setErrorMessage(false);
      props.setModalShow(false);
    } catch (err) {
      setErrorMessage(true);
    }
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Update Profile
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={handleSubmit}>
          <BootstrapInputFields
            id="userName"
            label="Enter Username"
            value={user.username}
            onChange={(e) =>
              setUser({
                ...user,
                username: e.target.value,
              })
            }
            type="text"
            placeholder="Username"
          />
          <BootstrapInputFields
            id="first"
            label="Enter First Name"
            value={user.first}
            onChange={(e) =>
              setUser({
                ...user,
                first: e.target.value,
              })
            }
            type="text"
            placeholder="First name"
          />
          <BootstrapInputFields
            id="last"
            label="Enter Last Name"
            value={user.last}
            onChange={(e) =>
              setUser({
                ...user,
                last: e.target.value,
              })
            }
            type="text"
            placeholder="Last name"
          />
          <BootstrapInputFields
            id="email"
            label="Enter Email Address"
            value={user.email}
            onChange={(e) =>
              setUser({
                ...user,
                email: e.target.value,
              })
            }
            type="email"
            placeholder="name@website.com"
          />
          <BootstrapInputFields
            id="password"
            label="Enter Password"
            value={user.password}
            onChange={(e) =>
              setUser({
                ...user,
                password: e.target.value,
              })
            }
            type="text"
            placeholder="Password"
          />
          <BootstrapInputFields
            id="profile_photo"
            label="Choose a profile picture"
            value={user.profile_photo}
            onChange={(e) =>
              setUser({
                ...user,
                profile_photo: e.target.value,
              })
            }
            type="text"
            placeholder="Url"
          />
          <BootstrapInputFields
            id="description"
            label="Biography"
            value={user.description}
            onChange={(e) =>
              setUser({
                ...user,
                reason: e.target.value,
              })
            }
            type="text"
            placeholder="Description"
          />
          <button type="submit" className="btn btn-outline-success">
            Submit
          </button>
          <div className="text-center mt-4" style={{ color: "red" }}>
            {errorMessage ? <h5>Email or Username already exists</h5> : ""}
          </div>
        </form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

const UserPost = (props) => {
  const [posts, SetPosts] = useState([]);
  const [modalShow, setModalShow] = useState();
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

  const handleDelete = async (postId) => {
    try {
      const deleteUrl = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts/${postId}`;
      const res2 = await fetch(deleteUrl, {
        method: "Delete",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res2.ok) {
        SetPosts(posts.filter((post) => post.id !== postId));
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1 className="title">My Outfit Posts</h1>
      <div className="updateButton">
        <Button
          variant="btn btn-outline-success"
          onClick={() => setModalShow(true)}
        >
          Update Profile
        </Button>
      </div>
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
                <p className="card-text">{post.ratings}</p>
                <Ratings />
                <Button variant="danger" onClick={() => handleDelete(post.id)}>
                  Delete Post
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* </div> */}
      <UserUpdateModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        user={props.user}
        setModalShow={setModalShow}
        update={props.update}
      />
    </div>
  );
};

export default UserPost;
