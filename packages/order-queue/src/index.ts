import { addToOrderQueue,processOrderQueue } from "./queues/orderQueue.js";
import {logger} from "@repo/logger";

// Start processing the order queue

const startOrderQueueProcessing = async () => {
    try {
        logger.info("WORKER | Starting order queue processing...");
        // Start processing in background without blocking
        processOrderQueue().catch((error) => {
            logger.error("WORKER | Order queue processing failed:", error);
        });
        logger.info("WORKER | Order worker started successfully");
    } catch (error) {
       logger.error("Error starting order queue processing:", error);
    }
};

startOrderQueueProcessing();
// Export the addToOrderQueue function for external use
export { addToOrderQueue };