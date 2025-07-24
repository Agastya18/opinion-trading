"use client";
import React, { useState, useEffect } from "react";
import { getEventDetails } from "@/actions/Event/getEventDetails";
import BidCard from "./BidCard";
import Orderbook from "./Orderbook";
import ProbabilityChart from "./ProbabilityChart";
import Overview from "./Overview";

interface OrderBookProps {
  eventId: string;
}

export default function TradePage({ eventId }: OrderBookProps) {
  const [title, setTitle] = useState("");

  useEffect(() => {
    async function fetchInitialData() {
      const eventData = await getEventDetails(eventId);
      setTitle(eventData.title);
    }
    fetchInitialData();
  }, [eventId]);

  return (
    <div className="min-h-screen p-10">
      <h1 className="text-3xl font-bold text-center mb-6 mt-1">{title}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Orderbook />
        <BidCard />
      </div>
      <ProbabilityChart />
      <Overview />
    </div>
  );
}
