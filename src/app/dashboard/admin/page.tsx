import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Users, DollarSign, Activity } from "lucide-react";

export default async function AdminDashboard() {
    const session = await getServerSession(authOptions);

    if (!session || (session.user as any).role !== "ADMIN") {
        redirect("/dashboard/user");
    }

    const [
        totalUsers,
        totalDonations,
        recentDonations,
        users
    ] = await Promise.all([
        prisma.user.count(),
        prisma.donation.aggregate({
            _sum: { amount: true },
            where: { status: "SUCCESS" }
        }),
        prisma.donation.findMany({
            take: 5,
            orderBy: { createdAt: "desc" },
            include: { user: true }
        }),
        prisma.user.findMany({
            take: 5,
            orderBy: { createdAt: "desc" }
        })
    ]);

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Admin Dashboard</h1>
                <p className="text-gray-400">Overview of platform activity.</p>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-4 bg-purple-500/10 rounded-lg text-purple-400">
                        <Users className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Total Users</p>
                        <p className="text-2xl font-bold">{totalUsers}</p>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-4 bg-green-500/10 rounded-lg text-green-400">
                        <DollarSign className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Total Donations</p>
                        <p className="text-2xl font-bold">₹{totalDonations._sum.amount?.toFixed(2) || "0.00"}</p>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 p-6 rounded-xl flex items-center gap-4">
                    <div className="p-4 bg-blue-500/10 rounded-lg text-blue-400">
                        <Activity className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-gray-400 text-sm">Active Sessions</p>
                        <p className="text-2xl font-bold">--</p>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Recent Donations */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
                        <h2 className="font-semibold">Recent Donations</h2>
                        <Link href="/dashboard/admin/donations" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-800/50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Amount</th>
                                <th className="px-6 py-3">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {recentDonations.map((d: any) => (
                                <tr key={d.id} className="hover:bg-gray-800/30">
                                    <td className="px-6 py-3">{d.user.name || d.user.email}</td>
                                    <td className="px-6 py-3 font-medium">₹{d.amount}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${d.status === "SUCCESS" ? "bg-green-500/10 text-green-400" :
                                            d.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" :
                                                "bg-red-500/10 text-red-400"
                                            }`}>{d.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Recent Users */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-800 bg-gray-900/50 flex justify-between items-center">
                        <h2 className="font-semibold">Recent Users</h2>
                        <Link href="/dashboard/admin/users" className="text-sm text-blue-400 hover:text-blue-300">View All</Link>
                    </div>
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-800/50 text-gray-500 uppercase">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {users.map((u: any) => (
                                <tr key={u.id} className="hover:bg-gray-800/30">
                                    <td className="px-6 py-3">{u.name || "N/A"}</td>
                                    <td className="px-6 py-3 text-gray-400">{u.email}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${u.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-gray-700 text-gray-300"
                                            }`}>{u.role}</span>
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
