import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-08-27.basil",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const subscriptionId = body.subscriptionId;

    if (!subscriptionId) {
      return NextResponse.json(
        { error: "Missing subscription ID" },
        { status: 400 }
      );
    }

    await stripe.subscriptions.cancel(subscriptionId);

    return NextResponse.json({
      success: true,
      message: "Subscription cancelled successfully",
    });
  } catch (error) {
    console.error("Cancel subscription error:", error);

    return NextResponse.json(
      { error: "Failed to cancel subscription" },
      { status: 500 }
    );
  }
}