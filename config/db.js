import mongoose from "mongoose";

const connectMongo = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`mongodb connected with db: ${process.env.MONGO_URI}`);
    } catch (error) {
        console.error("Error connecting mongodb");
        console.error(error.message);
        process.exit(1);
    }
};

export default connectMongo;