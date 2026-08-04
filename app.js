import express from "express";
import cors from "cors";
import morgan from "morgan";

const app = express();

app.get("/", (req, res) => {
    res.json({ success: true, message: "Backend Initialised." });
});

export default app;