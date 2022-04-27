import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { orderSerivce } from "./orderSerivce";
const productRouter = Router();
// register

productRouter.use(loginRequired);

productRouter.get("/", async function (req, res, next) {
  try {
    const orders = await orderSerivce.getOrders({});

    if (orders.errorMessage) {
      throw new Error(orders.errorMessage);
    }

    res.status(200).send(orders);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:orderId", async function (req, res, next) {
    try {
      const orderId = req.params.orderId
      const order = await orderSerivce.getOrder({orderId});
  
      if (order.errorMessage) {
        throw new Error(order.errorMessage);
      }
  
      res.status(200).send(order);
    } catch (error) {
      next(error);
    }
  });
  
  productRouter.get("/?ispayed=TrueOrFalse", async function (req, res, next) {
    try {
      const ispayed = req.query
      const order = await orderSerivce.getIspayedByQuery(ispayed);
  
      if (order.errorMessage) {
        throw new Error(order.errorMessage);
      }
  
      res.status(200).send(order);
    } catch (error) {
      next(error);
    }
  });



export { orderRouter }