import React, {useEffect} from "react";
import { BsFillMouse2Fill } from "react-icons/bs";
import "./Home.css";
import ProductCard from "./ProductCard";
import MetaData from "../layout/MetaData";
import {useSelector,useDispatch} from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loading from "../layout/Loading";
import { useAlert } from "react-alert";



const HomePage = () => {

    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct());
    }, [dispatch, error, alert]);



    return (
        <div>
            {loading ? (<Loading />) :
                (<>
                    {/* IMPORTING METANAME */}
                    <MetaData />

                    <div className="banner">
                        <p>Welcome to Ecommerce</p>
                        <h1>FIND AMAZING DRESSES BELOW</h1>

                        {/* so that on click it goes to id name 'container' */}
                        <a href="#container">
                            <button>
                                Scroll <BsFillMouse2Fill />
                            </button>
                        </a>
                    </div>

                    <h2 className="homeHeading">Featured Products</h2>

                    <div className="container" id="container">
                        {products &&
                            products.map((wholeProducts) => (
                                <ProductCard
                                    key={wholeProducts._id}
                                    productprop={wholeProducts}
                                />
                            ))}
                    </div>
                </>)}
        </div>
    )
}

export default HomePage
