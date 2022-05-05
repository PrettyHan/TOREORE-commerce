import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { cartService } from "./cartService";

const cartRouter = Router();
cartRouter.use(loginRequired);

cartRouter.get("/", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const carts = await cartService.getCartList({ userId });

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

cartRouter.post("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;

        const newCarts = await cartService.AddProductToCart({
            userId,
            productId,
            quantity,
        });

        if (newCarts.errorMessage) {
            throw new Error(newCarts.errorMessage);
        }

        res.status(200).json(newCarts);
    } catch (error) {
        next(error);
    }
});

// checked 
cartRouter.put("/:productId", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const productId = req.params.productId;
        const quantity = req.body.quantity;
        const checked = req.body.checked;

        const newCarts = await cartService.updateCartList({
            userId,
            productId,
            quantity,
            checked
        });

        res.status(200).json(newCarts);
    } catch (error) {
        next(error);
    }
});

cartRouter.delete("/select", async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const productIdArr = req.body.productIdArr;

        const carts = await cartService.deleteProductOfCart({ userId, productIdArr });

        res.status(200).json(carts);
    } catch (error) {
        next(error);
    }
});

cartRouter.delete("/", async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const deletedCart = await cartService.deleteAllProductsOfCart({ userId });

        res.status(200).json(deletedCart);
    } catch (error) {
        next(error);
    }
});

export { cartRouter };
