import mongoose from "mongoose";
import { isValidTimezone } from "../utils/timezone.util.js";

const eventSchema = new mongoose.Schema(
    {
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        timezone: {
            type: String,
            required: true,
            default: "UTC",
            trim: true,
            validate: {
                validator: isValidTimezone,
                message: "Timezone Invalid"
            }
        },
        startTime: {
            type: Date,
            required: true,
        },
        endTime: {
            type: Date,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

eventSchema.path("users").validate(
    (users) => users.length > 0,
    "Select at least one user."
);

eventSchema.pre("validate", function () {
    if (this.startTime && this.endTime && this.endTime <= this.startTime) throw new Error("End time must be after start time.");
});

const Event = mongoose.model("Event", eventSchema);
export default Event;