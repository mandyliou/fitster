import React from "react";
import { useNavigate } from "react-router-dom";
import "./ForYouPage.scss"
import { useSearchParams } from "react-router-dom";

const UserPostPage=()=>{
    const navigate=useNavigate();
    const [searchParams] = useSearchParams();
    const post_title=searchParams.get("post_title")
    const post_description=searchParams.get("post_description")
    const outfit_name=searchParams.get("outfit_name")
    const outfit_brand=searchParams.get("outfit_brand")
    const outfit_category=searchParams.get("outfit_category")
    const outfit_gender=searchParams.get("outfit_gender")
    const outfit_top=searchParams.get("outfit_top")
    const outfit_bottom=searchParams.get("outfit_bottom")
    const outfit_shoes=searchParams.get("outfit_shoes")
    const outfit_description=searchParams.get("outfit_description")
    return(
        <>
        <div className="input-group-append">
                        <button
                            className="btn-sm btn-outline-secondary"
                            type="button"
                            onClick={e=>navigate("/ForYou")}
                        >Back To For You</button>
                    </div>
                <div className="card">
                    <div className='card-header'>
                        <h5 className='card-title'>{post_title}</h5>
                    </div>
                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Outfit Name: {outfit_name}</li>
                      </ul>
                    <div className="card-body d-flex">
                        <div className="col-4">

                        <img
                            src={outfit_top}
                            alt={post_title}
                            className="card-img-top img-fluid"
                        />
                        </div>
                        <div className="col-4">
                        <img
                            src={outfit_bottom}
                            alt={post_title}
                            className="card-img-top img-fluid"
                        />
                        </div>
                        <div className="col-4">
                        <img
                            src={outfit_shoes}
                            alt={post_title}
                            className="card-img-top img-fluid"
                        />
                        </div>
                    </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">Outfit Category: {outfit_category}</li>
                        <li className="list-group-item">Outfit Description: {outfit_description}</li>
                        <li className="list-group-item">Outfit Gender: {outfit_gender}</li>
                        <li className="list-group-item">Outfit Brand: {outfit_brand}</li>
                      </ul>
                    <div className="card-footer">
                    <p className="card-text">{post_description}</p>
                    </div>
                </div>
    </>
    )
}
export default UserPostPage;
