import "dotenv/config";
import cors from "cors";
import express from "express";
import { indexRouter } from "./src/apis/index";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import passport from "passport";
import { useStrategy } from "./src/config/confirmStrategy";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
useStrategy();
// app.use(passport.session());

indexRouter(app);
app.use(errorMiddleware);

app.get("/", (req, res) => {
    res.send(`
        <h1>GOOGLE LOGIN TEST</h1>
        <a href="/auth/google">google login</a>
    `);
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});
