/* 
subscriptions = {
    "user1": ["channel1", "channel2"],
    "user2": ["channel1", "channel3"]
}

reverseSubscriptions = {
    "channel1": ["user1", "user2"],
    "channel2": ["user1"],
    "channel3": ["user2"]
}


by adding reverseSubscriptions, we are making the subscribe and unsubscribe process faster
*/

import { createClient, RedisClientType } from "redis";
import { UserManager } from "./UserManager.js";

export class SubscriptionManager {
    private static myInstance: SubscriptionManager;
    private subscriptions: Map<string, string[]> = new Map();
    private reverseSubscriptions: Map<string, string[]> = new Map(); // for optimization iteration
    private redisClient: RedisClientType;

    private constructor() {
        this.redisClient = createClient();
        this.redisClient.connect();
    }

    public static getInstance() {
        if (!this.myInstance) {
            this.myInstance = new SubscriptionManager();
        }
        return this.myInstance;
    }
    subscribe(userId: string, subscription: string) {
        if (this.subscriptions.get(userId)?.includes(subscription)) {
            return;
        }
        const newSubscription = (this.subscriptions.get(userId) || []).concat(subscription);
        this.subscriptions.set(userId, newSubscription);

        // reverseSubscription
        const newRevSubscription = (this.reverseSubscriptions.get(subscription) || []).concat(userId)
        this.reverseSubscriptions.set(subscription, newRevSubscription)

        if (this.reverseSubscriptions.get(subscription)?.length === 1) {

            this.redisClient.subscribe(subscription, this.redisCallbackHandler);
        }
    }

    private redisCallbackHandler = (message: string, channel: string) => {
        const parsedMessage = JSON.parse(message);
        this.reverseSubscriptions.get(channel)?.forEach(s => UserManager.getInstance().getUser(s)?.emitMessage(parsedMessage));
    }

    unsubscribe(userId: string, subscription: string) {
        const subscriptions = this.subscriptions.get(userId);

        if (subscriptions) {
            // removing subscription from user's list
            this.subscriptions.set(userId,
                subscriptions.filter(s => s !== subscription)
            );
        }

        const reverseSubscriptions = this.reverseSubscriptions.get(subscription);
        if (reverseSubscriptions) {
            this.reverseSubscriptions.set(subscription, reverseSubscriptions.filter(s => s !== userId));
            if (this.reverseSubscriptions.get(subscription)?.length === 0) {
                this.reverseSubscriptions.delete(subscription);
                this.redisClient.unsubscribe(subscription);
            }
        }
    }
    public userLeft(userId: string) {
        console.log("user left " + userId);
        this.subscriptions.get(userId)?.forEach(s => this.unsubscribe(userId, s));
    }

    getSubscriptions(userId: string) {
        return this.subscriptions.get(userId) || [];
    }
}