import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { orderSerivce } from "./orderSerivce";
import { userService } from "../user/userService";

const orderRouter = Router();
// register

orderRouter.use(loginRequired);

orderRouter.post("/orders", async (req, res, next) => {
  try {
      if (is.emptyObject(req.body)) {
          throw new Error(
              "headers의 Content-Type을 application/json으로 설정해주세요",
          );
      }
      const userId = req.currentUserId
      const products = await userService.getUserCarts({
        userId,
    });

    if (products.errorMessage) {
        throw new Error(products.errorMessage);
    }
      const ArrayProducts = products // 가공 할 것, or req.user로 접근가능한지 확인
      const totalPrice = 5000000 // total price 가공 필요
      const isPayed = false

      const { orderName, zipcode, message, paymentMethod } = req.body; // 입력받을 것

      const orderData = {
        products,
        userId,
        totalPrice,
        isPayed,
        orderName,
        zipcode,
        message,
        paymentMethod,
        isPayed,
      };

      const newOrder = await orderSerivce.createOrder(orderData);

      if (newOrder.errorMessage) {
          throw new Error(newOrder.errorMessage);
      }

      res.status(201).json(newOrder);
  } catch (error) {
      next(error);
  }
});



orderRouter.get("/", async function (req, res, next) {
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

orderRouter.get("/:orderId", async function (req, res, next) {
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
  
  orderRouter.get("/?ispayed=TrueOrFalse", async function (req, res, next) {
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

  orderRouter.put("/orderId", async (req, res, next) => {
    try {
        const orderId = req.params.orderId

        const products = req.body.products ?? null;
        const totalPrice = req.body.totalPrice ?? null;
        const orderName = req.body.orderName ?? null;
        const zipcode = req.body.zipcode ?? null;
        const message = req.body.message ?? null;
        const paymentMethod = req.body.paymentMethod ?? null;

        const toUpdate = {
          products,
          totalPrice,
          orderName,
          zipcode,
          message,
          paymentMethod,
        };
        const updatedOrder = await orderSerivce.updateOrder({
          orderId,
            toUpdate,
        });

        if (updatedOrder.errorMessage) {
            throw new Error(updatedOrder.errorMessage);
        }

        res.status(200).json(updatedOrder);
    } catch (error) {
        next(error);
    }
});

orderRouter.delete("/orderId", async (req, res, next) => {
  try {
      const orderId = req.params.orderId;

      const deletedOrder = await orderSerivce.deleteOrder({ orderId });

      if (deletedOrder.errorMessage) {
          throw new Error(deletedOrder.errorMessage);
      }

      res.status(200).json(deletedOrder);
  } catch (err) {
      next(err);
  }
});


export { orderRouter }