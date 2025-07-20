import { createClient,RedisClientType } from "redis";

import {DbMessage,WsMessage,MessageToApi} from "@repo/types";

export class RedisManager {
    private client: RedisClientType;
    private static instance: RedisManager;
    
    private constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || "redis://localhost:6379"
        });

        this.client.on("error", (err) => {
            console.error("Redis Client Error", err);
        });

        this.client.connect().catch(console.error);
    }

    public static getInstance(): RedisManager {
        if (!RedisManager.instance) {
            RedisManager.instance = new RedisManager();
        }
        return RedisManager.instance;
    }

    public getClient(): RedisClientType {
        return this.client;
    }

    public pushMessage(message: DbMessage) {

         this.client.lPush("db_processor", JSON.stringify(message));
    }
    public publishMessage(channel: string, message: WsMessage) {
        this.client.publish(channel, JSON.stringify(message));
    }
    public sendMessageToApi(clientId: string, message: MessageToApi) {
        this.client.publish(clientId, JSON.stringify(message));
    }
}


