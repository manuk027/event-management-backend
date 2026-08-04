import { Router } from "express";
import eventController from "../controllers/event.controller.js";

const eventRouter = Router();

eventRouter.post("/", eventController.createEvent);
eventRouter.get("/:eventId", eventController.getEventById);
eventRouter.get("/user/:userId", eventController.getEventsByUser);
eventRouter.patch("/:eventId", eventController.updateEvent);

export default eventRouter;