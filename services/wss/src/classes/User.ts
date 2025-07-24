import { WebSocket } from "ws";
import { OutgoingMessage } from "../types/index.js";
import { IncomingMessage, subscribeOrderbook, unSubscribeOrderbook } from "../types/index.js";
import { SubscriptionManager } from "./SubscriptionManager.js";

export class User {
    private id: string;
    private ws: WebSocket;
    private subscriptions: string[] = [];

    constructor(id: string, ws: WebSocket) {
        this.id = id;
        this.ws = ws;
        this.addListeners();
    }
    private addListeners() {
        this.ws.on('message', (msg: string) => {
            const parsedMessage: IncomingMessage = JSON.parse(msg);
            if (parsedMessage.method === subscribeOrderbook) {
                // subscribe to the event
                parsedMessage.events.forEach(s => SubscriptionManager.getInstance().subscribe(this.id, s));

            }
            if (parsedMessage.method === unSubscribeOrderbook) {
                // unsubscribe to the event
                parsedMessage.events.forEach(s => SubscriptionManager.getInstance().unsubscribe(this.id, s))
            }

        })
    }
    public subscribe(subscription: string) {
        this.subscriptions.push(subscription);
    }

    public unsubscribe(subscription: string) {
        this.subscriptions = this.subscriptions.filter(s => s !== subscription);
    }
    emitMessage(message: OutgoingMessage) {
        this.ws.send(JSON.stringify(message));
    }
}