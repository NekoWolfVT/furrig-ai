import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

const prices: Record<string, string> = {
  creator: "price_1TYpkVDZxPWqYK8gLJX8mYt8",
  pro: "price_1TYpkuDZxPWqYK8gh8zG7Zjr",
  enterprise: "price_1TYplNDZxPWqYK8gbsZ2fF7g"
};

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const plan = body.plan;

    const price = prices[plan];

    if (!price) {
      return NextResponse.json(
        { error: "Invalid plan" },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",

      payment_method_types: ["card"],

      line_items: [
        {
          price,
          quantity: 1,
        },
      ],

      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    return NextResponse.json({
      url: session.url,
    });
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Stripe checkout failed" },
      { status: 500 }
    );
  }
}