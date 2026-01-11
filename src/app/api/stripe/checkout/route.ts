import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { stripe } from "@/lib/stripe";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);

        if (!session) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { amount } = await req.json();

        if (!amount || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        const userId = (session.user as any).id;

        // Create Donation record first (Pending)
        const donation = await prisma.donation.create({
            data: {
                amount: parseFloat(amount),
                userId: userId,
                status: "PENDING",
            },
        });

        // Create Stripe Checkout Session
        const stripeSession = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: [
                {
                    price_data: {
                        currency: "usd",
                        product_data: {
                            name: "Donation to HopeConnect",
                        },
                        unit_amount: Math.round(amount * 100), // cents
                    },
                    quantity: 1,
                },
            ],
            mode: "payment",
            success_url: `${process.env.NEXTAUTH_URL}/dashboard/user?success=true`,
            cancel_url: `${process.env.NEXTAUTH_URL}/donate?canceled=true`,
            metadata: {
                donationId: donation.id,
                userId: userId,
            },
            customer_email: session.user?.email || undefined,
        });

        // Update donation with stripe session ID for tracking (optional but good)
        await prisma.donation.update({
            where: { id: donation.id },
            data: { stripeSessionId: stripeSession.id },
        });

        return NextResponse.json({ url: stripeSession.url });
    } catch (error: any) {
        console.error("Stripe Checkout Error:", error);
        return NextResponse.json(
            { message: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}
