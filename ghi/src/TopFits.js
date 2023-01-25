import { useEffect } from "react";
import { useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useAuthContext } from "./auth";
import "./TopFits.scss";

export default function Featured({ setID }) {
    const [posts, setPosts] = useState([]);
    const [userName, setUserName] = useState("");

    const [profileDescription, setProfileDescription]=useState("");
    const { token } = useAuthContext();

    useEffect(() => {
        if (token !== null) {
          const tokenParts = token.split(".");
          console.log(tokenParts)
          const userData = JSON.parse(atob(tokenParts[1]));
          console.log(userData)
          setUserName(userData.account.username);
          setProfileDescription(userData.account.description);
        }
    }, [token]);

    
    useEffect(() => {
      const fetchData = async () => {
      const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/api/user/posts`;
      console.log("From user post " + token);
      if (token !== null) {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        console.log(data);
        setPosts(data);
      }
    };
    fetchData();
  }, [token]);
  
    return (
        <>
                <div className="App">
                    <div className="App-header">
                        <h1 className="featured-title">
                           Top Fits Of The Day!
                        </h1>
                        <div  className="featured">
                            {posts.map((post) => (
                                <div key={post.id} className="col-sm-4 mb-3"> 
                                
                                <div className="card1">
                                <Card style={{ width: '22rem', height: '40rem',  position: "relative" }}>
                                        <Card.Header  
                                            className="title">
                                            {post.post_title}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title
                                                className="handle">
                                                @{userName}
                                            </Card.Title>
                                            <Card.Subtitle
                                                className="bio">
                                                {profileDescription}
                                            </Card.Subtitle>
                                           <Stack
                                            style={{ position: "absolute" }}
                                            direction="vertical"
                                            className="justify-content-between mb-3">
                                                <div className="card-body d-flex-column">
                                                <div className="col-5">
                                                <img src={post.top}  alt={post.post_title} className="img-fluid"/> </div>
                                                <div className="col-5">
                                                <img src={post.bottom}  alt={post.post_title} className="img-fluid" /> </div>
                                                <div className="col-5">
                                                <img src={post.shoes}  alt={post.post_title} className="img-fluid" /> </div>
                                                </div>
                                            </Stack>
                                            <Card.Footer style={{ position: "relative", bottom: -450,  }}>
                                              <Card.Text
                                                className="footer">
                                                {post.post_description} 
                                              </Card.Text>
                                            </Card.Footer>
                                        </Card.Body>
                                </Card>
                            </div>
                            </div>))}
                    </div>
                </div>
            </div>
        </>
    )
}
