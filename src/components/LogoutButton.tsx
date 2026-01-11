"use client";

import { signOut } from "next-auth/react";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
    return (
        <button
            onClick={() => signOut({ callbackUrl: "/" })}
            className="flex items-center gap-2 text-red-400 hover:text-red-300 transition px-3 py-2 rounded-md hover:bg-red-500/10"
        >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
        </button>
    );
}
