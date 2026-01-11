"use client";

import { useState } from "react";
import { Download, Search } from "lucide-react";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: Date;
    _count: {
        donations: number;
    };
}

export function UserTable({ initialUsers }: { initialUsers: User[] }) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");

    const filteredUsers = initialUsers.filter((user) => {
        const matchesSearch = (user.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const handleExport = () => {
        const headers = ["ID,Name,Email,Role,Joined,Donations"];
        const rows = filteredUsers.map(u =>
            `${u.id},"${u.name || ''}",${u.email},${u.role},${new Date(u.createdAt).toISOString()},${u._count.donations}`
        );

        const csvContent = "data:text/csv;charset=utf-8," + headers.concat(rows).join("\n");
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", "users_export.csv");
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div className="space-y-4">
            <div className="flex gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search by name or email..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="w-full bg-gray-900 border border-gray-800 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:border-purple-500"
                    />
                </div>
                <select
                    value={roleFilter}
                    onChange={(e) => setRoleFilter(e.target.value)}
                    className="bg-gray-900 border border-gray-800 rounded-lg px-4 py-2 focus:outline-none focus:border-purple-500 appearance-none"
                >
                    <option value="ALL">All Roles</option>
                    <option value="USER">User</option>
                    <option value="ADMIN">Admin</option>
                </select>
                <button
                    onClick={handleExport}
                    className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition"
                >
                    <Download className="w-4 h-4" /> Export CSV
                </button>
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
                            {filteredUsers.length > 0 ? (
                                filteredUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-800/30">
                                        <td className="px-6 py-3 font-medium text-white">{u.name || "N/A"}</td>
                                        <td className="px-6 py-3 text-gray-300">{u.email}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${u.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-gray-700 text-gray-300"
                                                }`}>{u.role}</span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-gray-400">{u._count.donations}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                                        No users found matching "{search}"
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="text-sm text-gray-500">
                Showing {filteredUsers.length} of {initialUsers.length} users
            </div>
        </div>
    );
}
