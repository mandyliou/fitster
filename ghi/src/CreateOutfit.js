import React, {useState} from 'react'
import { useAuthContext } from './auth';


const CreateOutfitForm = () => {
  const [outfit_name, setOutfitName] = useState("");
  const [outfit_brand, setOutfitBrand] = useState("");
  const [top, setTop] = useState("");
  const [bottom, setBottom] = useState("");
  const [shoes, setShoes] = useState("");
  const [outfit_category, setOutfitCategory] = useState("");
  const [outfit_gender, setOutfitGender] = useState("");
  const [outfit_description, setOutfitDescription] = useState("");
  const { token } = useAuthContext();

  
  const handleSubmit = (event) => {
    event.preventDefault();
    const newOutfit = {
      "outfit_name": outfit_name,
      "outfit_brand": outfit_brand,
      "top": top,
      "bottom": bottom,
      "shoes": shoes,
      "outfit_category": outfit_category,
      "outfit_gender": outfit_gender,
      "outfit_description": outfit_description,
    };


    const userURL = `${process.env.REACT_APP_OUTFIT_SERVICE_API_HOST}/api/user/outfit`;

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(newOutfit),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(userURL, fetchConfig)
      .then((response) => response.json())
      .then(() => {
        setOutfitName("");
        setOutfitBrand("");
        setTop("");
        setBottom("");
        setShoes("");
        setOutfitCategory("");
        setOutfitGender("");
        setOutfitDescription("");
      })
      .catch((e) => console.error("error: ", e));
  };

  const handleOutfitNameChange = (event) => {
    const value = event.target.value;
    setOutfitName(value);
  };

  const handleOutfitBrandChange = (event) => {
    const value = event.target.value;
    setOutfitBrand(value);
  };

  const handleTopChange = (event) => {
    const value = event.target.value;
    setTop(value);
  };

  const handleBottomChange = (event) => {
    const value = event.target.value;
    setBottom(value);

  };

  const handleShoesChange = (event) => {
    const value = event.target.value;
    setShoes(value);
  };

  const handleOutfitCategoryChange = (event) => {
    const value = event.target.value;
    setOutfitCategory(value);
  };

  const handleOutfitGenderChange = (event) => {
    const value = event.target.value;
    setOutfitGender(value);
  };

  const handleOutfitDescriptionChange = (event) => {
    const value = event.target.value;
    setOutfitDescription(value);
  };


  return (
    <div className="row">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1>Create an Outfit!</h1>
          <form onSubmit={handleSubmit} id="create-outfit-form">
            <div className="form-floating mb-3">
              <input
                value={outfit_name}
                onChange={handleOutfitNameChange}
                required
                type="text"
                name="outfit_name"
                id="outfit_name"
                className="form-control"
              />
              <label>Outfit Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={outfit_brand}
                onChange={handleOutfitBrandChange}
                required
                type="text"
                name="outfit_brand"
                id="outfit_brand"
                className="form-control"
              />
              <label>Outfit Brand</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={top}
                onChange={handleTopChange}
                required
                type="url"
                name="top"
                id="top"
                className="form-control"
              />
              <label>Top</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={bottom}
                onChange={handleBottomChange}
                required
                type="url"
                name="bottom"
                id="bottom"
                className="form-control"
              />
              <label>Bottom</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={shoes}
                onChange={handleShoesChange}
                required
                type="url"
                name="shoes"
                id="shoes"
                className="form-control"
              />
              <label>Shoes</label>
            </div>
              <div className="form-floating mb-3">
              <input
                value={outfit_category}
                onChange={handleOutfitCategoryChange}
                type="text"
                name="outfit_category"
                id="outfit_category"
                className="form-control"
              />
              <label>Outfit Category</label>
            </div>
            <div className="form-floating mb-3">
              <input
                value={outfit_gender}
                onChange={handleOutfitGenderChange}
                type="text"
                name="outfit_gender"
                id="outfit_gender"
                className="form-control"
              />
              <label>Outfit Gender</label>
            </div>
              <div className="form-floating mb-3">
              <input
                value={outfit_description}
                onChange={handleOutfitDescriptionChange}
                type="text"
                name="outfit_description"
                id="outfit_description"
                className="form-control"
              />
              <label>Outfit Description</label>
            </div>
            <button className="btn btn-primary">Create</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateOutfitForm;
