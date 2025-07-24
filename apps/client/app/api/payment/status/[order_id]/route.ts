import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { order_id: string } }
) {
  const { order_id } = params;
  const response = await fetch(process.env.CASHFREE_URL + order_id, {
    method: "GET",
    headers: {
      accept: "application/json",
      "content-type": "application/json",
      "x-api-version": "2023-08-01",
      "x-client-id": process.env.CASHFREE_CLIENT_ID as string,
      "x-client-secret": process.env.CASHFREE_CLIENT_SECRET as string,
    },
  });
  const data = await response.json();
  if (data.order_status === "PAID") {
    return NextResponse.redirect(new URL("/", req.url));
  } else {
    return NextResponse.redirect(new URL("/404", req.url));
  }
}
