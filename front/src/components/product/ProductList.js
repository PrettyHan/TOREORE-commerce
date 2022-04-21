import { Box } from "@mui/material";
import React from "react";
import { ProductStateContext } from "../Main";

import ProductItem from "./ProductItem";

const ProductList = () => {
    const productList = React.useContext(ProductStateContext);

    return (
        <Box
            sx={{
                display: "flex",
                flexWrap: "wrap",
                p: 1,
                m: 1,
                bgcolor: "background.paper",
                justifyContent: "flex-start",
                border: "solid",
            }}
        >
            {productList.map((item) => (
                <ProductItem key={item.productId} {...item} />
            ))}
        </Box>
    );
};

export default ProductList;
