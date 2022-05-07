import { User, Product } from "../../db";

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
        if(iscontain) {
          /* 유저의 bookmark에 해당 product가 있다면  */
          updatedUser = await User.updateLikeProductDel({ 
              userId : currentUser,
              Value : product,
          })
        } else {
          /* 유저의 bookmark에 해당 product가 없다면  */
          updatedUser = await User.updateLikeProductPush({ 
              userId : currentUser,
              Value : product,
          })
        }
        let realcurrentUser = await User.findByLikeUserId({ currentUserId });
        return realcurrentUser
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
        let currentUser = await User.findByLikeUserId({ currentUserId });
        let product = await Product.findByLikeDelProductId({ productDelId });

        if (!currentUser) {
            const errorMessage = "해당 유저가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (!product) {
            const errorMessage = "해당 상품이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }
        
        let updatedUser = {};

        updatedUser = await User.updateLikeProductDel({ 
            userId : currentUser,
            Value : product,
        })

        let realcurrentUser = await User.findByLikeUserId({ currentUserId });
        return realcurrentUser
    }

}

export { likeService };
