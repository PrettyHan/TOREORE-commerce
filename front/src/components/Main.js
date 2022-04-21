import React, { useEffect, useReducer } from "react";

import Category from "./product/Category";
import ProductList from "./product/ProductList";

export const ProductStateContext = React.createContext();

const reducer = (state, action) => {
    switch (action.type) {
        case "INIT":
            return action.data;
        default:
            return state;
    }
};

const Main = () => {
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
            <div>
                <Category />
                <ProductList />
            </div>
        </ProductStateContext.Provider>
    );
};

export default Main;
