import { Router } from "express";

const productRouter = Router();

// 모든 상품 정보 리스트 조회
productRouter.get("/list", (req, res) => {
    // productList : 상품 리스트 조회
    // getProductList
});

// 개별 상품 정보 조회
productRouter.get("/:product_id", (req, res) => {
    const productId = req.params.productId;

    // proudctInfo : productId를 기준으로 상품 정보 DB 조회
    // getProduct
});

export { productRouter };
