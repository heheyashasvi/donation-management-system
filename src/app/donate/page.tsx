"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Heart, DollarSign, Wallet } from "lucide-react";
import Script from "next/script";

export default function DonatePage() {
    const { data: session } = useSession();
    const router = useRouter();
    const [amount, setAmount] = useState<string>("10");
    const [customAmount, setCustomAmount] = useState<string>("");
    const [loading, setLoading] = useState(false);

    const presetAmounts = [10, 25, 50, 100];

    const handleDonate = async () => {
        const donationAmount = customAmount ? parseFloat(customAmount) : parseFloat(amount);

        if (!donationAmount || donationAmount <= 0) {
            alert("Please enter a valid amount");
            return;
        }

        setLoading(true);

        try {
            // 1. Create Order
            const response = await fetch("/api/razorpay/order", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ amount: donationAmount }),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Something went wrong");
            }

            // 2. Open Razorpay Modal
            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_S2YJfLIFmubmfY", // Use env var in real app
                amount: data.amount,
                currency: "INR",
                name: "HopeConnect",
                description: "Donation",
                order_id: data.orderId,
                handler: async function (response: any) {
                    // 3. Verify Payment
                    const verifyRes = await fetch("/api/razorpay/verify", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            orderId: response.razorpay_order_id,
                            paymentId: response.razorpay_payment_id,
                            signature: response.razorpay_signature,
                        }),
                    });

                    const verifyData = await verifyRes.json();

                    if (verifyData.success) {
                        router.push("/dashboard/user");
                    } else {
                        alert("Payment verification failed");
                    }
                },
                prefill: {
                    name: session?.user?.name,
                    email: session?.user?.email,
                },
                theme: {
                    color: "#8b5cf6",
                },
            };

            const rzp = new (window as any).Razorpay(options);
            rzp.open();

        } catch (error: any) {
            console.error("Donation Error:", error);
            alert("Failed to initiate donation");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white p-8 pt-24">
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Make a Difference
                    </h1>
                    <p className="text-gray-400">Your contribution helps us change lives.</p>
                </div>

                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 space-y-8">
                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-400">Select Amount (INR)</label>
                        <div className="grid grid-cols-4 gap-4">
                            {presetAmounts.map((amt) => (
                                <button
                                    key={amt}
                                    onClick={() => {
                                        setAmount(amt.toString());
                                        setCustomAmount("");
                                    }}
                                    className={`p-4 rounded-xl border transition-all ${amount === amt.toString() && !customAmount
                                        ? "bg-purple-500/20 border-purple-500 text-purple-400"
                                        : "bg-gray-800 border-gray-700 hover:border-gray-600"
                                        }`}
                                >
                                    ₹{amt}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-sm font-medium text-gray-400">Or Enter Custom Amount</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-gray-400">
                                <DollarSign className="w-5 h-5" />
                            </div>
                            <input
                                type="number"
                                value={customAmount}
                                onChange={(e) => setCustomAmount(e.target.value)}
                                placeholder="Enter amount"
                                className="w-full bg-gray-950 border border-gray-800 rounded-xl py-4 pl-12 pr-4 focus:outline-none focus:border-purple-500 transition-colors"
                            />
                        </div>
                    </div>

                    <button
                        onClick={handleDonate}
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-500 hover:to-pink-500 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 group disabled:opacity-50"
                    >
                        {loading ? "Processing..." : (
                            <>
                                <Heart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                                Donate Now
                            </>
                        )}
                    </button>
                    <div className="text-center text-xs text-gray-500 flex flex-col items-center justify-center gap-2 mt-6">
                        <div className="flex items-center gap-2">
                            <Wallet className="w-4 h-4" /> Secure payment powered by Razorpay
                        </div>
                        <p>This is a test mode transaction.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
