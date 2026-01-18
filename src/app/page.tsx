import Link from "next/link";
import { ArrowRight, Heart, Shield, Globe, Users, HandHeart, Sparkles } from "lucide-react";

export default function Home() {
    return (
        <div className="min-h-screen bg-gray-950 text-white selection:bg-rose-500/30">
            {/* Navbar */}
            <nav className="border-b border-white/5 backdrop-blur-xl bg-gray-950/70 sticky top-0 z-50">
                <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                    <div className="text-2xl font-bold tracking-tight">
                        <span className="text-rose-500">Hope</span>Connect
                    </div>
                    <div className="flex items-center gap-6">
                        <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link
                            href="/register"
                            className="bg-rose-600 hover:bg-rose-700 text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg shadow-rose-600/20"
                        >
                            Join Our Mission
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex items-center overflow-hidden">
                {/* Background Image with Overlay */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="file:///C:/Users/kamal/.gemini/antigravity/brain/9e07113a-cc5d-427a-8a9e-f4e73017fcde/ngo_hero_child_1768777845890.png"
                        alt="Smiling child with book"
                        className="w-full h-full object-cover opacity-40"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-950 via-gray-950/60 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-r from-gray-950 via-transparent to-transparent" />
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="max-w-3xl space-y-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold uppercase tracking-widest">
                            <Sparkles className="w-3 h-3" /> Because every child matters
                        </div>
                        <h1 className="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight">
                            Your Small Act is <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-orange-400">
                                Their Big Hope.
                            </span>
                        </h1>
                        <p className="text-xl text-gray-300 font-light leading-relaxed max-w-xl">
                            At HopeConnect, we believe a single donation can flip the script on a child's future. Join us in bringing smiles and education to communities that need it most.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-5">
                            <Link
                                href="/register"
                                className="px-10 py-5 bg-rose-600 rounded-2xl font-bold text-lg hover:bg-rose-500 transition-all flex items-center justify-center gap-2 group shadow-2xl shadow-rose-600/20"
                            >
                                Make a Difference <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link
                                href="/login"
                                className="px-10 py-5 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all flex items-center justify-center"
                            >
                                See Our Stories
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Impact Pill */}
                <div className="absolute bottom-10 right-10 hidden lg:block">
                    <div className="bg-gray-900/80 backdrop-blur-xl border border-white/10 p-6 rounded-3xl shadow-2xl space-y-1">
                        <p className="text-rose-400 font-bold text-3xl">12,400+</p>
                        <p className="text-gray-400 text-sm font-medium">Lives Touched This Year</p>
                    </div>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-32 px-6 relative overflow-hidden">
                <div className="container mx-auto">
                    <div className="grid lg:grid-cols-2 gap-20 items-center">
                        <div className="space-y-8">
                            <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                                We are on a mission to <br />
                                <span className="text-rose-500 italic">heal the world</span> together.
                            </h2>
                            <p className="text-gray-400 text-lg leading-relaxed">
                                HopeConnect isn't just a platform; it's a bridge. We connect hearts that want to help with hearts that need hope. From providing clean water to building rural schools, we ensure your kindness reaches its destination.
                            </p>
                            <div className="grid grid-cols-2 gap-8 pt-4">
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-rose-500/10 rounded-xl flex items-center justify-center">
                                        <HandHeart className="w-5 h-5 text-rose-500" />
                                    </div>
                                    <h4 className="font-bold text-lg text-white">Direct Impact</h4>
                                    <p className="text-sm text-gray-500">Every rupee is tracked and used for verified projects.</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="w-10 h-10 bg-blue-500/10 rounded-xl flex items-center justify-center">
                                        <Users className="w-5 h-5 text-blue-500" />
                                    </div>
                                    <h4 className="font-bold text-lg text-white">Community Led</h4>
                                    <p className="text-sm text-gray-500">We work with local leaders to create sustainable change.</p>
                                </div>
                            </div>
                        </div>
                        <div className="relative group">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-rose-500 to-orange-500 rounded-3xl blur-2xl opacity-20 group-hover:opacity-30 transition-opacity" />
                            <img
                                src="file:///C:/Users/kamal/.gemini/antigravity/brain/9e07113a-cc5d-427a-8a9e-f4e73017fcde/ngo_impact_community_1768777863706.png"
                                alt="Community Support"
                                className="relative rounded-3xl shadow-2xl border border-white/5"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Success Stories Section */}
            <section className="py-32 px-6 bg-gray-900/30">
                <div className="container mx-auto space-y-16">
                    <div className="text-center space-y-4 max-w-2xl mx-auto">
                        <h2 className="text-4xl font-bold">Stories of Change</h2>
                        <p className="text-gray-400">Because your donation represents more than money—it represents a new beginning for someone.</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-10">
                        <div className="group space-y-6">
                            <div className="overflow-hidden rounded-3xl aspect-[4/3]">
                                <img
                                    src="file:///C:/Users/kamal/.gemini/antigravity/brain/9e07113a-cc5d-427a-8a9e-f4e73017fcde/ngo_education_hope_1768777879989.png"
                                    alt="Education Project"
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                            </div>
                            <div className="space-y-3">
                                <span className="text-rose-500 font-bold text-sm uppercase">Education</span>
                                <h3 className="text-2xl font-bold text-white group-hover:text-rose-400 transition-colors">The Learning Tree: Rebuilding Rural Schools</h3>
                                <p className="text-gray-400 leading-relaxed">Through your support, 24 schools in remote areas were renovated this year, providing a safe learning environment for over 4,000 children.</p>
                            </div>
                        </div>

                        <div className="group space-y-6">
                            <div className="flex flex-col justify-center h-full space-y-8 p-12 bg-rose-600/5 border border-rose-500/10 rounded-[2.5rem] relative overflow-hidden">
                                <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-rose-500/10 rounded-full blur-3xl" />
                                <Heart className="w-12 h-12 text-rose-500" />
                                <blockquote className="text-3xl font-light italic text-gray-200 leading-snug">
                                    "I never thought my child would own their own books. HopeConnect didn't just give us materials; they gave us a future."
                                </blockquote>
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-rose-500/20" />
                                    <div>
                                        <p className="font-bold">Mary O.</p>
                                        <p className="text-sm text-gray-500">Mother of 3, Project Hope beneficiary</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter / CTA */}
            <section className="py-40 px-6 text-center">
                <div className="container mx-auto">
                    <div className="max-w-4xl mx-auto space-y-12 bg-gradient-to-br from-rose-600 to-orange-600 p-20 rounded-[3rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                        <div className="relative z-10 space-y-6">
                            <h2 className="text-5xl md:text-6xl font-black text-white">Join the Movement</h2>
                            <p className="text-white/80 text-xl max-w-xl mx-auto font-light">
                                Sign up to receive stories of impact and see how your contributions are changing lives around the world.
                            </p>
                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-6">
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="bg-white/20 border border-white/20 rounded-2xl px-8 py-4 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-white/50 w-full sm:w-80"
                                />
                                <button className="bg-white text-rose-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-gray-100 transition-colors">
                                    Subscribe
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-white/5 py-12 px-6 bg-gray-950">
                <div className="container mx-auto text-center space-y-6">
                    <div className="text-2xl font-bold">
                        <span className="text-rose-500">Hope</span>Connect
                    </div>
                    <p className="text-gray-500 text-sm">© 2026 HopeConnect Platform. Together, we make the world a better place.</p>
                </div>
            </footer>
        </div>
    );
}
