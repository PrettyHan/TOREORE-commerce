import passport from "passport";
import { googleStrategy } from "./passport/googleStrategy";

const useStrategy = () => {
    passport.serializeUser((requestData, done) => {
        console.log("serialize >> ", requestData);
        // done(null, user.id);
        done(null, requestData.user.id);
    });

    passport.deserializeUser((user, done) => {
        done(null, user);
    });

    googleStrategy();
};

export { useStrategy };
