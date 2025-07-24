"use client";
import { useState } from "react";

const Page = () => {
  const [amount, setAmount] = useState<number>(0);
  const [account, setAccount] = useState<string>("");
  return (
    <>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-1/2 mx-auto mt-10 px-4 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-bold mb-6">Withdraw</h1>
        <div className="bg-white shadow-md rounded-lg p-6">
          <div className="mb-4">
            <label
              htmlFor="amount"
              className="block text-sm font-bold mb-1"
            >
              Withdraw amount
            </label>
            <div className="relative">
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="border border-blue-400 w-full rounded-md h-10 px-3"
              />
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className="text-gray-500 pr-5">₹{amount}</span>
              </div>
            </div>
            <p className="text-xs text-right mt-1">
              Gateway charges are flat ₹5
            </p>
          </div>

          <div className="mb-6">
            <label
              htmlFor="account"
              className="block text-sm font-bold mb-1"
            >
              Withdraw account
            </label>
            <input
              type="text"
              id="account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="border w-full rounded-md h-10 px-3"
            />
          </div>

          <button
            className={`${amount >= 5 ? "bg-black" : "bg-gray-400"} text-white w-full rounded-md py-2 font-bold`}
            disabled={amount < 5}
          >
            Recharge
          </button>
        </div>
      </div>
    </>
  );
};

export default Page;
