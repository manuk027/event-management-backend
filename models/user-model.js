import mongoose from "mongoose";
import { isValidTimeout } from "../utils/timezone.util.js";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true,
            minlength: 2,
            unique: true
        },
        timezone: {
            type: String,
            required: true,
            default: "UTC",
            trim: true,
            validate: {
                validator: isValidTimeout,
                message: "Timezone Invalid"
            }
        },
    },
    {
        timestamps: true
    }
);

const User = mongoose.model("User", userSchema);
export default User;