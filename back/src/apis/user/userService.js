import { User } from "../../db";
import bcrypt from "bcrypt";
import is from "@sindresorhus/is";
import { createAccessToken } from "../../util/createJWT";

class userService {
    static async createUser(userData) {
        // 유저 아이디 중복 확인
        const userId = userData.userId;
        const user = await User.findByUserId({ userId });
        if (user) {
            const errorMessage =
                "이 아이디는 현재 사용중입니다. 다른 아이디를 입력해 주세요.";
            return { errorMessage };
        }

        const loginType = userData.loginType ?? null;
        // 쇼핑몰 자체 회원가입 유저가 아닌 경우(소셜 로그인 유저인 경우)
        if (loginType) {
            const { userId, email, name, loginType } = userData;
            var newUser = {
                userId,
                password: "temp-password",
                name,
                email,
                gender: 2, // 성별을 선택하지 않은 사람: 2
                phone: "010-0000-0000",
                birth: Date.now(),
                loginType,
            };
            // 쇼핑몰 자체 일반 회원가입 유저(loginType이 null인 경우)
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, 10);
            const { userId, name, email, gender, phone, birth } = userData;
            var newUser = {
                userId,
                password: hashedPassword,
                name,
                email,
                gender,
                phone,
                birth,
                loginType: "BASIC",
            };
        }

        const createdNewUser = await User.create({ newUser });
        createdNewUser.errorMessage = null;

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
        // const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
        // const accessToken = jwt.sign({ userId: user.userId }, secretKey, {
        //     expiresIn: "6h",
        // });
        const accessToken = createAccessToken({ userId });

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

    static async checkEmailDuplicate({ email }) {
        const user = await User.findByEmail({ email });

        if (!user) {
            return false;
        }

        return true;
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

        // 소셜로그인한 유저 중 추가정보를 입력하지 않았던 사람
        if (!user.hasAddtionalInfo && user.loginType !== "BASIC") {
            const fieldToUpdate = "hasAddtionalInfo";
            const newValue = true;
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
            const errorMessage = "주문 정보가 없습니다. 다시 한 번 확인해 주세요.";
            return { errorMessage };
        }

        return user;
    }
}

export { userService };
