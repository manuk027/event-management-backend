import eventService from "../services/event.service.js";

class EventController {
    async createEvent(req, res, next) {
        try {
            const event = await eventService.createEvent(req.body);
            return res.status(201).json({ success: true, message: "event created successfully", data: event, });
        } catch (error) {
            next(error);
        }
    }

    async getEventById(req, res, next) {
        try {
            const event = await eventService.getEventById(req.params.eventId);
            return res.status(200).json({ success: true, data: event });
        } catch (error) {
            next(error);
        }
    }

    async getEventsByUser(req, res, next) {
        try {
            const events = await eventService.getEventsByUser(req.params.userId);
            return res.status(200).json({success: true, data: events});
        } catch (error) {
            next(error);
        }
    }

    async updateEvent(req, res, next) {
        try {
            const event = await eventService.updateEvent(req.params.eventId, req.body);
            return res.status(200).json({ success: true, message: "Event updated successfully.", data: event, });
        } catch (error) {
            next(error);
        }
    }
};

export default new EventController();