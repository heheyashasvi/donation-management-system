import Razorpay from "razorpay";

/**
 * Razorpay instance configuration.
 * Initialized with key_id and key_secret from environment variables.
 */
export const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
});
