import Event from "../models/event-model.js";

class EventRepository {
    async create(eventData) {
        return await Event.create(eventData);
    }
    async findAll() {
        return await Event.find().populate("users", "name").sort({ createdAt: -1 });
    }
    async findById(eventId) {
        return await Event.findById(eventId).populate("users", "name")
    }
    async findByUser(userId) {
        return await Event.find({ users: userId }).populate("users", "name").sort({ startTime: 1 });
    }
    async update(eventId, updateData) {
        return await Event.findByIdAndUpdate(eventId, updateData, {
            new: true, runValidators: true,
        }).populate("users", "name");
    }
};

export default new EventRepository();