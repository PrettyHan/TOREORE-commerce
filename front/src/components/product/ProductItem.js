import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "../../style/productItem.css";
import * as Api from "../../api";

// 가격 표시 형식
export const formatPrice = (price) => {
    return `￦ ${parseInt(price).toLocaleString()}`;
};

const ProductItem = ({
    category,
    productId,
    name,
    image,
    price,
    userLikeArr,
}) => {
    const navigate = useNavigate();

    // 아이템 클릭 => 제품 상세 페이지로 이동
    const handleItemClick = React.useCallback(() => {
        navigate(`/products/${category}/${productId}`);
    }, [navigate, category, productId]);

    // '좋아요' 누른 제품 배열
    const [likeIds, setLikeIds] = useState(userLikeArr);
    // 해당 제품에 대한 '좋아요' 여부
    // const [isLike, setIsLike] = useState(userLikeArr.includes(productId));

    const isLike = React.useMemo(() => {
        return likeIds.includes(productId);
    }, [likeIds, productId]);

    // 좋아요 클릭
    const handleLikeClick = async (e) => {
        e.stopPropagation();
        const res = await Api.post("liked", { productId: productId });
        const ids = res.data.bookmark.map((item) => item.productId);
        setLikeIds(ids);
    };

    /**
     * https://ko.reactjs.org/docs/hooks-reference.html
     */
    // useEffect(() => {
        // setIsLike(likeArr.includes(productId));
    // }, [likeArr, productId]);

    return (
        <div className="item-container" onClick={handleItemClick}>
            <div className="img">
                <img src={image} alt={"상품 이미지"} className="item-img" />
                <div className="like-btn" onClick={handleLikeClick}>
                    {isLike ? "💗" : "🤍"}
                </div>
            </div>
            <ul className="item">
                <li className="item-name">{name}</li>
                <li className="item-price">{formatPrice(price)}</li>
                <li className="item-color"></li>
            </ul>
        </div>
    );
};

export default ProductItem;
