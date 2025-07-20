import express from "express";
import morgan from "morgan";
import {eventRouter} from "./Router/eventRoute.js"
import {logger} from '@repo/logger'; // Adjust the import path as necessary
const app = express();
app.use(express.json());




const morganFormat = ":method :url :status :response-time ms";
app.use(
  morgan(morganFormat, {
    stream: {
      write: (message) => {
        const [method, url, status, responseTime] = message.split(" ");
        const formattedLog = `${method} - ${url} - ${status} - ${responseTime?.trim()}ms`;
        logger.info(formattedLog);
      },
    },
  })
);
app.get("/", (req, res) => {
    res.send("Hello, World!");
})

app.use("/events", eventRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
