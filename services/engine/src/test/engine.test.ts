import  { Engine }  from "@repo/engine"
import { describe, expect, it, vi } from "vitest";
import { CREATE_ORDER } from "@repo/types";

vi.mock("@repo/order-queue", () => ({
    RedisManager: {
      getInstance: () => ({
        publishMessage: vi.fn(),
        sendMessageToApi: vi.fn(),
        pushMessage: vi.fn()
      })
    }
}));

describe("Engine", () => {
    it("Publishes Trade updates", () => {
        const engine = new Engine();
        const publishSpy = vi.spyOn(engine, "publishWsTrades");
        engine.processOrders({
            message: {
                type: CREATE_ORDER,
                data: {
                    market: "bitcoin-to-be-priced-at-6811470-usdt-or-more-at-0735-pm",
                    price: 0,
                    quantity: 1,
                    side: "yes",
                    userId: "1"
                }
            },
            clientId: "1"
        });

        engine.processOrders({
            message: {
                type: CREATE_ORDER,
                data: {
                    market: "bitcoin-to-be-priced-at-6811470-usdt-or-more-at-0735-pm",
                    price: 1,
                    quantity: 0,
                    side: "no",
                    userId: "2"
                }
            },
            clientId: "2"
        });
        
        expect(publishSpy).toHaveBeenCalledTimes(2);

    });
});