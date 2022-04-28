import is from "@sindresorhus/is";
import { Router } from "express";
import { productService } from "./productService";

const productRouter = Router();

// product 전체 조회

productRouter.get("/", async function (req, res, next) {
    try {
        const {cid, pid} = req.query
        if (cid || pid) {
            const product = await productService.getProductByQuery({cid, pid});

            if (product.errorMessage) {
                throw new Error(product.errorMessage);
            }
    
            res.status(200).send(product);
        }
        else {
            const products = await productService.getProductList();
        
        if (products.errorMessage) {
            throw new Error(products.errorMessage);
        }
        res.status(200).send(products);
    }
    } catch (error) {
        next(error);
    }
});

// productId 조회
productRouter.get("/:productId", async function (req, res, next) {
    try {
        const productId = req.params.productId;
        const product = await productService.getProduct({ productId });

        if (product.errorMessage) {
            throw new Error(product.errorMessage);
        }

        res.status(200).json(product);
    } catch (error) {
        next(error);
    }
});

export { productRouter };
