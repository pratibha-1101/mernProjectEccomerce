import React, { Fragment, useEffect, useState } from "react";
import "./productfilter.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import ProductCard from "../Home/ProductCard";
import Loading from "../layout/Loading";
import { useParams } from "react-router-dom";
import { useAlert } from "react-alert";
import Pagination from "react-js-pagination";
import Slider from "@mui/material/Slider";
import Typography from '@mui/material/Typography';
import MetaData from "../layout/MetaData";


//-------------------------------------------------------------------------------------------------------
// this page is to filterize the products
// Here, "fetchng all products", do "pagination" , in what "categories does product(title) fall" , "price" and their "ratings"
// ----------------------------------------------------------------------------------------------------------------------//

const categories = [
    "Women wear",
    "Men wear",
    "Kids wear",
    "Traditional Dresses",
    "Western Dresses",
    "Sleep wear",
    "Casual Dresses",
];


const ProductFilter = () => {
    const { keyword } = useParams();

    const dispatch = useDispatch();
    const alert = useAlert();

    const [price, setPrice] = useState([0, 25000]);
    const priceHandler = (event, newPrice) => {
        setPrice(newPrice);
    };
    const [currentPage, setCurrentPage] = useState(1);
    const setCurrentPageNo = (e) => {
        setCurrentPage(e);
    }
    const [category, setCategory] = useState("");
    const [ratings, setRatings] = useState(0);



    //using useselector here,
    const { products,
        loading,
        error,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    } = useSelector(
        (state) => state.products         //taking from productreducer where all products are fetching with whole details
    );


    let count = filteredProductsCount;


    //using effect here to get the filtered products
    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct(keyword, currentPage, price, category, ratings));

    }, [dispatch, keyword, currentPage, price, error, category, ratings, alert]);


    return (
        <div>
            {loading ? (<Loading />) : (

                <Fragment>


                    <div className="productfilter">


                        <MetaData title="PrRODUCTS ---ECCOMERCE" />
                        {/* showing products */}
                        <div className="productsArea">

                            <h2 className="productsHeading">Products</h2>
                            <div className="products">
                                {products &&
                                    products.map((product) => (
                                        <ProductCard key={product._id} productprop={product} />
                                    ))}
                            </div>
                        </div>
                    </div>


                    {/* filtering effects */}
                    <div className="filterBox">

                        {/* price filter */}
                        <Typography>Price</Typography>
                        <Slider
                            value={price}
                            onChange={priceHandler}
                            valueLabelDisplay="auto"                //auto works like hover effectt
                            aria-labelledby="range-slider"
                            min={0}
                            max={25000}
                        />




                        {/* Categories filter */}
                        <Typography>Categories</Typography>
                        <ul className="categoryBox">
                            {categories.map((category) => (
                                <li
                                    className="category-link"
                                    key={category}
                                    onClick={() => setCategory(category)}
                                >
                                    {category}
                                </li>
                            ))}
                        </ul>



                        {/* Categories filter */}
                        <div className="ratingSection">
                            <fieldset>
                                <Typography component="legend">Ratings Above</Typography>
                                <Slider
                                    value={ratings}
                                    onChange={(e, newRating) => {
                                        setRatings(newRating);
                                    }}
                                    aria-labelledby="continuous-slider"
                                    valueLabelDisplay="auto"
                                    min={0}
                                    max={5}
                                />
                            </fieldset>
                        </div>

                    </div>


                    {/* thid div is for pagination */}
                    {resultPerPage < count && (             //Because "resultPage<no.of products" so, pagination not showing

                        <div className="paginationBox">
                            <Pagination
                                activePage={currentPage}
                                itemsCountPerPage={resultPerPage}
                                totalItemsCount={productsCount}
                                onChange={setCurrentPageNo}
                                nextPageText="Next"
                                prevPageText="Prev"
                                firstPageText="1st"
                                lastPageText="Last"
                                itemClass="page-item"
                                linkClass="page-link"
                                activeClass="pageItemActive"
                                activeLinkClass="pageLinkActive"
                            />
                        </div>
                    )}


                </Fragment>)
            }

        </div >
    )
}

export default ProductFilter
