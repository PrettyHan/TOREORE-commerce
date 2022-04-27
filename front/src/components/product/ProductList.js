import React, { useEffect, useReducer } from "react";

import ProductItem from "./ProductItem";

import "../../style/productList.css";
import * as Api from "../../api";

export const ProductStateContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.data;
        default:
            return state;
    }
};

const ProductList = () => {
    const [productList, dispatch] = useReducer(reducer, []);

    const getData = async () => {
        Api.get("products").then((res) => {
            dispatch({ type: "INIT", data: res.data });
        });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ProductStateContext.Provider value={productList}>
            <div className="productList-container">
                {productList.map((item) => (
                    <ProductItem key={item.productId} {...item} />
                ))}
            </div>
        </ProductStateContext.Provider>
    );
};

export default ProductList;
