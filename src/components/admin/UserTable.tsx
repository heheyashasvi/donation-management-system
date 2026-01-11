"use client";

import { useState } from "react";
import { Download, Search, ChevronUp, ChevronDown } from "lucide-react";

interface User {
    id: string;
    name: string | null;
    email: string;
    role: string;
    createdAt: Date;
    totalDonated: number;
    _count: {
        donations: number;
    };
}

export function UserTable({ initialUsers }: { initialUsers: User[] }) {
    const [search, setSearch] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [sortConfig, setSortConfig] = useState<{ key: keyof User | 'donationsCount', direction: 'asc' | 'desc' } | null>(null);

    const filteredUsers = initialUsers.filter((user) => {
        const matchesSearch = (user.name?.toLowerCase() || "").includes(search.toLowerCase()) ||
            user.email.toLowerCase().includes(search.toLowerCase());
        const matchesRole = roleFilter === "ALL" || user.role === roleFilter;
        return matchesSearch && matchesRole;
    });

    const sortedUsers = [...filteredUsers].sort((a, b) => {
        if (!sortConfig) return 0;

        let aValue: any = a[sortConfig.key as keyof User];
        let bValue: any = b[sortConfig.key as keyof User];

        if (sortConfig.key === 'donationsCount') {
            aValue = a._count.donations;
            bValue = b._count.donations;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof User | 'donationsCount') => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const handleExport = () => {
        const headers = ["ID,Name,Email,Role,Joined,Donations,Total Donated"];
        const rows = sortedUsers.map(u =>
            `${u.id},"${u.name || ''}",${u.email},${u.role},${new Date(u.createdAt).toISOString()},${u._count.donations},${u.totalDonated}`
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

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (sortConfig?.key !== columnKey) return <div className="w-4 h-4" />;
        return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
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
                        <thead className="bg-gray-800/50 text-gray-400 uppercase select-none">
                            <tr>
                                <th onClick={() => handleSort('name')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Name <SortIcon columnKey="name" /></div></th>
                                <th onClick={() => handleSort('email')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Email <SortIcon columnKey="email" /></div></th>
                                <th onClick={() => handleSort('role')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Role <SortIcon columnKey="role" /></div></th>
                                <th onClick={() => handleSort('createdAt')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Joined <SortIcon columnKey="createdAt" /></div></th>
                                <th onClick={() => handleSort('donationsCount')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Donations <SortIcon columnKey="donationsCount" /></div></th>
                                <th onClick={() => handleSort('totalDonated')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Total (₹) <SortIcon columnKey="totalDonated" /></div></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-800">
                            {sortedUsers.length > 0 ? (
                                sortedUsers.map((u) => (
                                    <tr key={u.id} className="hover:bg-gray-800/30">
                                        <td className="px-6 py-3 font-medium text-white">{u.name || "N/A"}</td>
                                        <td className="px-6 py-3 text-gray-300">{u.email}</td>
                                        <td className="px-6 py-3">
                                            <span className={`px-2 py-1 rounded-full text-xs ${u.role === "ADMIN" ? "bg-purple-500/10 text-purple-400" : "bg-gray-700 text-gray-300"
                                                }`}>{u.role}</span>
                                        </td>
                                        <td className="px-6 py-3 text-gray-400">{new Date(u.createdAt).toLocaleDateString()}</td>
                                        <td className="px-6 py-3 text-gray-400">{u._count.donations}</td>
                                        <td className="px-6 py-3 text-green-400 font-medium">₹{u.totalDonated.toFixed(2)}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500">
                                        No users found matching filters
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="text-sm text-gray-500">
                Showing {sortedUsers.length} of {initialUsers.length} users
            </div>
        </div>
    );
}
