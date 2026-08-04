import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        message: {
            type: String,
            required: true,
            trim: true,
        },
        previousValue: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        },
        newValue: {
            type: mongoose.Schema.Types.Mixed,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const EventLog = mongoose.model("EventLog", eventLogSchema);
export default EventLog;