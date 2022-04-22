import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { productService } from "./productService";
const productRouter = Router();
// register

productRouter.use(loginRequired);


// product 전체 조회
productRouter.get("/", async function (req, res, next) {
  try {
    const products = await productService.getProducts({});

    if (products.errorMessage) {
      throw new Error(products.errorMessage);
    }

    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
});

productRouter.get("/:productId", async function (req, res, next) {
    try {
      const productId = req.params.productId
      const product = await productService.getProduct({productId});
  
      if (product.errorMessage) {
        throw new Error(product.errorMessage);
      }
  
      res.status(200).send(product);
    } catch (error) {
      next(error);
    }
  });
  





export { productRouter }