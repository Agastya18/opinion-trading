import { sides } from "@repo/types";
import { v4 as uuid4 } from "uuid";
import { Request, Response } from "express";
import { addToOrderQueue } from "@repo/order-queue";
type TPlaceOrderReq = {
  event_id: number;
  l1_expected_price: number;
  l1_order_quantity: number;
  offer_type: sides;
  userid: string
};

export const placeOrder = async (req: Request, res: Response) => {
  try {
    const { event_id, l1_expected_price, l1_order_quantity, offer_type, userid }: TPlaceOrderReq = req.body;

    // Validate request body
    if (!event_id || !l1_expected_price || !l1_order_quantity || !offer_type || !userid) {
      return res.status(400).json({ error: "All fields are required" });
    }

      console.log("checkpoint rrrrr")

    // Generate a unique order ID
    const orderId = uuid4();
    // Create the order object
    const data = {
      type: uuid4(),
      data: {
        market: event_id,
        price: l1_expected_price,
        type: "CREATE_ORDER", // type of the order , TODO: need to fix this 
        quantity: l1_order_quantity,
        side: offer_type,
        userId: userid.toString(),
      },
    };

  

    // Add the order to the queue
    await addToOrderQueue(data);

    res.status(201).json({ message: "Order placed successfully", orderId });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({ error: "Failed to place order" });
  }
}