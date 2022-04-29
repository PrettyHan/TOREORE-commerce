import jwt from "jsonwebtoken";

export const createAccessToken = ({ userId }) => {
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const accessToken = jwt.sign({ userId: userId }, secretKey, {
        expiresIn: "6h",
    });

    return accessToken;
};
