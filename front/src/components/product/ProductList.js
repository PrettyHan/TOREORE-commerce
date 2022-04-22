import { Container } from "@mui/material";
import React from "react";
import { ProductStateContext } from "../Main";

import ProductItem from "./ProductItem";

const ProductList = () => {
    const productList = React.useContext(ProductStateContext);

    return (
        <Container
            style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-start",
            }}
        >
            {productList.map((item) => (
                <ProductItem key={item.productId} {...item} />
            ))}
        </Container>
    );
};

export default ProductList;
