import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import { User, Mail, Shield, Calendar, Heart } from "lucide-react";

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
        <div className="max-w-5xl mx-auto space-y-8">
            {/* Profile Header with Banner */}
            <div className="relative">
                <div className="h-48 rounded-3xl bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
                </div>

                <div className="absolute -bottom-12 left-8 md:left-12 flex items-end gap-6">
                    <div className="w-32 h-32 rounded-3xl bg-gray-950 p-2 shadow-xl ring-4 ring-gray-950/50">
                        <div className="w-full h-full bg-gray-900 rounded-2xl flex items-center justify-center text-4xl font-bold bg-gradient-to-br from-gray-800 to-gray-900 text-white">
                            {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                        </div>
                    </div>
                    <div className="mb-4 hidden md:block">
                        <h1 className="text-3xl font-bold text-white shadow-sm">{user.name || "User"}</h1>
                        <p className="text-purple-200 font-medium">{user.email}</p>
                    </div>
                </div>
            </div>

            <div className="pt-16 px-4 md:px-0 grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Left Column: Personal Info */}
                <div className="space-y-6">
                    <div className="md:hidden">
                        <h1 className="text-2xl font-bold text-white">{user.name || "User"}</h1>
                        <p className="text-gray-400">{user.email}</p>
                    </div>

                    <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6 space-y-6">
                        <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Account Details</h3>

                        <div className="space-y-4">
                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                                    <Shield className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Role</p>
                                    <p className="font-medium bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                        {user.role}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4 text-gray-300">
                                <div className="w-10 h-10 rounded-lg bg-gray-800 flex items-center justify-center text-gray-400">
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 uppercase font-bold">Member Since</p>
                                    <p className="font-medium text-white">
                                        {new Date(user.createdAt).toLocaleDateString('en-US', {
                                            month: 'long',
                                            year: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Impact & Stats */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-500">
                            <Heart className="w-64 h-64 text-pink-500 fill-current" />
                        </div>

                        <div className="relative z-10">
                            <h2 className="text-lg font-medium text-gray-400 mb-2">Total Impact</h2>
                            <div className="flex items-baseline gap-2">
                                <span className="text-5xl font-bold text-white tracking-tight">
                                    ₹{totalDonated.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                                </span>
                                <span className="text-green-400 text-sm font-medium bg-green-500/10 px-2 py-1 rounded-full">
                                    Extraordinary
                                </span>
                            </div>
                            <p className="mt-4 text-gray-400 max-w-lg">
                                Your contributions have directly supported our mission. Thank you for making a difference.
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <p className="text-sm text-gray-500 uppercase font-bold mb-2">Donations</p>
                            <p className="text-2xl font-bold text-white">{user.donations.length}</p>
                        </div>
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-6">
                            <p className="text-sm text-gray-500 uppercase font-bold mb-2">Average Donation</p>
                            <p className="text-2xl font-bold text-white">
                                ₹{user.donations.length > 0
                                    ? (totalDonated / user.donations.length).toFixed(0)
                                    : "0"
                                }
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
