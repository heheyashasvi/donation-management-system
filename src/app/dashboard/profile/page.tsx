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

    const totalDonated = user.donations.reduce((sum, d) =>
        d.status === "SUCCESS" ? sum + d.amount : sum, 0
    );

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-gray-400">Manage your personal information and view your journey.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Profile Card */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-gray-900 border border-gray-800 rounded-xl p-6">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center text-2xl font-bold">
                                {user.name?.[0]?.toUpperCase() || user.email[0].toUpperCase()}
                            </div>
                            <div>
                                <h2 className="text-xl font-semibold">{user.name || "User"}</h2>
                                <p className="text-gray-400">{user.email}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase font-medium flex items-center gap-2">
                                    <User className="w-3 h-3" /> Full Name
                                </label>
                                <p className="font-medium text-lg">{user.name || "Not set"}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase font-medium flex items-center gap-2">
                                    <Mail className="w-3 h-3" /> Email Address
                                </label>
                                <p className="font-medium text-lg">{user.email}</p>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase font-medium flex items-center gap-2">
                                    <Shield className="w-3 h-3" /> Account Role
                                </label>
                                <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-bold ${user.role === 'ADMIN' ? 'bg-purple-500/20 text-purple-400' : 'bg-blue-500/20 text-blue-400'
                                    }`}>
                                    {user.role}
                                </span>
                            </div>
                            <div className="space-y-1">
                                <label className="text-xs text-gray-500 uppercase font-medium flex items-center gap-2">
                                    <Calendar className="w-3 h-3" /> Member Since
                                </label>
                                <p className="font-medium text-lg">
                                    {new Date(user.createdAt).toLocaleDateString('en-US', {
                                        month: 'long',
                                        year: 'numeric'
                                    })}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Impact Card */}
                <div className="space-y-6">
                    <div className="bg-gradient-to-br from-purple-900/50 to-blue-900/50 border border-purple-500/20 rounded-xl p-6 relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Heart className="w-32 h-32" />
                        </div>
                        <h3 className="text-lg font-semibold mb-2">Total Impact</h3>
                        <p className="text-3xl font-bold text-white mb-1">₹{totalDonated.toFixed(2)}</p>
                        <p className="text-sm text-gray-300">Donated specifically by you to support our causes.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
