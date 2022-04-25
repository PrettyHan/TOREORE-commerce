import { userRouter } from "./user/userRouter";
import { productRouter } from "./product/productRouter";
const indexRouter = (app) => {
    app.use("/auth", userRouter);
    app.use("/products", productRouter)
};

export { indexRouter };
