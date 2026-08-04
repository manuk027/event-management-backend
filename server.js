import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import connectMongo from "./config/db.js";


const PORT = process.env.PORT || 3001;

const server = async () => {
    try {
        await connectMongo();
        app.listen(PORT, () => {
            console.log(`Server: http://localhost:${PORT}`);
        });
    } catch (error) {
        console.error(error);
    }
};

server();
