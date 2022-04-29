import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { userService } from "./userService";
import passport from "passport";

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
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        res.redirect("/");
    },
);

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

userRouter.put("/user", loginRequired, async (req, res, next) => {
    try {
        const userId = req.currentUserId;

        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const gender = req.body.gender ?? null;
        const phone = req.body.phone ?? null;
        const birth = req.body.birth ?? null;

        const toUpdate = {
            password,
            name,
            email,
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
