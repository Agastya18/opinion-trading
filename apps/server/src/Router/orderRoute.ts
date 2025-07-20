import { Router } from "express";
import { placeOrder } from "../controllers/order.js";
export const orderRouter = Router();

orderRouter.post("/place-order", placeOrder);

// Export the orderRouter for use in the main server file
export default orderRouter;