import "dotenv/config";
import cors from "cors";
import express from "express";
import passport from "passport";
import { indexRouter } from "./src/apis/index";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import { useStrategy } from "./src/config/confirmStrategy";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


/*======== 카카오페이 테스트 용 set ========*/
app.set("view engine", "ejs");
app.set("views", './src/apis/payment/views');
app.get("/payments/", (req, res) => {
    res.render("ready")
})
app.get("/payments/success", (req, res) => {
    res.render("success")
})
/*======== 카카오페이 테스트 용 set ========*/

app.use(passport.initialize());
useStrategy();

indexRouter(app);
app.use(errorMiddleware);

/*======== 구글 소셜 로그인 테스트 용 API ========*/
// app.get("/", (req, res) => {
//     res.send(`
//         <h1>GOOGLE LOGIN TEST</h1>
//         <a href="/auth/google">google login</a>
//     `);
// });

// app.get("/main", (req, res) => {
//     res.send(`
//     <h1>GOOGLE LOGIN TEST : SUCCESS</h1>
//     <p> HI, ${req.user} !</p>
//     `);
// });
/*======== 구글 소셜 로그인 테스트 용 API ========*/

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});
