import { useEffect } from "react";
import { useState } from "react";
import { Card, Stack } from "react-bootstrap";
import { useAuthContext } from "./auth";
import "./TopFits.scss";


export default function Featured() {
    const [posts, setPosts] = useState([]);
    const { token } = useAuthContext();

    useEffect(() => {
      const fetchData = async () => {
      const url = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/posts`;
      if (token ) {
        const res = await fetch(url, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setPosts(data);
      }
    };
    fetchData();
  }, [token]);
  const random_posts=posts.sort(() => 0.5 - Math.random());
    return (
        <>
                <div className="App">
                    <div className="App-header">
                        <h1 
                          style={{ position: "absolute", top: 90 }} 
                          className="featured-title">
                          Top Fits Of The Day!
                        </h1>
                        <div  className="featured">
                            {random_posts.slice(0,3).map((post) => (
                                <div key={post.id} className="col-sm-4 mb-3">
                                <div className="card1"  style={{ position: "relative", top: 40 }} >
                                <Card style={{ width: '22rem', height: '38rem',  position: "relative" }}>
                                        <Card.Header
                                            className="title">
                                            {post.post_title}
                                        </Card.Header>
                                        <Card.Body>
                                            <Card.Title
                                                className="username">
                                                @{post.outfit_name}
                                            </Card.Title>
                                           <Stack
                                            style={{ position: "absolute" }}
                                            direction="vertical"
                                            className="featured-images">
                                                <div className="card-body d-flex-column">
                                                <div className="col-5">
                                                <img src={post.top}  alt={post.post_title} className="img-fluid"/> </div>
                                                <div className="col-5">
                                                <img src={post.bottom}  alt={post.post_title} className="img-fluid" /> </div>
                                                <div className="col-5">
                                                <img src={post.shoes}  alt={post.post_title} className="img-fluid" /> </div>
                                                </div>
                                            </Stack>
                                            <Card.Text
                                                 style={{ position: "right" }}
                                                 className="Middle-Text">
                                                 <div>Outfit Category:</div>
                                                 <div className="Sub-Text">{post.outfit_category}</div>
                                                 <div>Gender:</div>
                                                 <div className="Sub-Text">{post.outfit_gender}</div>
                                                 <div>Outfit Description:</div>
                                                 <div className="Sub-Text">{post.outfit_description}</div>
                                            </Card.Text>
                                            <Card.Footer style={{ position: "relative", bottom: -270,  }}>
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
