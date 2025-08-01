import { Router } from "express";
import { placeOrder } from "../controllers/order.js";
import { initiateOrderValidator } from "../middleware/initiate.validator.js";
export const orderRouter = Router();

orderRouter.post("/place-order", initiateOrderValidator, placeOrder);

// Export the orderRouter for use in the main server file
export default orderRouter;