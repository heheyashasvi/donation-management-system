import { NextResponse } from "next/server";
import { razorpay } from "@/lib/razorpay";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
        }

        const { amount: rawAmount } = await req.json();
        const amount = parseFloat(rawAmount);

        if (isNaN(amount) || amount <= 0) {
            return NextResponse.json({ message: "Invalid amount" }, { status: 400 });
        }

        console.log("Initiating donation:", { amount, userId: (session.user as any).id });

        // Create pending donation
        const donation = await prisma.donation.create({
            data: {
                amount: amount,
                userId: (session.user as any).id,
                status: "PENDING",
                currency: "INR",
            },
        });

        const options = {
            amount: Math.round(amount * 100), // Razorpay works in paise, ensures integer
            currency: "INR",
            receipt: donation.id,
        };

        console.log("Razorpay options:", options);
        const order = await razorpay.orders.create(options);

        // Update donation with order ID (using stripeSessionId field for now or adding a new field? 
        // We'll reuse stripeSessionId to store the order ID for simplicity to avoid migration complexity in this quick switch, 
        // or effectively treat it as a "paymentReferenceId")
        await prisma.donation.update({
            where: { id: donation.id },
            data: { stripeSessionId: order.id },
        });

        return NextResponse.json({ orderId: order.id, donationId: donation.id });
    } catch (error: any) {
        console.error("Razorpay Order Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
