import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const ProductItem = ({ groupId, productId, imgUrl, description }) => {
    return (
        <Card sx={{ maxWidth: 300, margin: 5 }}>
            <CardMedia
                component="img"
                height="300"
                image={imgUrl}
                alt="product item"
            />
            <CardContent>
                <Typography variant="body1" color="text.first">
                    <div>
                        그룹 id : {groupId} / 제품 id : {productId}
                    </div>
                    <div>설명 : {description}</div>
                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small">👜 장바구니</Button>
                <Button size="small">💰 바로 구매</Button>
                <Button size="small">💗 찜</Button>
            </CardActions>
        </Card>
    );
};

export default ProductItem;
