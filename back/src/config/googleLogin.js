import { userService } from "../apis/user/userService";
import { createAccessToken } from "../util/createJWT";

export async function googleLoginProcess(userData) {
    const { id, email, name } = userData;
    const userId = id;
    const isEmailExist = await userService.checkEmailExist({
        email,
    });

    var accessToken = createAccessToken({ userId });
    var isMember = true; // 기존에 회원가입되어 있는 유저인지 여부
    if (isEmailExist === false) {
        //기존에 없는 유저
        const loginType = "GOOGLE";
        const userData = { userId, email, name, loginType };
        const user = await userService.createUser(userData);
        isMember = false;
        const responseData = { user, isMember, accessToken };
        return responseData;
    } else {
        const user = await userService.getUserInfo({ userId }); // 기존에 소셜로그인으로 로그인해서 회원등록한 유저
        const responseData = { user, isMember, accessToken };
        return responseData;
    }
}
