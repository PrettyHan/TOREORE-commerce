import React, { useEffect, useReducer, useContext } from "react";
import { useParams } from "react-router-dom";

import ProductItem from "./ProductItem";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
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
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                }}
            >
                <Grid
                    maxWidth="lg"
                    container
                    spacing={{ xs: 2, md: 3 }}
                    columns={{ xs: 4, sm: 8, md: 12 }}
                >
                    {productList.map((item, index) => (
                        <Grid item xs={12} sm={4} md={4} key={index}>
                            <ProductItem
                                key={item.productId}
                                {...item}
                                userLikeArr={userLikeArr}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

export default ProductList;
