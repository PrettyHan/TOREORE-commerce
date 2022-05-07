import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styled from "styled-components";
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
    // '좋아요' 누른 제품 배열
    const [likeIds, setLikeIds] = useState(userLikeArr);

    const isLike = React.useMemo(() => {
        return likeIds.includes(productId);
    }, [likeIds, productId]);

    const navigate = useNavigate();

    // 좋아요 클릭
    const handleLikeClick = async (e) => {
        e.stopPropagation();
        const res = await Api.post("liked", { productId: productId });
        const ids = res.data.bookmark.map((item) => item.productId);
        setLikeIds(ids);
    };

    // 아이템 클릭 => 제품 상세 페이지로 이동
    const handleItemClick = React.useCallback(() => {
        navigate(`/products/${category}/${productId}`);
    }, [navigate, category, productId]);

    return (
        <Wrapper onClick={handleItemClick}>
            <ImgWrapper>
                <Img src={image} alt={"상품 이미지"} />
                <Like onClick={handleLikeClick}>
                    {isLike ? (
                        <FavoriteIcon style={{ fontSize: 40, color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon
                            style={{ fontSize: 40, color: "ivory" }}
                        />
                    )}
                </Like>
            </ImgWrapper>
            <Ul>
                <Name>{name}</Name>
                <Price>{formatPrice(price)}</Price>
            </Ul>
        </Wrapper>
    );
};

export default ProductItem;

const Wrapper = styled.div`
    min-width: 200px;
    height: fit-content;
    margin: 0px auto;
    box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
    position: relative;
    border: solid rgba(149, 157, 165, 0.3);
`;

const ImgWrapper = styled.div`
    position: relative;
`;

const Img = styled.img`
    width: 100%;
    height: 450px;
`;

const Like = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 15px;
    right: 15px;
    font-size: 2rem;
`;

const Ul = styled.ul`
    list-style: none;
    margin: 20px 20px;
    padding: 0px;
`;

const Name = styled.li`
    font-size: larger;
    font-weight: bold;
    padding-bottom: 10px;
`;

const Price = styled.li`
    font-size: larger;
    color: gray;
`;
