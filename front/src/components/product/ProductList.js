import React, { useEffect, useReducer } from "react";

import ProductItem from "./ProductItem";

import "../../style/productList.css";

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
    const [fake_data, dispatch] = useReducer(reducer, []);

    const getData = async () => {
        const res = await fetch(
            "https://jsonplaceholder.typicode.com/photos"
        ).then((res) => res.json());

        const initData = res.slice(0, 26).map((item) => {
            return {
                groupId: item.albumId,
                productId: item.id,
                imgUrl: item.thumbnailUrl,
                description: item.title,
            };
        });

        dispatch({ type: "INIT", data: initData });
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <ProductStateContext.Provider value={fake_data}>
            <div className="productList-container">
                {fake_data.map((item) => (
                    <ProductItem key={item.productId} {...item} />
                ))}
            </div>
        </ProductStateContext.Provider>
    );
};

export default ProductList;
