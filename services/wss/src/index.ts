import { WebSocketServer } from "ws";

import {UserManager} from "./classes/UserManager.js";



const wss = new WebSocketServer({ port: 8080 });

wss.on("listening", () => {
    console.log(`WebSocket server is running on port ws://localhost:${wss.options.port}`);
});

wss.on("connection", (ws) => {
    UserManager.getInstance().addUser(ws);
});