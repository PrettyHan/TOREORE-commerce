import is from "@sindresorhus/is";
import { Router } from "express";
import { productService } from "./productService";
import { loginRequired } from "../../middlewares/loginRequired";

const productRouter = Router();

productRouter.get("/personal-recomandation", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const recomandedProducts = await productService.getRecomandedProducts(userId);

        res.status(200).json(recomandedProducts);
    } catch (error) {
        next(error);
    }
});

productRouter.get("/", async function (req, res, next) {
    try {
        const { cid, pid } = req.query ?? null;
        if (cid || pid) {
            const product = await productService.getProductByQuery({ cid, pid });

            if (product.errorMessage) {
                throw new Error(product.errorMessage);
            }

            res.status(200).send(product);
        } else {
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

productRouter.get("/search", async function (req, res, next) {
    try {
        const { keyword } = req.query ?? null;
        if (keyword) {
            const product = await productService.getProductBySearch({ keyword });

            if (product.errorMessage) {
                throw new Error(product.errorMessage);
            }

            res.status(200).send(product);
        } else {
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
