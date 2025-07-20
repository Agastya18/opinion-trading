import { logger } from "@repo/logger";
import { RedisManager } from "../classes/RedisManager.js";


const QUEUE_NAME = "ORDER_QUEUE";

export const addToOrderQueue = async (message: any) => {
    try {
        const redisManager = RedisManager.getInstance();
        const client = redisManager.getClient();

        // Push the message to the order queue
        await client.lPush(QUEUE_NAME, JSON.stringify(message));
        logger.info(`Message added to ${QUEUE_NAME}:`, message);
    } catch (error) {
        logger.error("Error adding message to order queue:", error);
    }
}

export const processOrderQueue = async () => {
    try {
        const redisManager = RedisManager.getInstance();
        const client = redisManager.getClient();

        // Continuously process messages from the order queue
        while (true) {
            const message = await client.rPop(QUEUE_NAME);
            if (message) {
                const parsedMessage = JSON.parse(message);
                logger.info(`Processing message from ${QUEUE_NAME}:`, parsedMessage);
                // Here you would typically handle the order processing logic
                // For example, saving to a database or sending to another service

                // test logic like console.log(parsedMessage);
                // For example, you might call a function to handle the order
                // handleOrder(parsedMessage);
                // For now, we just log the message
                logger.info("Order processed:", parsedMessage);

            } else {
                // If no message is available, wait for a short period before checking again
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    } catch (error) {
        logger.error("Error processing order queue:", error);
    }
}