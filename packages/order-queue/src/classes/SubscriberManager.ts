import { RedisClientType, createClient } from "redis";
import { DbMessage, MessageToApi, WsMessage } from "@repo/types";


export class SubscriberManager {
    private client: RedisClientType;
    private static instance: SubscriberManager;

    private constructor() {
        this.client = createClient({
            url: process.env.REDIS_URL || "redis://localhost:6379"
        });

        this.client.on("error", (err) => {
            console.error("Redis Client Error", err);
        });

        this.client.connect().catch(console.error);
    }

    public static getInstance(): SubscriberManager {
        if (!SubscriberManager.instance) {
            SubscriberManager.instance = new SubscriberManager();
        }
        return SubscriberManager.instance;
    }

    public subscribeToChannel(channel: string, callback: (event: string, message: string) => void) {
      this.client.subscribe(channel, (event, message) => {
          callback(event, message);
      });
    }

    public unsubscribeFromChannel(channel: string) {
        this.client.unsubscribe(channel);
    }
}