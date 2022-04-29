import React, { useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";

import ProductItem from "./ProductItem";

import "../../style/productList.css";
import * as Api from "../../api";

import { UserStateContext } from "../../App";

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.data;
        default:
            return state;
    }
};

export const getProductIdArr = (arr) => {
    const newArr = arr.map((item) => item.productId);
    return newArr;
};

const ProductList = () => {
    const { user } = useContext(UserStateContext);

    const userLikeArr = getProductIdArr(user?.bookmark || []);

    const { category } = useParams();

    const [productList, dispatch] = useReducer(reducer, []);

    const getData = async () => {
        const res = await Api.get("products", { cid: category }, true);
        dispatch({ type: "INIT", data: res.data });
    };

    useEffect(() => {
        getData();
    }, [category]);

    return (
        <div className="productList-container">
            {productList.map((item) => (
                <ProductItem
                    key={item.productId}
                    {...item}
                    userLikeArr={userLikeArr}
                />
            ))}
        </div>
    );
};

export default ProductList;
