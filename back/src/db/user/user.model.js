import { UserModel } from "./user.schema";
import { OrderModel } from "../order/order.schema";

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByUserId({ userId }) {
        const user = await UserModel.findOne({ userId });
        return user;
    }

    static async findCartsByUserId({ userId }) {
        const user = await UserModel.findOne({ userId }, { cart: 1, _id: 0 });
        return user;
    }

    static async findAll() {
        const users = await UserModel.find({});
        return users;
    }

    static async update({ userId, fieldToUpdate, newValue }) {
        const filteredById = { userId };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedUser;
    }

    /*  
        좋아요를 클릭 시 좋아요를 누른 유저의 bookmark에 해당 상품 저장
    */
    static async updateLikeProductPush({ userId, Value }) {
        const updatedUser = await UserModel.findOneAndUpdate(
            { userId: userId.userId },
            {
                $push: { bookmark: Value },
            },
        );
        return updatedUser;
    }

    /*  
        좋아요를 클릭 시 좋아요를 누른 유저의 bookmark에 해당 상품 제거
    */
    static async updateLikeProductDel({ userId, Value }) {
        const updatedUser = await UserModel.findOneAndUpdate(
            { userId: userId.userId },
            {
                $pull: { bookmark: { _id: Value._id } },
            },
        );
        // console.log(updatedUser);
        return updatedUser;
    }
    // 좋아요 유저 정보 갱신
    static async likeUserUpdate({ userId, fieldToUpdate, newValue }) {
        const filteredById = { userId };
        const updateData = { [fieldToUpdate]: newValue };
        const option = { returnOriginal: false };

        const updatedUser = await UserModel.findOneAndUpdate(
            filteredById,
            updateData,
            option,
        );

        return updatedUser;
    }

    static async findByLikeUserId({ currentUserId }) {
        const user = await UserModel.findOne({ userId: currentUserId });
        return user;
    }

    static async deleteProductBySelected({ userId, productId }) {
        await UserModel.findOneAndUpdate(
            { userId },
            {
                $pull: { cart: { productId } },
            },
            { returnOriginal: false },
        );
    }

    static async deleteById({ userId }) {
        const deletdUser = await UserModel.deleteOne({ userId });
        await OrderModel.findByIdAndDelete({ userId }); // userId로 검색된 주문정보 모두 삭제

        return deletdUser;
    }
}

export { User };
