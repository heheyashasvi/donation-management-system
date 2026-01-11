import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { UserTable } from "@/components/admin/UserTable";

export default async function AdminUsersPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard/user");

    const rawUsers = await prisma.user.findMany({
        orderBy: { createdAt: "desc" },
        include: {
            _count: { select: { donations: true } },
            donations: {
                select: { amount: true, status: true }
            }
        }
    });

    const users = rawUsers.map((u: any) => ({
        ...u,
        totalDonated: u.donations.reduce((sum: number, d: any) => d.status === "SUCCESS" ? sum + d.amount : sum, 0)
    }));

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

            <UserTable initialUsers={users} />
        </div>
    );
}
