import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminDonationsPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard/user");

    const donations = await prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/admin" className="p-2 hover:bg-gray-800 rounded-full transition">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Donation Management</h1>
                    <p className="text-gray-400">Track all donation records.</p>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-800/50 text-gray-400 uppercase">
                            <tr>
                                <th className="px-6 py-3">Reference ID</th>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Date</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {donations.map((d: any) => (
                                <tr key={d.id} className="hover:bg-gray-800/30">
                                    <td className="px-6 py-3 font-mono text-gray-500">{d.id.slice(0, 8)}...</td>
                                    <td className="px-6 py-3">
                                        <div className="text-white font-medium">{d.user.name}</div>
                                        <div className="text-xs text-gray-500">{d.user.email}</div>
                                    </td>
                                    <td className="px-6 py-3 font-medium text-white">${d.amount.toFixed(2)}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${d.status === "SUCCESS" ? "bg-green-500/10 text-green-400" :
                                            d.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" :
                                                "bg-red-500/10 text-red-400"
                                            }`}>{d.status}</span>
                                    </td>
                                    <td className="px-6 py-3 text-gray-400">
                                        {new Date(d.createdAt).toLocaleString()}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
