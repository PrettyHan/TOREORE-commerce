import "dotenv/config";
import cors from "cors";
import express from "express";
import passport from "passport";
import { indexRouter } from "./src/apis/index";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import { useStrategy } from "./src/config/confirmStrategy";
import { createProxyMiddleware } from "http-proxy-middleware";
import session from "express-session";
import sessionFileStore from "session-file-store";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(
//     "/auth/google",
//     createProxyMiddleware({
//         target: "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A5001%2Fauth%2Fgoogle%2Fcallback&scope=profile%20email&client_id=430470352132-0f8bv97e0b17rmsef09boohfdcenagbq.apps.googleusercontent.com",
//         changeOrigin: true,
//     }),
// );

/*======== 카카오페이 테스트 용 set ========*/
app.set("view engine", "ejs");
app.set("views", "./src/apis/payment/views");
app.get("/payments/", (req, res) => {
    res.render("ready");
});
app.get("/payments/success", (req, res) => {
    res.render("success");
});
/*======== 카카오페이 테스트 용 set ========*/

// express session 연결
app.use(
    session({
        secret: "secret-key",
        resave: true, // 세션을 언제나 저장할지 여부, false 권장
        saveUninitialized: true,
    }),
);

app.use(passport.initialize());
app.use(passport.session());
useStrategy();

indexRouter(app);
app.use(errorMiddleware);

/*======== 구글 소셜 로그인 테스트 용 API ========*/
app.get("/", (req, res) => {
    res.send(`
        <h1>GOOGLE LOGIN TEST</h1>
        <a href="/auth/google">google login</a>
    `);
});

app.get("/main", (req, res) => {
    res.send(`
    <h1>GOOGLE LOGIN TEST : SUCCESS</h1>
    <p> HI, ${req.user} !</p>
    `);
});
/*======== 구글 소셜 로그인 테스트 용 API ========*/

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});
