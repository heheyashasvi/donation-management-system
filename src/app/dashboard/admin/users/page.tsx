import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default async function AdminUsersPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard/user");

    const users = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: { _count: { select: { donations: true } } }
    });

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/admin" className="p-2 hover:bg-gray-800 rounded-full transition">
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">User Management</h1>
                    <p className="text-gray-400">View and manage registered users.</p>
                </div>
            </div>

            <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-gray-800/50 text-gray-400 uppercase">
                            <tr>
                                <th className="px-6 py-3">Name</th>
                                <th className="px-6 py-3">Email</th>
                                <th className="px-6 py-3">Role</th>
                                <th className="px-6 py-3">Joined</th>
                                <th className="px-6 py-3">Donations</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {users.map((u: any) => (
                                <tr key={u.id} className="hover:bg-gray-800/30">
                                    <td className="px-6 py-3 font-medium text-white">{u.name}</td>
                                    <td className="px-6 py-3 text-gray-300">{u.email}</td>
                                    <td className="px-6 py-3">
                                        <span className={`px-2 py-1 rounded-full text-xs ${u.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-gray-700 text-gray-300"
                                            }`}>{u.role}</span>
                                    </td>
                                    <td className="px-6 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                    <td className="px-6 py-3 text-gray-400">{u._count.donations}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
