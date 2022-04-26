import { userRouter } from "./user/userRouter";
import { productRouter } from "./product/productRouter";
import { orderRouter } from "./order/orderRouter";
import { cartRouter } from "./cart/cartRouter";

const indexRouter = (app) => {
    app.use("/auth", userRouter);
    app.use("/products", productRouter);
    app.use("/orders", orderRouter);
    app.use("/carts", cartRouter);
};

export { indexRouter };
