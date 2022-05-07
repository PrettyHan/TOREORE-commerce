import Button from "@mui/material/Button";
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import styled from "styled-components";
import * as Api from "../../api";
import { formatPrice } from "./ProductItem";

const ProductDetail = () => {
    const navigate = useNavigate();
    const { category, productId } = useParams();

    const [cnt, setCnt] = useState(1);
    const [product, setProduct] = useState({});

    // '좋아요' 누른 제품 배열
    const [likeIds, setLikeIds] = useState([]);

    const isLike = React.useMemo(() => {
        return likeIds.includes(productId);
    }, [likeIds, productId]);

    const handleCntClick = (e) => {
        if (e.target.innerText === "+") {
            setCnt(cnt + 1);
        } else {
            if (cnt > 1) {
                setCnt(cnt - 1);
            } else {
                alert("최소 수량은 1개입니다.");
            }
        }
    };

    // 장바구니 버튼 클릭
    const handleCartClick = async () => {
        try {
            await Api.post(`carts/${productId}`, { quantity: cnt });
            if (
                window.confirm(
                    "상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?"
                )
            ) {
                navigate("/cart");
            } else {
                return;
            }
        } catch (err) {
            alert(err.response.data);
        }
    };

    // 바로구매 버튼 클릭
    const handleOrderClick = () => {
        navigate(`/orders/${productId}`);
    };

    // 좋아요 버튼 클릭
    const handleLikeClick = async () => {
        const res = await Api.post("liked", { productId: productId });
        const ids = res.data.bookmark.map((item) => item.productId);
        setLikeIds(ids);
    };

    React.useEffect(() => {
        window.scrollTo(0, 0);
        async function getProductDetail() {
            const res = await Api.get(
                "products",
                { cid: category, pid: productId },
                true
            );
            setProduct(res.data[0]);
        }
        getProductDetail();

        async function getLikeArr() {
            const res = await Api.get("liked");
            const userLikeArr = res.data.map((item) => item.productId);
            setLikeIds(userLikeArr);
        }
        getLikeArr();
    }, []);

    return (
        <Wrapper>
            <Name>{product.name}</Name>
            <ImgWrapper>
                <Img src={product.image} alt={"상품 이미지"} />
                <Like onClick={handleLikeClick}>
                    {isLike ? (
                        <FavoriteIcon style={{ fontSize: 50, color: "red" }} />
                    ) : (
                        <FavoriteBorderIcon
                            style={{ fontSize: 50, color: "ivory" }}
                        />
                    )}
                </Like>
            </ImgWrapper>
            <Content>
                <Desc>{product.description}</Desc>
                <PriceTable>
                    <TableBody>
                        <PriceTableRow>
                            <RowTitle>Price</RowTitle>
                            <RowCounter>
                                <Button onClick={handleCntClick}>-</Button>
                                <Input value={cnt} />
                                <Button onClick={handleCntClick}>+</Button>
                            </RowCounter>
                            <RowPrice>{formatPrice(product.price)}</RowPrice>
                        </PriceTableRow>
                        <PriceTableRow>
                            <RowTitle>Total Price</RowTitle>
                            <RowCounter></RowCounter>
                            <RowPrice>
                                {formatPrice(product.price * cnt)}
                            </RowPrice>
                        </PriceTableRow>
                    </TableBody>
                </PriceTable>

                <ButtonGroup>
                    <Button
                        size="large"
                        variant="outlined"
                        sx={{ ml: 1, mr: 1 }}
                        onClick={handleCartClick}
                    >
                        👜 장바구니
                    </Button>
                    <Button
                        size="large"
                        variant="outlined"
                        sx={{ ml: 1, mr: 1 }}
                        onClick={handleOrderClick}
                    >
                        💰 바로 구매
                    </Button>
                </ButtonGroup>
            </Content>
        </Wrapper>
    );
};

export default ProductDetail;

const Wrapper = styled.div`
    max-width: 70%;
    margin: 30px auto 100px auto;
    display: flex;
    flex-wrap: wrap;
    gap: 2rem;
`;

const Name = styled.div`
    border-bottom: solid 1px gray;
    min-height: 50px;
    width: 100%;
    font-size: 2rem;
`;

const ImgWrapper = styled.div`
    min-height: 600px;
    width: 400px;
    position: relative;
    border: solid rgba(149, 157, 165, 0.3);
    box-shadow: rgba(149, 157, 165, 0.3) 0px 8px 24px;
`;

const Img = styled.img`
    width: 100%;
    height: 100%;
`;

const Like = styled.div`
    position: absolute;
    z-index: 1;
    bottom: 20px;
    right: 25px;
`;

const Content = styled.div`
    min-height: 400px;
    width: calc(100% - 450px);
    min-width: 550px;
    font-size: 1.2rem;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    position: relative;
`;

const Desc = styled.div`
    width: 100%;
    min-height: 120px;
`;

const PriceTable = styled(Table)`
    && {
        width: 70%;
        min-width: 550px;
    }
    border: solid 2px black;
`;

const PriceTableRow = styled(TableRow)`
    height: 70px;
`;

const RowTitle = styled(TableCell)`
    width: 30%;
    && {
        text-align: center;
        font-weight: bold;
    }
`;

const RowCounter = styled(TableCell)`
    && {
        min-height: 100px;
        text-align: center;
    }
`;

const RowPrice = styled(TableCell)`
    width: 30%;
    && {
        min-height: 100px;
        text-align: right;
        font-weight: bold;
    }
`;

const ButtonGroup = styled.div`
    position: absolute;
    bottom: 0px;
`;

const Input = styled.input`
    width: 40px;
    padding: 5px;
    text-align: center;
`;
