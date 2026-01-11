import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { DonationTable } from "@/components/admin/DonationTable";

export default async function AdminDonationsPage() {
    const session = await getServerSession(authOptions);
    if (!session || (session.user as any).role !== "ADMIN") redirect("/dashboard/user");

    const donations = await prisma.donation.findMany({
        orderBy: { createdAt: "desc" },
        include: { user: true }
    });

    const totalAmount = donations.reduce((sum: number, d: any) =>
        d.status === "SUCCESS" ? sum + d.amount : sum, 0
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                    <Link href="/dashboard/admin" className="p-2 hover:bg-gray-800 rounded-full transition">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold">Donation Management</h1>
                        <p className="text-gray-400">Track all donation records.</p>
                    </div>
                </div>

                <div className="bg-gray-900 border border-gray-800 px-6 py-4 rounded-xl flex items-center gap-4">
                    <div className="text-sm text-gray-400 uppercase font-medium">Total Collected</div>
                    <div className="text-2xl font-bold text-green-400">
                        ₹{totalAmount.toFixed(2)}
                    </div>
                </div>
            </div>

            <DonationTable initialDonations={donations} />
        </div>
    );
}
