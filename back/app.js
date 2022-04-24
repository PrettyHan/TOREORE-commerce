import "dotenv/config";
import cors from "cors";
import express from "express";
import { indexRouter } from "./src/mvp/index";
import { errorMiddleware } from "./src/middlewares/errorMiddleware";
import logger, { logStream } from "./src/utils/logger";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";
import yaml from "yamljs";

const app = express();
const PORT = process.env.PORT || 3030;

app.use(cors());
app.use(morgan("tiny", { stream: logStream }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

indexRouter(app);
app.use(errorMiddleware);

const swaggerSpec = yaml.load(path.join(__dirname, "./src/swagger/build.yaml"));
app.use(
    "/apis",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true }),
);

app.get("/", (req, res) => {
    res.json({ message: "Welcome to Data Project by CODING SOON." });
});

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}.`);
});
