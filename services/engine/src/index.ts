import { RedisManager } from "@repo/order-queue";
import { Engine } from "./trade/engine";
import { Orderbook } from "./trade/Orderbook";
import { logger } from "@repo/logger";


async function main() {

    const engine = new Engine();
    const redisManager = RedisManager.getInstance();
    const redisClient = redisManager.getClient();
  
 
    logger.info("Connected to Redis");

   while (true) {
        const response = await redisClient.rPop("ORDER_QUEUE");
        const parsedRespnse = JSON.parse(response!);
        if (!response) {

        }else {
            const type = parsedRespnse.type;
            const responseMessage = parsedRespnse.data;
            if (responseMessage.side === "buy") {
                responseMessage.side = "yes";
            } else {
                responseMessage.side = "no";
            }
            const message = {
                type: responseMessage.type,
                data: responseMessage,
            };
            engine.processOrders({ message, clientId: type });
        }
    }

}

main().catch((error) => {
    logger.error("Error in main function:", error);
    process.exit(1);
});

export { Orderbook, Engine };