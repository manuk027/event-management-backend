import eventRepository from "../repositories/event.repository.js";
import userRepository from "../repositories/user.repository.js";
import { convertToUTC } from "../utils/timezone.util.js";
import ErrorClass from "../utils/error.js";
import eventLogRepository from "../repositories/log.repository.js";

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
        if (!event) throw new ErrorClass("Event with the given id does not exist", 404);
        let existingUsers = [];
        if (updateData.users) {
            existingUsers = await userRepository.findByIds(updateData.users);
            if (existingUsers.length !== updateData.users.length) throw new ErrorClass("Selected with the selected id does not exists.", 400);
        }
        const timezone = updateData.timezone || event.timezone;
        if (updateData.startTime) updateData.startTime = convertToUTC(updateData.startTime, timezone);
        if (updateData.endTime) updateData.endTime = convertToUTC(updateData.endTime, timezone);
        const startTime = updateData.startTime ?? event.startTime;
        const endTime = updateData.endTime ?? event.endTime;
        if (endTime <= startTime) throw new ErrorClass("End time should not be before start time", 400);
        const changes = [];
        if (updateData.timezone && updateData.timezone !== event.timezone) {
            changes.push({ field: "timezone", previousValue: event.timezone, newValue: updateData.timezone, });
        }
        if (updateData.startTime && event.startTime.getTime() !== updateData.startTime.getTime()) {
            changes.push({ field: "startTime", previousValue: event.startTime, newValue: updateData.startTime, });
        }
        if (updateData.endTime && event.endTime.getTime() !== updateData.endTime.getTime()) {
            changes.push({ field: "endTime", previousValue: event.endTime, newValue: updateData.endTime, });
        }
        if (updateData.users) {
            const previousUsers = event.users.map((user) => user.name).sort();
            const newUsers = existingUsers.map((user) => user.name).sort();
            const usersChanged = previousUsers.length !== newUsers.length || previousUsers.some((user, index) => user !== newUsers[index]);
            if (usersChanged) changes.push({ field: "users", previousValue: previousUsers, newValue: newUsers, });
        }
        const updatedEvent = await eventRepository.update(eventId, updateData);
        if (changes.length > 0) {
            await eventLogRepository.create({ event: eventId, changes, });
        }
        return updatedEvent;
    }
}

export default new EventService();