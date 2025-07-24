"use client";

import React, { useState } from "react";
import { PortfolioSummary } from "@/components/landing/Portfolio/PortfolioSummary";

const Page = () => {
  const [activeTab, setActiveTab] = useState<string>("active");
  const [returns, ] = useState<number>(-268.65);
  const [investment, ] = useState<number>(2096);
  const [todayReturns, ] = useState<number>(0);
  const [rank, ] = useState<number>(25750902);

  const trades = [
    {
      icon: "/assets/event1.png",
      question: "Centre to constitute the 8th Pay Commission?",
      investment: 10,
      returns: -10,
    },
    {
      icon: "/assets/event2.png",
      question:
        "Kane Williamson to announce his retirement from international T20 cricket?",
      investment: 10,
      returns: 2.33,
    },
    {
      icon: "/assets/event3.png",
      question:
        "Tesla to open their first showroom in India by the end of 2024?",
      investment: 10,
      returns: 11.73,
    },
    {
      icon: "/assets/event4.png",
      question: "Red Bull Racing to win the F1 Constructors Championship 2024?",
      investment: 10,
      returns: 5.86,
    },
  ];

  return (
    <>
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex justify-center mb-4 border-b">
          <button
            className={`px-4 py-2 ${activeTab === "active" ? "font-bold border-b-2 border-black" : ""}`}
            onClick={() => setActiveTab("active")}
          >
            Active trades
          </button>
          <button
            className={`px-4 py-2 ${activeTab === "closed" ? "font-bold border-b-2 border-black" : ""}`}
            onClick={() => setActiveTab("closed")}
          >
            Closed trades
          </button>
        </div>
        <PortfolioSummary
          returns={returns}
          investment={investment}
          todayReturns={todayReturns}
          rank={rank}
        />

        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-gray-100 text-sm font-semibold">
                <th className="px-4 py-4 text-left">Event</th>
                <th className="px-2 py-4 text-left sm:px-4">Investment</th>
                <th className="px-2 py-4 text-left sm:px-4">Returns</th>
                <th className="px-2 py-4 text-left sm:px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 bg-white rounded-lg">
              {trades.map((trade, index) => (
                <tr key={index} className="border-b">
                  <td className="px-4 py-6 flex items-center text-xs sm:text-sm">
                    <img src={trade.icon} alt="Icon" className="h-6 w-6 mr-2" />
                    <span className="line-clamp-2">{trade.question}</span>
                  </td>
                  <td className="px-2 py-6 sm:px-4">₹{trade.investment}</td>
                  <td
                    className={`px-2 py-6 sm:px-4 ${trade.returns >= 0 ? "text-green-500" : "text-red-500"}`}
                  >
                    ₹{trade.returns}
                  </td>
                  <td className="px-2 py-6 sm:px-4">
                    <button
                      onClick={() => {}}
                      className="border px-3 py-1 rounded-full text-xs"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Page;
