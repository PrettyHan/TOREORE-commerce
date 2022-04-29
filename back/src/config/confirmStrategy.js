import passport from "passport";
import { google } from "./passport/googleStrategy";

const useStrategy = () => {
    passport.use("google", google);
};

export { useStrategy };
