import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../style/productItem.css";
import * as Api from "../../api";

const ProductItem = ({ category, productId, name, image, price }) => {
    const navigate = useNavigate();

    const handleItemClick = React.useCallback(() => {
        navigate(`/products/${category}/${productId}`);
    }, [navigate, category, productId]);

    const formatPrice = (price) => {
        return `￦ ${parseInt(price).toLocaleString()}`;
    };

    // 임시 data
    const userLikeArr = ["1", "2", "0694860002"];

    const [likeArr, setLikeArr] = useState(userLikeArr);
    const [isLike, setIsLike] = useState(likeArr.includes(productId));

    const updateUserLike = async () => {
        const res = await Api.post("liked", { productId: productId });
        setLikeArr(res.data.likeArr);
    };

    useEffect(() => {
        setIsLike(likeArr.includes(productId));
    }, [likeArr]);

    return (
        <div className="item-container">
            <div onClick={handleItemClick}>
                <img src={image} alt={"상품 이미지"} className="item-img"></img>
                <ul className="item">
                    <li className="item-name">{name}</li>
                    <li className="item-price">{formatPrice(price)}</li>
                </ul>
            </div>
            <div className="item-btn-group">
                <Button size="small" variant="outlined" sx={{ ml: 1, mr: 1 }}>
                    👜 장바구니
                </Button>
                <Button size="small" variant="outlined" sx={{ ml: 1, mr: 1 }}>
                    💰 바로 구매
                </Button>
                <Button
                    size="small"
                    variant="outlined"
                    sx={{ ml: 1, mr: 1 }}
                    onClick={updateUserLike}
                >
                    {isLike ? "💗" : "🤍"} 찜
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
