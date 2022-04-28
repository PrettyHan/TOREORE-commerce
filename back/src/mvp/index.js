import { userRouter } from "./user/userRouter";
import { productRouter } from "./product/productRouter";
import { likeRouter } from "./like/likeRouter"

const indexRouter = (app) => {
    app.use("/auth", userRouter);
    app.use("/products", productRouter)
    app.use("/likes", likeRouter)
};

export { indexRouter };
