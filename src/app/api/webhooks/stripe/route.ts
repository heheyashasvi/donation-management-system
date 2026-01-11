import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import Stripe from "stripe";

export async function POST(req: Request) {
    const body = await req.text();
    const headerStore = await headers();
    const signature = headerStore.get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        );
    } catch (error: any) {
        return NextResponse.json(
            { message: `Webhook Error: ${error.message}` },
            { status: 400 }
        );
    }

    try {
        if (event.type === "checkout.session.completed") {
            const session = event.data.object as Stripe.Checkout.Session;

            const donationId = session.metadata?.donationId;

            if (donationId) {
                await prisma.donation.update({
                    where: { id: donationId },
                    data: { status: "SUCCESS" },
                });
                console.log(`Donation ${donationId} marked as SUCCESS`);
            }
        }

        return NextResponse.json({ received: true });
    } catch (error) {
        console.error("Webhook handler error:", error);
        return NextResponse.json(
            { message: "Webhook handler failed" },
            { status: 500 }
        );
    }
}
