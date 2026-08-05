import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema(
    {
        event: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Event",
            required: true,
        },
        changes: [
            {
                field: {
                    type: String,
                    required: true,
                },
                previousValue: {
                    type: mongoose.Schema.Types.Mixed,
                    required: true,
                },
                newValue: {
                    type: mongoose.Schema.Types.Mixed,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true
    }
);

const EventLog = mongoose.model("EventLog", eventLogSchema);
export default EventLog;