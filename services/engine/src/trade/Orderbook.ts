import { v4 as uuidv4 } from "uuid";

export interface Order {
    filled: number;
    price: number;
    quantity: number;
    side: "yes" | "no";
    userId: string;
    orderId: string;
    
}
export interface Fill {
     price: number;
    qty: number;
    tradeId: string;
    otherUserId: string;
    marketOrderId: string; // orderId to be matched.
}

interface MatchResult {
    executedQty: number;
    fills: Fill[];
}
export class Orderbook {

    bids:Order[];
    asks:Order[];
    market:string;
    lastTradeId: number;
    currentPrice:number;
    
      constructor(bids: Order[], asks: Order[], lastTradeId: number, currentPrice:number, market: string) {
        this.market = market;
        this.bids = bids;
        this.asks = asks;
        this.lastTradeId = lastTradeId;
        this.currentPrice = currentPrice || 0;
    }

    addOrder(order: Order) {
        if(order.side==="yes"){
            console.log("Adding to bids {yes}", order);

            // match bids with asks
            const { executedQty, fills } = this.matchBid(order);

            order.filled= executedQty;
             if(executedQty< order.quantity){
                this.bids.push(order);
                this.bids.sort((a, b) => b.price - a.price);

             }
            
            return {
                executedQty,
                fills,
            };

        }else{
            const { executedQty, fills } = this.matchAsk(order);

            order.filled= executedQty;
             if(executedQty< order.quantity){
                this.asks.push(order);
                this.asks.sort((a, b) => a.price - b.price);

             }

            return {
                executedQty,
                fills,
            };
        }
    }

   

    matchBid(order: Order): MatchResult {
        let executedQty=0;
        const fills: Fill[] = [];

        for(let i=0;i<this.asks.length && executedQty<order.quantity;i++){
            const askOrder= this.asks[i];
            //@ts-ignore
            if(askOrder.price<=order.price){
                const qtyToFill = Math.min(order.quantity - executedQty, askOrder.quantity - askOrder.filled);

                executedQty += qtyToFill;
                askOrder.filled += qtyToFill;
                this.currentPrice = askOrder?.price!;
                fills.push({
                    price: askOrder?.price!,
                    qty: qtyToFill,
                    tradeId: uuidv4(),
                    otherUserId: askOrder?.userId!,
                    marketOrderId: askOrder?.orderId!,
                });
            }else{
                // No more matches possible
                break;
            }

            // Remove fully filled ask
            this.asks = this.asks.filter(o => o.filled < o.quantity);

           
        }
         return { executedQty, fills };

   }

   matchAsk(order: Order): MatchResult {
    let executedQty = 0;
    const fills: Fill[] = [];

    for (let i = 0; i < this.bids.length && executedQty < order.quantity; i++) {
        const bidOrder = this.bids[i];
        //@ts-ignore
        if (bidOrder.price >= order.price) {
            const qtyToFill = Math.min(order.quantity - executedQty, bidOrder.quantity - bidOrder.filled);

            executedQty += qtyToFill;
            bidOrder.filled += qtyToFill;
            this.currentPrice = bidOrder?.price!;
            fills.push({
                price: bidOrder?.price!,
                qty: qtyToFill,
                tradeId: uuidv4(),
                otherUserId: bidOrder?.userId!,
                marketOrderId: bidOrder?.orderId!,
            });
        } else {
            // No more matches possible
            break;
        }

        // Remove fully filled bid
        this.bids = this.bids.filter(o => o.filled < o.quantity);
    }

    return { executedQty, fills };
   }

   // todo: Can you make this faster? Can you compute this during order matches?
 getMarketDepth(){
    const bids: [string, string][] = [];
        const asks: [string, string][] = [];

        const bidsObj: { [key: string]: number } = {}
        const asksObj: { [key: string]: number } = {}

        // bids depth
        for (let i = 0; i < this.bids.length; i++) {
            const order = this.bids[i];
            const bidsObjPriceKey = order?.price.toString()!;

            if (!bidsObj[bidsObjPriceKey]) {
                bidsObj[bidsObjPriceKey] = 0;
            }
            bidsObj[bidsObjPriceKey] += order?.quantity!;
        }

        // asks depth
        for (let i = 0; i < this.asks.length; i++) {
            const order = this.asks[i];
            const asksObjPriceKey = order?.price.toString()!;

            if (!asksObj[asksObjPriceKey]) {
                asksObj[asksObjPriceKey] = 0;
            }
            asksObj[asksObjPriceKey] += order?.quantity!;
        }

        for (const price in bidsObj) {
            bids.push([price, bidsObj[price]?.toString()!]);
        }

        for (const price in asksObj) {
            asks.push([price, asksObj[price]?.toString()!]);
        }

        return {
            bids,
            asks
        };
 }
 

   cancelBid(order: Order): boolean {
       const index = this.bids.findIndex(o => o.id === order.orderId);
       if (index !== -1) {
           this.bids.splice(index, 1);
           return true;
       }
       return false;
   }

   cancelAsk(order: Order): boolean {
       const index = this.asks.findIndex(o => o.id === order.orderId);
       if (index !== -1) {
            this.asks.splice(index, 1);
            return true;
        }
        return false;
        
    }

    getSnapShot() {
         return {
              bids: this.bids,
              asks: this.asks,
              market: this.market,
              lastTradeId: this.lastTradeId,
              currentPrice: this.currentPrice,
         };
    }
    getOpenOrders(userId: string): {
        bids: Order[];
        asks: Order[];
    } {
        const userBids = this.bids.filter(order => order.userId === userId);
        const userAsks = this.asks.filter(order => order.userId === userId);
        return {
            bids: userBids,
            asks: userAsks,
        };
    }

}