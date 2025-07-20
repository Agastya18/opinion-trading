export enum EOrderStatus {
  PENDING = "PENDING",
  PLACED = "PLACED",
}

export enum sides {
  YES = "yes",
  NO = "no",
}

export type TOrder = {
  id: string;
  orderBookId: string;
  price: number;
  quantity: number;
  status: "PLACED" | "PENDING";
  createdAt: Date;
};

export type TOrderbookForOrders = {
  id: string;
  eventId: string;
  topYesPrice: number;
  topNoPrice: number;
  yes: TOrder[];
  no: TOrder[];
};

export type TEvent = {
  id: string;
  title: string;
  slug: string;
  description: string;
  start_date: Date;
  end_date: Date;
  createdAt: Date;
  min_bet: number;
  max_bet: number;
  sot: string;
  traders: number;
  quantity: number;
};

//  ** Matching Engine Used Types Here **

export const CREATE_ORDER = "CREATE_ORDER";
export const CANCEL_ORDER = "CANCEL_ORDER";
export const TRADE_ADDED = "TRADE_ADDED";
export const ORDER_UPDATE = "ORDER_UPDATE";

export const ON_RAMP = "ON_RAMP";

export const GET_DEPTH = "GET_DEPTH";
export const GET_OPEN_ORDERS = "GET_OPEN_ORDERS";

//TODO: types sharing between the server, wss and the engine?
export type MessageFromApi =
  | {
      type: typeof CREATE_ORDER;
      data: {
        market: string;
        price: number;
        quantity: number;
        side: "yes" | "no";
        userId: string;
      };
    }
  | {
      type: typeof CANCEL_ORDER;
      data: {
        orderId: string;
        market: string;
      };
    }
  | {
      type: typeof ON_RAMP;
      data: {
        amount: number;
        userId: string;
        txnId: string;
      };
    }
  | {
      type: typeof GET_DEPTH;
      data: {
        market: string;
      };
    }
  | {
      type: typeof GET_OPEN_ORDERS;
      data: {
        userId: string;
        market: string;
      };
    };

// *** DB Operation Related Types ***

export type DbMessage =
  | {
      type: typeof TRADE_ADDED;
      data: {
        id: string;
        isBuyerMaker: boolean;
        price: number;
        quantity: number;
        // quoteQuantity: string,
        timestamp: number;
        market: string;
      };
    }
  | {
      type: typeof ORDER_UPDATE;
      data: {
        orderId: string;
        executedQty: number;
        market?: string;
        price?: string;
        quantity?: string;
        side?: "yes" | "no";
      };
    };

// TYpes for responding the server back

export interface Order {
  price: number;
  quantity: number;
  orderId: string;
  filled: number;
  side: "yes" | "no";
  userId: string;
}

export type MessageToApi =
  | {
      type: "DEPTH";
      payload: {
        bids: [string, string][];
        asks: [string, string][];
      };
    }
  | {
      type: "ORDER_PLACED";
      payload: {
        orderId: string;
        executedQty: number;
        fills: {
          price: number;
          qty: number;
          tradeId: string;
        }[];
      };
    }
  | {
      type: "ORDER_CANCELLED";
      payload: {
        orderId: string;
        executedQty: number;
        remainingQty: number;
      };
    }
  | {
      type: "OPEN_ORDERS";
      payload: Order[];
    };

//  WS Types

export type TickerUpdateMessage = {
  stream: string;
  data: {
    c?: string;
    h?: string;
    l?: string;
    v?: string;
    V?: string;
    s?: string;
    id: number;
    e: "ticker";
  };
};

export type DepthUpdateMessage = {
  stream: string;
  data: {
    b?: [string, string][];
    a?: [string, string][];
    e: "depth";
  };
};

export type TradeAddedMessage = {
  stream: string;
  data: {
    e: "trade";
    t: string;
    m: boolean;
    p: number;
    q: string;
    s: string; // symbol
  };
};
// TODO: REMOVE STRING HERE - ADDED FOR TEST PURPOSE
export type WsMessage =
  | TickerUpdateMessage
  | DepthUpdateMessage
  | TradeAddedMessage
  | any;