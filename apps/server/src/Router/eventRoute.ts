import { Router } from "express";
import { createEvent } from "../controllers/event.js";

const eventRouter = Router();

eventRouter.post("/create", createEvent);

export default eventRouter;
export { eventRouter };