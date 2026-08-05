import EventLog from "../models/eventlog-model.js";

class EventLogRespository {
    async create(logData) {
        return await EventLog.create(logData);
    }
    async findByEvent(eventId) {
        return await EventLog.findById({ event: eventId }).sort({ createdAt: -1 });
    }
}

export default new EventLogRespository();