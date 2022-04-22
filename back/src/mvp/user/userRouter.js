import is from "@sindresorhus/is";
import { Router } from "express";
import { loginRequired } from "../../middlewares/loginRequired";
import { userService } from "./userService";

const userRouter = Router();

userRouter.post("/signup", async (req, res, next) => {
    try {
        if (is.emptyObject(req.body)) {
            throw new Error(
                "headers의 Content-Type을 application/json으로 설정해주세요",
            );
        }

        const userId = req.body.userId ?? null;
        const name = req.body.name ?? null;
        const email = req.body.email ?? null;
        const password = req.body.password ?? null;
        const gender = req.body.gender ?? null;
        const phone = req.body.phone ?? null;
        const birth = req.body.birth ?? null;

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

        res.status(201).json({ message: "회원가입에 성공했습니다." });
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

userRouter.get("/list", loginRequired, async (req, res, next) => {
    try {
        const users = await userService.getAllUsers();
        res.status(200).json(users);
    } catch (error) {
        next(error);
    }
});

userRouter.get("/current", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.currentUserId;
        const currentUserInfo = await userService.getUserInfo({
            user_id,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).json(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userRouter.put("/:id", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const name = req.body.name ?? null;
        const password = req.body.password ?? null;
        const description = req.body.description ?? null;

        if (req.currentUserId !== user_id) {
            throw new Error("접근권한이 없습니다.");
        }

        const toUpdate = { name, password, description };
        const updatedUser = await userService.updateUser({
            user_id,
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

userRouter.get("/:id", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.params.id;
        const currentUserInfo = await userService.getUserInfo({
            user_id,
        });

        if (currentUserInfo.errorMessage) {
            throw new Error(currentUserInfo.errorMessage);
        }

        res.status(200).json(currentUserInfo);
    } catch (error) {
        next(error);
    }
});

userRouter.delete("/:id", loginRequired, async (req, res, next) => {
    try {
        const user_id = req.params.id;

        if (req.currentUserId !== user_id) {
            throw new Error("접근권한이 없습니다.");
        }

        const deletdUser = await userService.deleteUser({ user_id });

        if (deletdUser.errorMessage) {
            throw new Error(deletdUser.errorMessage);
        }

        res.status(200).json(deletdUser);
    } catch (err) {
        next(err);
    }
});

export { userRouter };
