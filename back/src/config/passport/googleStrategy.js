import oauth2 from "passport-google-oauth20";
import passport from "passport";
import { createAccessToken } from "../../util/createJWT";

const GoogleStrategy = oauth2.Strategy;

export const googleStrategy = () => {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: "http://localhost:5001/auth/google/callback",
            },
            function (accessToken, refreshToken, profile, cb) {
                console.log("구글 로그인 유저 프로필 >>", profile);
                // 1. 구글 Profile.id 일련번호를 userId로 매핑 -> 유저정보 db 등록
                // 2. 유저정보 생성 -> 아이디, 이메일, 이름 정보만 있는 상태에서 추가정보 입력 페이지로 이동
                // 3. 추가정보 입력 후, 완료 시 -> 유저정보 업데이트 후, jwt 토큰 발급해 응답
                // ** 소셜로그인 후, 추가정보 입력 페이지에서 브라우저를 닫을 경우는 다음에 다시 방문했을 때 어떻게 판단??

                // User.findOrCreate({ googleId: profile.id }, function (err, user) {
                //     return cb(err, user);
                // });

                // const ourAccessToken = createAccessToken(); // jwt 발급
                return cb(null, profile, ourAccessToken);
            },
        ),
    );
};
