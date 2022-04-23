import React from "react";
import { ProductStateContext } from "../Main";

import ProductItem from "./ProductItem";

import "../../style/productList.css";

const ProductList = () => {
    const productList = React.useContext(ProductStateContext);

    return (
        <div className="productList-container">
            {productList.map((item) => (
                <ProductItem key={item.productId} {...item} />
            ))}
        </div>
    );
};

export default ProductList;
