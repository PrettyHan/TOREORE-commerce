import passport from "passport";
import { googleStrategy } from "./passport/googleStrategy";

const useStrategy = () => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    googleStrategy();
};

export { useStrategy };
