"use client";

import { useState } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface Donation {
    id: string;
    amount: number;
    status: string;
    createdAt: Date;
    user: {
        name: string | null;
        email: string;
    };
}

export function DonationTable({ initialDonations }: { initialDonations: Donation[] }) {
    const [sortConfig, setSortConfig] = useState<{ key: keyof Donation | 'user', direction: 'asc' | 'desc' } | null>(null);

    const sortedDonations = [...initialDonations].sort((a, b) => {
        if (!sortConfig) return 0;

        let aValue: any = a[sortConfig.key as keyof Donation];
        let bValue: any = b[sortConfig.key as keyof Donation];

        if (sortConfig.key === 'user') {
            aValue = a.user.name || a.user.email;
            bValue = b.user.name || b.user.email;
        }

        if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    const handleSort = (key: keyof Donation | 'user') => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };

    const SortIcon = ({ columnKey }: { columnKey: string }) => {
        if (sortConfig?.key !== columnKey) return <div className="w-4 h-4" />;
        return sortConfig.direction === 'asc' ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />;
    };

    return (
        <div className="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                    <thead className="bg-gray-800/50 text-gray-400 uppercase select-none">
                        <tr>
                            <th className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition">Reference ID</th>
                            <th onClick={() => handleSort('user')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">User <SortIcon columnKey="user" /></div></th>
                            <th onClick={() => handleSort('amount')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Amount (₹) <SortIcon columnKey="amount" /></div></th>
                            <th onClick={() => handleSort('status')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Status <SortIcon columnKey="status" /></div></th>
                            <th onClick={() => handleSort('createdAt')} className="px-6 py-3 cursor-pointer hover:bg-gray-800 transition"><div className="flex items-center gap-2">Date <SortIcon columnKey="createdAt" /></div></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-800">
                        {sortedDonations.map((d) => (
                            <tr key={d.id} className="hover:bg-gray-800/30">
                                <td className="px-6 py-3 font-mono text-gray-500">{d.id.slice(0, 8)}...</td>
                                <td className="px-6 py-3">
                                    <div className="text-white font-medium">{d.user.name}</div>
                                    <div className="text-xs text-gray-500">{d.user.email}</div>
                                </td>
                                <td className="px-6 py-3 font-medium text-white">₹{d.amount.toFixed(2)}</td>
                                <td className="px-6 py-3">
                                    <span className={`px-2 py-1 rounded-full text-xs ${d.status === "SUCCESS" ? "bg-green-500/10 text-green-400" :
                                        d.status === "PENDING" ? "bg-yellow-500/10 text-yellow-400" :
                                            "bg-red-500/10 text-red-400"
                                        }`}>{d.status}</span>
                                </td>
                                <td className="px-6 py-3 text-gray-400">
                                    {new Date(d.createdAt).toLocaleString()}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
