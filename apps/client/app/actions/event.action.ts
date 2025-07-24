"use server";

import prisma from "@repo/db/client";

import { withServerActionAsyncCatcher } from "@/lib/async-catch";
import { ServerActionReturnType } from "../types/api";
import { ErrorHandler } from "@/lib/error";

import { SuccessResponse } from "@/lib/success";

export const getEvents = withServerActionAsyncCatcher<
  null,
  ServerActionReturnType
>(async () => {
  const events = await prisma.event.findMany({
    select: {
      eventId: true,
      title: true,
      slug: true,
      quantity: true,
    },
  });
  if (!events) {
    throw new ErrorHandler("No events found", "NOT_FOUND");
  }

  return new SuccessResponse(
    "Events fetched successfully",
    200,
    events
  ).serialize();
});
