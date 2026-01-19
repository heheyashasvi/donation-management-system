import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

export async function POST(req: Request) {
    try {
        const { orderId, paymentId, signature } = await req.json();

        const body = orderId + "|" + paymentId;

        const expectedSignature = crypto
            .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
            .update(body.toString())
            .digest("hex");

        if (expectedSignature === signature) {
            // Payment verified
            await prisma.donation.updateMany({
                where: { stripeSessionId: orderId }, // We stored orderId here
                data: { status: "SUCCESS" },
            });

            return NextResponse.json({ message: "Verification successful", success: true });
        } else {
            return NextResponse.json({ message: "Invalid signature", success: false }, { status: 400 });
        }
    } catch (error: any) {
        console.error("Razorpay Verification Error:", error);
        return NextResponse.json({ message: error.message }, { status: 500 });
    }
}
