import React, { useEffect, useReducer } from "react";
import { useParams } from "react-router-dom";

import ProductItem from "./ProductItem";

import "../../style/productList.css";
import * as Api from "../../api";

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.data;
        default:
            return state;
    }
};

const ProductList = () => {
    const { category } = useParams();

    const [productList, dispatch] = useReducer(reducer, []);

    const getData = async () => {
        const res = await Api.get(`products?cid=${category}`);
        dispatch({ type: "INIT", data: res.data });
    };

    useEffect(() => {
        getData();
    }, [category]);

    return (
        <div className="productList-container">
            {productList.map((item) => (
                <ProductItem key={item.productId} {...item} />
            ))}
        </div>
    );
};

export default ProductList;
