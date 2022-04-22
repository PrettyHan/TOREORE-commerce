import Button from "@mui/material/Button";

const ProductItem = ({ groupId, productId, imgUrl, description }) => {
    return (
        <div style={{ width: 350, margin: 5 }}>
            <img src={imgUrl} style={{ width: "100%", height: 450 }}></img>
            <ul>
                <li>그룹 id : {groupId}</li>
                <li>제품 id : {productId}</li>
                <li>설명 : {description}</li>
            </ul>
            <div style={{ margin: 10 }}>
                <Button size="small" variant="outlined">
                    👜 장바구니
                </Button>
                <Button size="small" variant="outlined">
                    💰 바로 구매
                </Button>
                <Button size="small" variant="outlined">
                    💗 찜
                </Button>
            </div>
        </div>
    );
};

export default ProductItem;
