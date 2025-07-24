"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { cashfree } from "@/lib/cashfree";
import {toast} from "react-hot-toast"

const Page = () => {
  const [amount, setAmount] = useState<string>("");
  const [gst, setGst] = useState<number>(0);
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const paymentUrl = process.env.NEXT_PUBLIC_BASE_URL as string + 
                     process.env.NEXT_PUBLIC_PAYMENT_INITIATE_URL_ENDPOINT as string;
    
  useEffect(() => {
    const numAmount = parseFloat(amount);
    if (!isNaN(numAmount) && numAmount > 0) {
      setGst(numAmount * 0.219);
    } else {
      setGst(0);
    }
    setShowSummary(!isNaN(numAmount) && numAmount >= 5);
  }, [amount]);

  async function handleRechargeClick() {
    const res = await axios.post(paymentUrl, {
      order_id: "order_id_random" + Date.now(),
      customer_id: "customer_id_random" + Date.now(),
      customer_phone: "9876543210",
      order_amount: amount,
    });

    const checkoutOptions = {
      paymentSessionId: res.data.payment_session_id,
      returnUrl: process.env.BASE_URL,
    };
    cashfree.checkout(checkoutOptions).then(function (result: {
      error: string;
      redirect: string;
    }) {
      if (result.error) {
        toast.error("Error in depositing money! please try again")
      }
    });
  }

  return (
    <>
      <div className="flex flex-col px-4 sm:px-10 md:px-24 lg:px-56 py-10 gap-5">
        <div className="text-2xl sm:text-3xl font-bold">Deposit</div>
        <div className="flex flex-col lg:flex-row gap-5">
          {/* Deposit component */}
          <div className="bg-white border rounded-md p-5 w-full lg:w-2/3">
            <div className="font-bold mb-4">Deposit amount</div>
            <div>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="border border-blue-400 w-full rounded-md h-10 px-3"
              />
            </div>
            {!showSummary && (
              <div className="text-right text-red-500 text-xs">
                Please choose an amount ₹ 5 or above
              </div>
            )}
            <div className="flex gap-3 mt-5">
              <button
                onClick={() => setAmount("250")}
                className="border rounded font-bold text-xs px-3 py-1"
              >
                +250
              </button>
              <button
                onClick={() =>setAmount("500")}
                className="border rounded font-bold text-xs px-3 py-1"
              >
                +500
              </button>
              <button
                onClick={() => setAmount("1000")}
                className="border rounded font-bold text-xs px-3 py-1"
              >
                +1000
              </button>
            </div>
            <div className="mt-4">
              <button
                className={`${showSummary ? "bg-black" : "bg-gray-400"} text-white w-full rounded-md py-2 font-bold`}
                disabled={!showSummary}
                onClick={handleRechargeClick}
              >
                Recharge
              </button>
            </div>
          </div>

          {/* Summary component */}
          {showSummary && (
            <div className="w-full lg:w-1/3 max-w-md mx-auto rounded-lg overflow-hidden border">
              <div className="px-6 py-4">
                <h2 className="text-sm font-bold text-center text-gray-700 mb-4">
                  SUMMARY
                </h2>
                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Recharge amount</span>
                    <span className="font-semibold">
                      ₹{parseFloat(amount).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">GST applicable</span>
                    <span className="font-semibold text-red-500">
                      - ₹{gst.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Deposit bal. credit</span>
                    <span className="font-semibold">
                      ₹{(parseFloat(amount) - gst).toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">
                      Promotional bal. credit
                    </span>
                    <span className="font-semibold text-green-500">
                      + ₹{gst.toFixed(2)}
                    </span>
                  </div>
                  <div className="text-green-600 flex items-center">
                    <span className="mr-1">🎉</span>
                    <span>Recharge Cashback</span>
                  </div>
                </div>
              </div>
              <div className="bg-gray-100 px-6 py-4 text-xs border-t">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Net Balance</span>
                  <span className="font-bold">
                    ₹{parseFloat(amount).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Page;
