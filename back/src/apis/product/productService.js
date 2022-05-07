import { Product, User } from "../../db";
import { getAgeIndex } from "../../util/calculateProductData";
import dayjs from "dayjs";

class productService {
    static async getProductList() {
        const products = await Product.findAll();
        if (!products) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return products;
    }

    static async getProduct({ productId }) {
        const product = await Product.findByProductId({ productId });
        if (!product) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return product;
    }

    static async getProductByQuery({ cid, pid, keyword }) {
        const product = await Product.findByQuery({ cid, pid, keyword });
        if (!product) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return product;
    }
    static async getProductBySearch({ keyword }) {
        const product = await Product.findBySearch({ keyword });
        if (!product) {
            const errorMessage = "해당 데이터가 없습니다.";
            return { errorMessage };
        }
        return product;
    }

    static async getRecomandedProducts(userId) {
        const user = await User.findByUserId({ userId });
        const userAge =
            dayjs(Date.now()).format("YYYY") - dayjs(user.birth).format("YYYY");
        const userAgeIndex = getAgeIndex(userAge);
        const products = await Product.findProductsByAgeGender({
            userAgeIndex,
            gender: user.gender,
        });

        const recomandedProducts = products.map((product) => {
            return {
                productId: product.productId,
                category: product.category,
                image: product.image,
            };
        });

        return recomandedProducts;
    }
}
export { productService };
