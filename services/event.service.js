import eventRepository from "../repositories/event.repository.js";
import userRepository from "../repositories/user.repository.js";
import { convertToUTC } from "../utils/timezone.util.js";
import ErrorClass from "../utils/error.js";

class EventService {
    async createEvent(eventData) {
        const { users, timezone, startTime, endTime } = eventData;
        const existingUsers = await userRepository.findByIds(users);
        if (users.length !== existingUsers.length) throw new ErrorClass("Selected user does not exists.", 400);
        const startUTC = convertToUTC(startTime, timezone);
        const endUTC = convertToUTC(endTime, timezone);
        if (endUTC <= startUTC) throw new ErrorClass("End time must be after start time", 400);
        return await eventRepository.create({ ...eventData, startTime: startUTC, endTime: endUTC });
    }

    async getEventById(eventId) {
        const event = await eventRepository.findById(eventId);
        if (!event) throw new ErrorClass("Event with the given id does not exist", 404);
        return event;
    }

    async getEventsByUser(userId) {
        return await eventRepository.findByUser(userId);
    }

    async updateEvent(eventId, updateData) {
        const event = await eventRepository.findById(eventId);
        if (!event) throw new ErrorClass("Event not found", 404);
        if (updateData.users) {
            const existingUsers = await userRepository.findByIds(updateData.users);
            if (existingUsers.length !== updateData.users.length) throw new ErrorClass("Selected user does not exists.", 400);
        }
        const timezone = updateData.timezone || event.timezone;
        if (updateData.startTime) updateData.startTime = convertToUTC(updateData.startTime, timezone);
        if (updateData.endTime) updateData.endTime = convertToUTC(updateData.endTime, timezone);
        const startTime = updateData.startTime ?? event.startTime;
        const endTime = updateData.endTime ?? event.endTime;
        if (endTime <= startTime) throw new ErrorClass("End time should not be before start time", 400);
        return await eventRepository.update(eventId, updateData);
    }
}

export default new EventService();