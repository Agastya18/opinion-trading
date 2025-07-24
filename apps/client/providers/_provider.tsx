"use client";
import React from "react";
import { SessionProviders } from "./session-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

export const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SessionProviders>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </SessionProviders>
    </>
  );
};
