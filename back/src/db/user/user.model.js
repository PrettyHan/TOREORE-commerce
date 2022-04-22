import { UserModel } from "./user.schema";

class User {
    static async create({ newUser }) {
        const createdNewUser = await UserModel.create(newUser);
        return createdNewUser;
    }

    static async findByEmail({ email }) {
        const user = await UserModel.findOne({ email });
        return user;
    }

    static async findById({ userId }) {
        const user = await UserModel.findOne({ userId });
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
            option
        );

        return updatedUser;
    }

    static async deleteById({ userId }) {
        const deletdUser = await UserModel.deleteOne({ userId });
        return deletdUser;
    }
}

export { User };
