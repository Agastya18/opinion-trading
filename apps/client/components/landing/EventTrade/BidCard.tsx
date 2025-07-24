import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const BidCard = () => {
  const [side, setSide] = useState<"yes" | "no">("yes");
  const [tradePrice, setTradePrice] = useState("");
  const [tradeQuantity, setTradeQuantity] = useState("");

  useEffect(() => {
    async function fetchInitialData() {}
    fetchInitialData();
  }, []);

  async function handleTrade() {}

  return (
    <Card className="bg-white border md:fixed md:right-10 md:w-[30%]">
      <CardHeader>
        <CardTitle className="">Place Order</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between mb-4">
          <Button
            variant={side === "yes" ? "default" : "outline"}
            onClick={() => setSide("yes")}
            className={`bg-blue-500 text-white hover:bg-blue-600 ${
              side === "yes" ? "ring-2 ring-blue-400" : ""
            }`}
          >
            Yes ₹{5}
          </Button>
          <Button
            variant={side === "no" ? "default" : "outline"}
            onClick={() => setSide("no")}
            className={`bg-red-500 text-white hover:bg-red-600 ${
              side === "no" ? "ring-2 ring-red-400" : ""
            }`}
          >
            No ₹{5}
          </Button>
        </div>
        <div className="space-y-4">
          <div>
            <label htmlFor="trade-price" className="block text-sm font-medium ">
              Price
            </label>
            <Input
              id="trade-price"
              type="number"
              value={tradePrice}
              onChange={(e) => setTradePrice(e.target.value)}
              className="mt-1 "
            />
            <p className="text-sm text-gray-400">0 qty available</p>
          </div>
          <div>
            <label
              htmlFor="trade-quantity"
              className="block text-sm font-medium "
            >
              Quantity
            </label>
            <Input
              id="trade-quantity"
              type="number"
              value={tradeQuantity}
              onChange={(e) => setTradeQuantity(e.target.value)}
              className="mt-1 "
            />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="text-lg font-bold">₹{5}</p>
              <p className="text-sm text-gray-400">You put</p>
            </div>
            <div>
              <p className="text-lg font-bold text-green-500">₹{5 + 5 - 3}</p>
              <p className="text-sm text-gray-400">You get</p>
            </div>
          </div>
          <Button
            onClick={handleTrade}
            className={`w-full text-white  ${
              side === "yes"
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-red-500 hover:bg-red-600"
            }`}
          >
            Place order
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default BidCard;
