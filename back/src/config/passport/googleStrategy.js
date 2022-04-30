import oauth2 from "passport-google-oauth20";
import passport from "passport";
import { createAccessToken } from "../../util/createJWT";
import { userService } from "../../apis/user/userService";

const GoogleStrategy = oauth2.Strategy;

export const googleStrategy = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:5001/auth/google/callback",
            },
            async function (accessToken, refreshToken, profile, cb) {
                console.log("구글 로그인 유저 프로필 >>", profile._json);
                const userInfo = profile._json;

                const email = userInfo.email;
                const userId = userInfo.sub;
                const name = userInfo.name;
                const isEmailDuplicate = await userService.checkEmailDuplicate({
                    email,
                });

                var isMember = true; // 기존에 회원가입되어 있는 유저인지 여부
                if (isEmailDuplicate === false) {
                    const loginType = "GOOGLE";
                    const userData = { userId, email, name, loginType };
                    const newUser = await userService.createUser(userData); // 소셜로그인 최초 로그인 유저
                    isMember = false;

                    return cb(null, newUser, isMember); // profile 안넘겨줘도?
                } else {
                    const user = await userService.getUserInfo({ userId }); // 기존에 소셜로그인으로 로그인해서 회원등록한 유저

                    return cb(null, user, isMember); // profile 안넘겨줘도?
                }

                //    유저일련번호: userInfo.sub, 유저이름: userInfo.name, 유저이메일: profile.email
                // 1. 해당 이메일로 회원가입한 정보가 있는지 확인
                // 2. 구글 Profile.id 일련번호를 userId로 매핑 -> 유저정보 db 등록
                // 3. 유저정보 생성 -> 아이디, 이메일, 이름 정보만 있는 상태에서 추가정보 입력 페이지로 이동
                // 4. 추가정보 입력 후, 완료 시 -> 유저정보 업데이트 후, jwt 토큰 발급해 응답
                // ** 소셜로그인 후, 추가정보 입력 페이지에서 브라우저를 닫을 경우는 다음에 다시 방문했을 때 어떻게 판단??

                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });

                // const ourAccessToken = createAccessToken(); // jwt 발급 -> 추가정보 입력 후에
            },
        ),
    );
};
