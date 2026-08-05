import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(express.json());

app.use(
    cors({ origin: "http://localhost:3002", })
);

app.use("/api", routes);

app.use(errorMiddleware);

export default app;