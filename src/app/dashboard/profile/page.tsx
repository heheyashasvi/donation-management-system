import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Calendar } from "lucide-react";

export default async function ProfilePage() {
    const session = await getServerSession(authOptions);
    if (!session) redirect("/login");

    const user = await prisma.user.findUnique({
        where: { id: (session.user as any).id },
        include: {
            donations: {
                select: { amount: true, status: true }
            }
        }
    });

    if (!user) redirect("/login");

    const totalDonated = user.donations.reduce((sum: number, d: any) =>
        d.status === "SUCCESS" ? sum + d.amount : sum, 0
    );

    return (
        <div className="h-full w-full space-y-6">
            {/* Header Section */}
            <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col md:flex-row items-center gap-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-indigo-600/10"></div>

                <div className="w-32 h-32 shrink-0 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 p-1 relative z-10 shadow-2xl">
                    <div className="w-full h-full rounded-full bg-gray-950 flex items-center justify-center text-4xl font-bold text-white">
                        {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                    </div>
                </div>

                <div className="text-center md:text-left relative z-10 flex-1">
                    <h1 className="text-4xl font-bold text-white mb-2">{user.name || "User"}</h1>
                    <p className="text-xl text-gray-400 font-light">{user.email}</p>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mt-4">
                        <span className="bg-gray-800/50 border border-gray-700 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Shield className="w-4 h-4 text-purple-400" /> {user.role}
                        </span>
                        <span className="bg-gray-800/50 border border-gray-700 px-4 py-1.5 rounded-full text-sm font-medium text-gray-300 flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-blue-400" /> Joined {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                </div>

                <div className="relative z-10 shrink-0">
                    <div className="text-center md:text-right bg-gray-950/50 p-6 rounded-2xl border border-gray-800/50 backdrop-blur-sm">
                        <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Total Impact</p>
                        <p className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">
                            ₹{totalDonated.toLocaleString('en-IN')}
                        </p>
                    </div>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-full">
                {/* Impact Card */}
                <div className="md:col-span-2 bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <div className="relative z-10">
                        <h3 className="text-2xl font-bold text-white mb-4">Your Contribution Journey</h3>
                        <p className="text-gray-400 max-w-2xl text-lg leading-relaxed">
                            Every rupee you donate helps us bring light to someone's life. Your consistent support is what drives our mission forward.
                        </p>
                    </div>

                    <div className="relative z-10 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                            <p className="text-gray-500 text-sm mb-1">Donations</p>
                            <p className="text-2xl font-bold text-white">{user.donations.length}</p>
                        </div>
                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                            <p className="text-gray-500 text-sm mb-1">Average</p>
                            <p className="text-2xl font-bold text-white">₹{(totalDonated / (user.donations.length || 1)).toFixed(0)}</p>
                        </div>
                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                            <p className="text-gray-500 text-sm mb-1">Status</p>
                            <p className="text-2xl font-bold text-green-400">Active</p>
                        </div>
                        <div className="bg-gray-950/50 p-4 rounded-2xl border border-gray-800">
                            <p className="text-gray-500 text-sm mb-1">Next Goal</p>
                            <p className="text-2xl font-bold text-purple-400">Bronze</p>
                        </div>
                    </div>
                </div>

                {/* Profile Details (Redundant but fills space nicely as quick stats) */}
                <div className="bg-gray-900 border border-gray-800 rounded-3xl p-8 flex flex-col justify-center relative overflow-hidden">
                    <div className="space-y-6 relative z-10">
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Account ID</p>
                            <p className="font-mono text-gray-300 truncate bg-gray-950 p-3 rounded-lg border border-gray-800 text-sm">
                                {user.id}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 uppercase tracking-widest mb-2">Email Status</p>
                            <div className="flex items-center gap-2 text-green-400 bg-green-900/10 p-3 rounded-lg border border-green-900/20 w-fit px-4">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
                                <span className="font-medium">Verified</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

