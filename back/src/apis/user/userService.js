import { User } from "../../db";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import is from "@sindresorhus/is";

class userService {
    static async createUser(userData) {
        // 유저 아이디 중복 확인
        const { userId, password, name, email, gender, phone, birth } = userData;
        const user = await User.findByUserId({ userId });
        if (user) {
            const errorMessage =
                "이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요.";
            return { errorMessage };
        }

        // 비밀번호 해쉬화
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = {
            userId,
            password: hashedPassword,
            name,
            email,
            gender,
            phone,
            birth,
        };

        const createdNewUser = await User.create({ newUser });
        createdNewUser.errorMessage = null; // 문제 없이 db 저장 완료되었으므로 에러가 없음.

        return createdNewUser;
    }

    static async getUser({ userId, password }) {
        // 이메일 db에 존재 여부 확인
        const user = await User.findByUserId({ userId });
        if (!user) {
            const errorMessage =
                "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 비밀번호 일치 여부 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);
        if (!isPasswordCorrect) {
            const errorMessage =
                "비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        // 로그인 성공 -> JWT 웹 토큰 생성
        const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        const accessToken = jwt.sign({ userId: user.userId }, secretKey, {
            expiresIn: "6h",
        });

        const loginUser = {
            accessToken,
            errorMessage: null,
        };

        return loginUser;
    }

    static async getAllUsers() {
        const users = await User.findAll();
        return users;
    }

    static async updateUser({ userId, toUpdate }) {
        let user = await User.findByUserId({ userId });

        if (!user) {
            const errorMessage = "가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        if (toUpdate.name) {
            const fieldToUpdate = "name";
            const newValue = toUpdate.name;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }

        if (toUpdate.password) {
            const fieldToUpdate = "password";
            const newValue = toUpdate.password;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }

        if (toUpdate.email) {
            const fieldToUpdate = "email";
            const newValue = toUpdate.email;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }

        if (toUpdate.gender) {
            const fieldToUpdate = "gender";
            const newValue = toUpdate.gender;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }

        if (toUpdate.phone) {
            const fieldToUpdate = "phone";
            const newValue = toUpdate.phone;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }

        if (toUpdate.birth) {
            const fieldToUpdate = "birth";
            const newValue = toUpdate.birth;
            user = await User.update({ userId, fieldToUpdate, newValue });
        }

        return user;
    }

    static async getUserInfo({ userId }) {
        const user = await User.findByUserId({ userId });

        if (!user) {
            const errorMessage =
                "해당 아이디는 가입 내역이 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return user;
    }

    static async deleteUser({ userId }) {
        const deletedUser = await User.deleteById({ userId });

        if (!deletedUser) {
            const errorMessage = "일치하는 유저가 없습니다.";
            return { errorMessage };
        }

        return deletedUser;
    }
    static async getUserCarts({ userId }) {
        const user = await User.findCartsByUserId({ userId });

        if (is.emptyArray(user.cart)) {
            const errorMessage =
                "주문 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return user;
    }
}

export { userService };