import "dotenv/config";
import cors from "cors";
import express from "express";
import { indexRouter } from "./src/mvp/index";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import { swaggerUi, specs } from "./src/swagger/swagger";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

indexRouter(app);
app.use(errorMiddleware);
app.use("/apis", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Data Project by CODING SOON." });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});
