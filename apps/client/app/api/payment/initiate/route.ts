import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const response = await fetch(process.env.CASHFREE_URL!, {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "x-api-version": "2023-08-01",
        "x-client-id": process.env.CASHFREE_CLIENT_ID as string,
        "x-client-secret": process.env.CASHFREE_CLIENT_SECRET as string,
      },
      body: JSON.stringify({
        customer_details: {
          customer_id: body.customer_id,
          customer_phone: body.customer_phone,
        },
        order_id: body.order_id,
        order_amount: body.order_amount,
        order_currency: "INR",
        order_meta: {
          notify_url: process.env.CASHFREE_WEBHOOK_URL, // TODO: add a webhook
          payment_methods: "cc,dc,upi",
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        { message: data.message },
        { status: response.status }
      );
    }

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Something went wrong", error },
      { status: 500 }
    );
  }
}
