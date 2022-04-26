import { userRouter } from "./user/userRouter";
import { productRouter } from "./product/productRouter";
import { orderRouter } from "./order/orderRouter"
const indexRouter = (app) => {
    app.use("/auth", userRouter);
    app.use("/products", productRouter)
    app.use("/orders", productRouter)
};

export { indexRouter };
