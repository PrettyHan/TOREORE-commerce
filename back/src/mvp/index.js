import { userRouter } from "./user/userRouter";
import { searchRouter } from "./search/searchRouter"


const indexRouter = (app) => {
    app.use("/auth", userRouter);
    app.use("/search", searchRouter)
};

export { indexRouter };
