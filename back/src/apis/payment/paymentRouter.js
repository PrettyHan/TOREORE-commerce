import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { ready, approve } from "./paymentService"
const paymentRouter = Router()
// paymentRouter.use(loginRequired);

paymentRouter.post('/ready', ready)
paymentRouter.post('/approve', approve)






export { paymentRouter };