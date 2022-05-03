import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { userService } from "./userService";
import passport from "passport";
import cors from "cors";
import { createAccessToken } from "../../util/createJWT";
import axios from "axios";

const userRouter = Router();

userRouter.post("/signup", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        const { userId, name, email, password, gender, phone, birth } = req.body;

        const userData = {
            userId,
            password,
            name,
            email,
            gender,
            phone,
            birth,
        };

        const newUser = await userService.createUser(userData);

        if (newUser.errorMessage) {
            throw new Error(newUser.errorMessage);
        }

        res.status(201).json(newUser);
    } catch (error) {
        next(error);
    }
});

// google login
userRouter.get(
    "/google",
    passport.authenticate("google", { scope: ["profile", "email"] }),
);

userRouter.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "http://localhost:3000" }),
    (req, res) => {
        const { user, isMember } = req.user;
        // const accessToken = createAccessToken({ userId: user.userId });
        // res.status(200).json({ accessToken, userInfo: req.user });
        if (isMember === false || (isMember && user.hasAddtionalInfo === false)) {
            // 추가정보입력 프론트 페이지 이동 -> 정보 입력 후 확인 시, 유저 업데이트 및 토큰 발급 -> 응답
            res.status(302).redirect(
                `http://localhost:3000/useredit?uid=${user.userId}`,
            ); // http://localhost:3000/useredit?uid=103495610959074788067
        } else {
            // (추가정보입력 안해도 되는 유저가)로그인 성공 시 -> 로그인 확인 페이지로 이동 -> 토큰 발급
            res.status(302).redirect(
                `http://localhost:3000/login-confirm?uid=${user.userId}`,
            );
        }
    },
);

userRouter.post("/google", async (req, res, next) => {
    try {
        const { googleAccessToken } = req.body;
        const { data } = await axios.get(
            `https://www.googleapis.com/oauth2/v4/userinfo?access_token=${googleAccessToken}`,
        );

        console.log(data);
    } catch (error) {
        next(error);
    }
});

userRouter.post("/login", async (req, res, next) => {
    try {
        const userId = req.body.userId;
        const password = req.body.password;

        const user = await userService.getUser({ userId, password });

        if (user.errorMessage) {
            throw new Error(user.errorMessage);
        }

        res.status(200).json(user);
    } catch (error) {
        next(error);
    }
});

// 소셜로그인 유저 재로그인시 -> 토큰 발급 라우터
userRouter.post("/get-token", (req, res, next) => {
    try {
        const userId = req.body.userId;
        const accessToken = createAccessToken({ userId });

        res.status(200).json(accessToken);
    } catch (error) {
        next(error);
    }
});

// 소셜로그인한 유저가 유저정보를 입력하면, 유저정보 업데이트 & 토큰발급 해주는 라우터
userRouter.put("/social-user", async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const name = req.body.name ?? null;
        const password = req.body.password ?? null;
        const gender = req.body.gender ?? null;
        const phone = req.body.phone ?? null;
        const birth = req.body.birth ?? null;

        const toUpdate = {
            password,
            name,
            gender,
            phone,
            birth,
        };
        const updatedUser = await userService.updateUser({
            userId,
            toUpdate,
        });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        res.status(200).json({ accessToken: updatedUser.accessToken });
    } catch (error) {
        next(error);
    }
});

// 일반 회원수정
userRouter.put("/user", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const name = req.body.name ?? null;
        const password = req.body.password ?? null;
        const gender = req.body.gender ?? null;
        const phone = req.body.phone ?? null;
        const birth = req.body.birth ?? null;

        const toUpdate = {
            password,
            name,
            gender,
            phone,
            birth,
        };
        const updatedUser = await userService.updateUser({
            userId,
            toUpdate,
        });

        if (updatedUser.errorMessage) {
            throw new Error(updatedUser.errorMessage);
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/user", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;
        const currentUserInfo = await userService.getUserInfo({
            userId,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).json(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userRouter.delete("/user", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const deletdUser = await userService.deleteUser({ userId });

        if (deletdUser.errorMessage) {
            throw new Error(deletdUser.errorMessage);
        }

        res.status(200).json(deletdUser);
    } catch (err) {
        next(err);
    }
});

export { userRouter };
