import Link from "next/link";
import { ArrowRight, Heart, Shield, Globe } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Navbar */}
            <nav className="border-b border-gray-800 backdrop-blur-md bg-gray-950/80 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                        HopeConnect
                    </div>
                    <div className="space-x-4">
                        <Link href="/login" className="text-gray-300 hover:text-white transition">
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-blue-600 hover:bg-blue-700 px-5 py-2 rounded-full font-medium transition"
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative pt-32 pb-20 px-6">
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-gray-950 to-gray-950" />
                <div className="container mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
                        Empower Change <br />
                        <span className="text-blue-500">One Donation at a Time</span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
                        Join our global community of changemakers. Your support brings transparency, hope, and real impact to those in need.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link
                            href="/register"
                            className="px-8 py-4 bg-blue-600 rounded-full font-bold text-lg hover:bg-blue-700 transition flex items-center justify-center gap-2"
                        >
                            Start Donating <ArrowRight className="w-5 h-5" />
                        </Link>
                        <Link
                            href="/login"
                            className="px-8 py-4 bg-gray-800 rounded-full font-bold text-lg hover:bg-gray-700 transition border border-gray-700"
                        >
                            View Impact
                        </Link>
                    </div>
                </div>
            </section>

            {/* Features */}
            <section className="py-20 px-6 bg-gray-900/50">
                <div className="container mx-auto grid md:grid-cols-3 gap-8">
                    <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition">
                        <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-6">
                            <Heart className="w-6 h-6 text-blue-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Meaningful Impact</h3>
                        <p className="text-gray-400">
                            Directly support causes that matter. Every localized effort contributes to global change.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition">
                        <div className="w-12 h-12 bg-green-500/10 rounded-lg flex items-center justify-center mb-6">
                            <Shield className="w-6 h-6 text-green-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Transparent & Secure</h3>
                        <p className="text-gray-400">
                            Track your donations with real-time updates. We prioritize data integrity and security.
                        </p>
                    </div>
                    <div className="p-8 rounded-2xl bg-gray-900 border border-gray-800 hover:border-gray-700 transition">
                        <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center mb-6">
                            <Globe className="w-6 h-6 text-purple-500" />
                        </div>
                        <h3 className="text-xl font-bold mb-3">Global Community</h3>
                        <p className="text-gray-400">
                            Connect with donors worldwide. Share stories and be part of a movement for good.
                        </p>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-800 py-12 px-6 bg-gray-950">
                <div className="container mx-auto text-center text-gray-500">
                    <p>© 2024 HopeConnect. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
}
