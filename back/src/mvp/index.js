import { userRouter } from "./user/userRouter";


/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 유저 추가 수정 삭제 조회
 */

const indexRouter = (app) => {
    app.use("/auth", userRouter);
};

export { indexRouter };
