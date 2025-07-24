
export const subscribeOrderbook = "subscribe_orderbook";
export const unSubscribeOrderbook = "unsubscribe_orderbook";

export type SubscribeMessage = {
    method: typeof subscribeOrderbook,
    events: string[]
}

export type UnsubscribeMessage = {
    method: typeof unSubscribeOrderbook,
    events: string[]
}

export type IncomingMessage = SubscribeMessage | UnsubscribeMessage;


export type DepthUpdateMessage = {
  type: "depth",
  data: {
      b?: [string, string][],
      a?: [string, string][],
      id: number,
      e: "depth"
  }
}

export type OutgoingMessage =  DepthUpdateMessage;