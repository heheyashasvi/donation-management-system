import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Plus, Clock, CheckCircle, XCircle } from "lucide-react";

export default async function UserDashboard() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const donations = await prisma.donation.findMany({
        where: { userId: (session.user as any).id },
        orderBy: { createdAt: "desc" },
    });

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold">My Impact</h1>
                    <p className="text-gray-400">Track your contributions and history.</p>
                </div>
                <Link
                    href="/donate"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-medium transition flex items-center gap-2 w-fit shadow-lg shadow-blue-900/20"
                >
                    <Plus className="w-5 h-5" />
                    Make a Donation
                </Link>
            </div>

            <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50">
                    <h2 className="font-semibold">Donation History</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead className="text-sm text-gray-500 bg-gray-900/80 uppercase">
                            <tr>
                                <th className="px-6 py-4 font-medium">Date</th>
                                <th className="px-6 py-4 font-medium">Amount</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Reference</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {donations.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-gray-500">
                                        No donations yet. Start your journey today!
                                    </td>
                                </tr>
                            ) : (
                                donations.map((donation: any) => (
                                    <tr key={donation.id} className="hover:bg-gray-800/50 transition">
                                        <td className="px-6 py-4 text-gray-300">
                                            {new Date(donation.createdAt).toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric'
                                            })}
                                        </td>
                                        <td className="px-6 py-4 font-medium text-white">
                                            ₹{donation.amount.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${donation.status === "SUCCESS"
                                                ? "bg-green-500/10 text-green-400 border-green-500/20"
                                                : donation.status === "PENDING"
                                                    ? "bg-yellow-500/10 text-yellow-400 border-yellow-500/20"
                                                    : "bg-red-500/10 text-red-400 border-red-500/20"
                                                }`}>
                                                {donation.status === "SUCCESS" && <CheckCircle className="w-3 h-3" />}
                                                {donation.status === "PENDING" && <Clock className="w-3 h-3" />}
                                                {donation.status === "FAILED" && <XCircle className="w-3 h-3" />}
                                                {donation.status}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500 text-sm font-mono">
                                            {donation.id.slice(0, 8)}...
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
