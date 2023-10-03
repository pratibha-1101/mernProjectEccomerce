import React, { Fragment, useEffect, useState } from "react";
import "./newProduct.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useAlert } from "react-alert";
import { Button } from '@mui/material';
import MetaData from "../layout/MetaData";

import AccountTreeSharpIcon from '@mui/icons-material/AccountTreeSharp';
import DescriptionSharpIcon from '@mui/icons-material/DescriptionSharp';
import SdStorageSharpIcon from '@mui/icons-material/SdStorageSharp';
import SpellcheckSharpIcon from '@mui/icons-material/SpellcheckSharp';
import AttachMoneySharpIcon from '@mui/icons-material/AttachMoneySharp';
import SideBar from "./Sidebar";
import { NEW_PRODUCT_RESET } from "../../constants/productConstants";
import { useNavigate } from "react-router-dom";

/* -----------------------------------------------------
               CREATING NEW PRODUCT
----------------------------------------------------- */

const NewProduct = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();


  // PRODUCT'S WHOLE DETAILS GETTING FROM "NEWPRODUCT REDUCER"  VIA "USESELECTOR HOOK"
  const { loading, error, success } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [Stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  // -------------------------------------------------------

  // THE TYPE OF PRODUCTS WE ARE SELLING
  const categories = [
    "Women Wear",
    "Men Wear",
    "Kids Wear",
    "Sleep wear",
    "saaries & suits",
    "Family set",
    "bottoms",
  ];

  // ------------------------------------------

  // USING "USESTATE HOOK EFFECT" FOR DISPACHING "CLEAR ERRORS" AND WHEN SUCCESS NAVIGATE TO THE "DASHBOARD"
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Product Created Successfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, alert, error, navigate, success]);

  // ----------------------------------------------------

  //SETTING THE FORM FOR CREATING NEW PRODUCT
  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("Stock", Stock);
    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const files = Array.from(e.target.files);

    setImages([]);
    setImagesPreview([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  // ---------------------------------------------------

  return (
    <Fragment>
      <MetaData title="Create Product" />
      <div className="dashboard">
        <SideBar />
        <div className="newProductContainer">
          <form
            className="createProductForm"
            encType="multipart/form-data"
            onSubmit={createProductSubmitHandler}
          >
            <h1>Create Product</h1>

            {/* THIS IS FOR GIVING NAME OF THE PRODUCT*/}
            <div>
              <SpellcheckSharpIcon />
              <input
                type="text"
                placeholder="Product Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            {/* THIS IS FOR GIVING PRICE OF THE PRODUCT*/}
            <div>
              <AttachMoneySharpIcon />
              <input
                type="number"
                placeholder="Price"
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>

            {/* THIS IS FOR GIVING DISCRIPTION OF THE PRODUCT*/}
            <div>
              <DescriptionSharpIcon />
              <textarea
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                cols="30"
                rows="1"
              ></textarea>
            </div>

            {/* THIS IS FOR GIVING OPTIONS TO SELECT THE CATEGORIES OF THE PRODUCT*/}
            <div>
              <AccountTreeSharpIcon />
              <select onChange={(e) => setCategory(e.target.value)}>
                <option value="">Choose Category</option>
                {categories.map((cate) => (
                  <option key={cate} value={cate}>
                    {cate}
                  </option>
                ))}
              </select>
            </div>

            {/* THIS IS FOR MENTIONING THE STOCKS OF THE PRODUCT*/}
            <div>
              <SdStorageSharpIcon />
              <input
                type="number"
                placeholder="Stock"
                required
                onChange={(e) => setStock(e.target.value)}
              />
            </div>

            {/* THIS IS FOR GIVING THE IMAGE OF THE PRODUCT*/}
            <div id="createProductFormFile">
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={createProductImagesChange}
                multiple
              />
            </div>

            {/* THIS IS FOR WATCHING THE IMAGE WHICH WE ARE SELECTED ARE CORRECT? */}
            <div id="createProductFormImage">
              {imagesPreview.map((image, index) => (
                <img key={index} src={image} alt="Product Preview" />
              ))}
            </div>

            {/* BUTTON FOR "CREATING THE PRODUCT" WITH WHOLE DETAILS*/}
            <Button
              id="createProductBtn"
              type="submit"
              disabled={loading ? true : false}
            >
              Create
            </Button>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

export default NewProduct;
