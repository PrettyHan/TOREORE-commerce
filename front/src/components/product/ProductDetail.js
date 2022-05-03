import Button from "@mui/material/Button";
import React, { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import "../../style/productDetail.css";
import * as Api from "../../api";
import { getProductIdArr } from "./ProductList"; // 배열 요소: 제품 정보(객체) => 제품 ID(스트링)
import { formatPrice } from "./ProductItem";
import { UserStateContext } from "../../App";

const ProductDetail = () => {
    const { user } = useContext(UserStateContext);
    const userLikeArr = getProductIdArr(user?.bookmark || []);

    const navigate = useNavigate();
    const { category, productId } = useParams();

    const [cnt, setCnt] = useState(1);
    const [product, setProduct] = useState({});

    // '좋아요' 누른 제품 배열
    const [likeIds, setLikeIds] = useState(userLikeArr);

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
        Api.get("products", { cid: category, pid: productId }, true).then(
            (res) => {
                setProduct(res.data[0]);
            }
        );
    }, []);

    return (
        <section className="item-detail-container">
            <div className="container-flexbox">
                <div className="item product-name">{product.name}</div>
                <div className="item product-img">
                    <img
                        src={product.image}
                        alt={"상품 이미지"}
                        className="item-img"
                    />
                    <div className="like-btn" onClick={handleLikeClick}>
                        {isLike ? (
                            <FavoriteIcon
                                style={{ fontSize: 40, color: "red" }}
                            />
                        ) : (
                            <FavoriteBorderIcon style={{ fontSize: 40 }} />
                        )}
                    </div>
                </div>
                <div className="item product-content">
                    <div className="content-flexbox">
                        <div className="product-desc">
                            {product.description}
                        </div>
                        <div className="product-price">
                            <table>
                                <tr>
                                    <th>Price</th>
                                    <td>
                                        <Button onClick={handleCntClick}>
                                            -
                                        </Button>
                                        <input
                                            value={cnt}
                                            className="product-cnt"
                                        />
                                        <Button onClick={handleCntClick}>
                                            +
                                        </Button>
                                    </td>
                                    <td>{formatPrice(product.price)}</td>
                                </tr>
                                <tr>
                                    <th>Total Price</th>
                                    <td></td>
                                    <td>{formatPrice(product.price * cnt)}</td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="item-btn-group">
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
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
