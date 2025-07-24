# Opinix Trade

This project is a real-time opinion trading platform where users can place bets or opinions on different events, similar to prediction markets.

---

## Table of Contents

- [Opinix Trade](#opinix-trade)
  - [Table of Contents](#table-of-contents)
  - [Architecture](#architecture)
  - [Architecture Diagram:](#architecture-diagram)
  - [Components:](#components)
  - [Features](#features)
  - [Contributing](#contributing)
---

## Architecture

The system is designed to handle real-time updates and asynchronous order processing for the order book. Below is a breakdown of the architecture:

## Architecture Diagram:
![User Diagram](https://utfs.io/f/dasd)

## Components:

1. **Client:**
   - Users **places/trades** new orders and receiving real-time updates on the order book.
   - Orders are submitted to the backend for processing.
   
2. **Backend:**
   - The backend handles the core application logic and communicates with the queue for order management (orderbook).
   - It processes incoming requests and interacts with other services to handle new orders and match them efficiently.
   
3. **Queue:**
   - Orders are placed in a queue by asynchronously handling of multiple orders without blocking the system.
   
4. **Worker:**
   - Workers consume orders from the queue and update the order book, performing the core **matching logic** to ensure the order book is **always up-to-date**.
   - After processing the order, the **workers push updated order book data to the WebSocket server**.
   
5. **WebSocket Server:**
   - Responsible for **broadcasting** real-time updates of the order book to all connected clients.
   - Ensures that users always have the latest information and that their views are synchronized across all sessions.

---

## Features

1. **Real-time Order Book Updates:**
   - The platform provides live updates to all connected clients using WebSockets. When an order is placed, the order book is immediately updated and broadcast to all users.

2. **Dynamic Order Matching:**
   - The platform adjusts the prices and quantities in the order book dynamically based on the incoming orders.

3. **Portfolio Management:**
   - A new `/portfolio` endpoint will be introduced to track user gains and losses based on the fluctuation of top prices in the order book.

4. **Payment Integration:**
   - We have integrated Cashfree  to enable secure and seamless payments within the platform.
---

