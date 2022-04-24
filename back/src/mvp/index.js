import { userRouter } from "./user/userRouter";
import { productRouter } from "./product/productRouter";
const indexRouter = (app) => {
    /**
     * @swagger
     * tags:
     *   name: User
     *   description: 유저 Auth 관련 API
     */
    app.use("/auth", userRouter);
    app.use("/products", productRouter);
};

export { indexRouter };
