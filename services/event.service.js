import eventRepository from "../repositories/event.repository.js";
import userRepository from "../repositories/user.repository.js";
import { convertToUTC } from "../utils/timezone.util.js";

class EventService {
    async createEvent(eventData) {
        const { users, timezone, startTime, endTime } = eventData;
        const existingUsers = await userRepository.findByIds(users);
        if (users.length !== existingUsers.length) throw new Error("Selected user does not exists.");
        const startUTC = convertToUTC(startTime, timezone);
        const endUTC = convertToUTC(endTime, timezone);
        if (endUTC <= startUTC) throw new Error("End time must be after start time");
        return await eventRepository.create({ ...eventData, startTime: startUTC, endTime: endUTC });
    }

    async getEventById(eventId) {
        const event = await eventRepository.findById(eventId);
        if (!event) throw new Error("Event with the given id does not exist");
        return event;
    }

    async getEventsByUser(userId) {
        return await eventRepository.findByUser(userId);
    }

    async updateEvent(eventId, updateData) {
        const event = await eventRepository.findById(eventId);
        if (!event) throw new Error("Event not found");
        if (updateData.users) {
            const existingUsers = await userRepository.findByIds(updateData.users);
            if (existingUsers.length !== updateData.users.length) throw new Error("Selected user does not exists.");
        }
        const timezone = updateData.timezone || event.timezone;
        if (updateData.startTime) updateData.startTime = convertToUTC(updateData.startTime, timezone);
        if (updateData.endTime) updateData.endTime = convertToUTC(updateData.endTime, timezone);
        const startTime = updateData.startTime ?? event.startTime;
        const endTime = updateData.endTime ?? event.endTime;
        if (endTime <= startTime) throw new Error("End time should not be before start time");
        return await eventRepository.update(eventId, updateData);
    }
}

export default new EventService();