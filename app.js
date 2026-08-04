import express from "express";
import cors from "cors";
import morgan from "morgan";
import routes from "./routes/index.routes.js";

const app = express();

app.use(express.json());

app.use("/api", routes);

export default app;