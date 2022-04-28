import { User, Product } from "../../db";
import { v4 as uuidv4 } from "uuid";

class likeService {
    // 상품내역들에서 좋아요/ 좋아요 취소
    static async setLike({currentUserId, proudctlikeId}) {
      let currentUser = await User.findByLikeUserId({ currentUserId });
      let product = await Product.findByLikeProductId({ proudctlikeId });
      let bookmarks = currentUser.bookmark;

      if (!currentUser) {
          const errorMessage = "해당 유저가 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
      }

      if (!product) {
        const errorMessage = "해당 상품이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }

      let iscontain = false
      bookmarks.map((productObject) => {
        if(productObject.productId == product.productId){
          iscontain = true;
        }
      })

      let updatedUser = {};
      let updatedProduct = {};
      if(iscontain) {
        /* 유저의 bookmark에 해당 product가 있다면  */
        updatedUser = await User.updateLikeProductDel({ 
          userId : currentUser,
          Value : product,
        })
      //  좋아요 수
      //   let fieldToUpdate = "likeCount";
      //   let Value = product.likeCount - 1;
      //   if (Value < 0) {
      //     Value = 0;
      //   }

      //   updatedProduct = await Product.likeProductUpdate({ 
      //     productId : product, 
      //     fieldToUpdate, 
      //     newValue : Value,
      // })
      } else {
        console.log("포함 안됨. 포함 시켜줘")
        /* 유저의 bookmark에 해당 product가 없다면  */
        updatedUser = await User.updateLikeProductPush({ 
          userId : currentUser,
          Value : product,
        })
        //  좋아요 수
        // let fieldToUpdate = "likeCount";
        // let Value = product.likeCount + 1;
        // if (Value < 0) {
        //   Value = 0;
        // }

        // updatedProduct = await Product.likeProductUpdate({ 
        //   productId : product, 
        //   fieldToUpdate, 
        //   newValue : Value,
        // })
      }
      return {updatedUser, updatedProduct}
  }
    // 즐겨찾기 좋아요 상품 반환
    static async getlikeProducts({ currentUserId }) {
      let currentUser = await User.findByLikeUserId({ currentUserId });

      if (!currentUser) {
          const errorMessage = "해당 유저가 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
      }

      return currentUser.bookmark;

  }
    // 즐겨찾기 좋아요 상품 삭제
    static async getdellikeProducts({currentUserId, productDelId}) {
      console.log(currentUserId);
      console.log(productDelId);
      let currentUser = await User.findByLikeUserId({ currentUserId });
      let product = await Product.findByLikeProductId({ productDelId });
      console.log(product);
      if (!currentUser) {
          const errorMessage = "해당 유저가 없습니다. 다시 한 번 확인해 주세요.";
          return { errorMessage };
      }

      if (!product) {
        const errorMessage = "해당 상품이 없습니다. 다시 한 번 확인해 주세요.";
        return { errorMessage };
      }
      
      let updatedUser = {};
      let updatedProduct = {};

      updatedUser = await User.updateLikeProductDel({ 
        userId : currentUser,
        Value : product,
      })
      
      return {updatedUser, updatedProduct}
  }

}

export { likeService };
