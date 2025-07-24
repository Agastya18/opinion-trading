"use server"
// Demo Server Action for Redis
import { redisClient } from "@repo/order-queue"
export async function PushOrdersIntoQueue() {
    await redisClient.connect();
    console.log("connected to redis");
    return {success:true}
}