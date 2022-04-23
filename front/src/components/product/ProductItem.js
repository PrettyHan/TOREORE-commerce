import Button from "@mui/material/Button";

import "../../style/productItem.css";

const ProductItem = ({ groupId, productId, imgUrl, description }) => {
    return (
        <div className="item-container">
            <img src={imgUrl} alt={"상품 이미지"} className="item-img"></img>
            <ul className="item">
                <li className="item-name">제품명_{productId} </li>
                <li className="item-desc">제품 설명_{description}</li>
            </ul>
            <div className="item-btn-group">
                <Button size="small" variant="outlined" sx={{ ml: 1, mr: 1 }}>
                    👜 장바구니
                </Button>
                <Button size="small" variant="outlined" sx={{ ml: 1, mr: 1 }}>
                    💰 바로 구매
                </Button>
                <Button size="small" variant="outlined" sx={{ ml: 1, mr: 1 }}>
                    💗 찜
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
