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

        const { amount } = await req.json();

        // Create pending donation
        const donation = await prisma.donation.create({
            data: {
                amount: parseFloat(amount),
                userId: (session.user as any).id,
                status: "PENDING",
                currency: "INR",
            },
        });

        const options = {
            amount: amount * 100, // Razorpay works in paise
            currency: "INR",
            receipt: donation.id,
        };

        const order = await razorpay.orders.create(options);

        // Update donation with order ID
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
