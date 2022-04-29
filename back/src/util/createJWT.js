import jwt from "jsonwebtoken";

const createAccessToken = ({ userId }) => {
    const secretKey = process.env.JWT_SECRET_KEY || "jwt-secret-key";
    const accessToken = jwt.sign({ userId: userId }, secretKey, {
        expiresIn: "6h",
    });

    return accessToken;
};

export { createAccessToken };
