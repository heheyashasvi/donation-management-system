import Link from "next/link";
import LogoutButton from "@/components/LogoutButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { LayoutDashboard, LogOut, Shield, Heart, User } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="min-h-screen bg-gray-950 text-white flex flex-col">
            <nav className="border-b border-gray-800 bg-gray-900 sticky top-0 z-40">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="flex items-center gap-8">
                        <Link href="/" className="text-xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                            HopeConnect
                        </Link>
                        <div className="space-x-4 text-sm text-gray-400">
                            <Link href="/dashboard/user" className="hover:text-white transition">My Dashboard</Link>
                            <Link href="/dashboard/profile" className="hover:text-white transition">Profile</Link>
                            {(session.user as any).role === "ADMIN" && (
                                <Link href="/dashboard/admin" className="hover:text-white transition">Admin Panel</Link>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="text-sm font-medium">
                            {session.user?.name} <span className="text-gray-500">({(session.user as any).role})</span>
                        </div>
                        <LogoutButton />
                    </div>
                </div>
            </nav>
            <main className="flex-1 container mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
