import Button from "@mui/material/Button";
import { useState } from "react";

import "../../style/productDetail.css";

const ProductDetail = () => {
    const [cnt, setCnt] = useState(1);

    const handleClick = (e) => {
        if (e.target.innerText === "+") {
            setCnt(cnt + 1);
        } else {
            if (cnt > 0) {
                setCnt(cnt - 1);
            }
        }
    };

    // 임시 data
    const product = {
        name: "어깨 꼬임 포인트 니트",
        price: 50000,
        desc: "광택감 있는 소재의 짧은 원피스. 깊게 파인 앞뒷면 V넥 디자인. 목 뒷면을 가로질러 끈을 묶는 스타일. 풍성하고 와이드한 7부 소매. 가는 신축성 소맷단. 가슴 아래와 허리 뒷면에 주름이 잡힌 솔기가 있음. 안감 생략.",
        url: "https://cdn.pixabay.com/photo/2016/08/26/20/44/elan-1623088_960_720.jpg",
    };

    return (
        <section className="item-detail-container">
            <div className="container-flexbox">
                <div className="item product-name">{product.name}</div>
                <div className="item product-img">
                    <img src={product.url} alt="상품 대표 이미지" />
                </div>
                <div className="item product-content">
                    <div className="content-flexbox">
                        <div className="product-desc">{product.desc}</div>
                        <div className="product-price">
                            <table>
                                <tr>
                                    <th>Price</th>
                                    <td>
                                        <Button onClick={handleClick}>-</Button>
                                        <input
                                            value={cnt}
                                            className="product-cnt"
                                        />
                                        <Button onClick={handleClick}>+</Button>
                                    </td>
                                    <td>{product.price.toLocaleString()}</td>
                                </tr>
                                <tr>
                                    <th>Total Price</th>
                                    <td></td>
                                    <td>
                                        {(product.price * cnt).toLocaleString()}
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>

                    <div className="item-btn-group">
                        <Button
                            size="large"
                            variant="outlined"
                            sx={{ ml: 1, mr: 1 }}
                        >
                            👜 장바구니
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            sx={{ ml: 1, mr: 1 }}
                        >
                            💰 바로 구매
                        </Button>
                        <Button
                            size="large"
                            variant="outlined"
                            sx={{ ml: 1, mr: 1 }}
                        >
                            💗 찜
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductDetail;
