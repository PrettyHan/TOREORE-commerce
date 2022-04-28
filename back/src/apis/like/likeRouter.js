import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { likeService } from "./likeService";

const likeRouter = Router();
likeRouter.use(loginRequired);

/* 
  **POST /liked [좋아요 / 좋아요 취소]**
  - user_id는 login_required에서 받아올 수 있으니, 상품에 대한 id가 필요함
  - 제품 좋아요를 누를 시 해당 유저의 bookmark 리스트에 제품 객체가 저장된다.
  - 이미 bookmark 리스트에 해당 제품 객체가 있다면 좋아요를 누르면 취소가 된다.
  - 좋아요 수는 저장하지 않음.
*/
likeRouter.post("/", loginRequired, async function (req, res, next) {
  try {
    const currentUserId = req.currentUserId;
    const proudctlikeId = req.body.productId;

    const updatedlike = await likeService.setLike({
      currentUserId,
      proudctlikeId,
    });
    res.status(200).json(updatedlike);
  } catch (error) {
    next(error);
  }
});

/* 
**GET /liked [좋아요한 모든 상품 리스트 조회]**

- 즐겨찾기에서 좋아요한 모든 상품 리스트 조회하기
*/
likeRouter.get("/", loginRequired, async function (req, res, next) {
    try {
        const currentUserId = req.currentUserId;
        const likeproducts = await likeService.getlikeProducts({
          currentUserId,
        });
        
        if (likeproducts.errorMessage) {
            throw new Error(likeproducts.errorMessage);
        }

        res.status(200).json(likeproducts);
    } catch (error) {
        next(error);
    }
});

/* 
  **DEL /liked/:product_id [좋아요 리스트에서 특정 상품 삭제]**

  - 즐겨찾기에서 좋아요한 특정 상품 삭제하기
*/

likeRouter.delete("/:product_id", loginRequired, async function (req, res, next) {
  try {
      const currentUserId = req.currentUserId;
      const productDelId = req.params.product_id

      const dellikeProducts = await likeService.getdellikeProducts({
        currentUserId,
        productDelId
      });

      if (dellikeProducts.errorMessage) {
          throw new Error(dellikeProducts.errorMessage);
      }

      res.status(200).json(dellikeProducts);
  } catch (error) {
      next(error);
  }
});



export { likeRouter };
