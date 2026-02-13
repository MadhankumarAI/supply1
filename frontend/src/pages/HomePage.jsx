import { Link } from 'react-router-dom'
import { Sprout, TrendingUp, Shield, Zap, Users, BarChart3, MapPin, ArrowRight, Sparkles, Leaf, Globe2 } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-[#0F0F0F] text-white overflow-hidden relative">
            {/* Animated background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0B3D2E] via-[#0F0F0F] to-[#1A0F0A]" />
                <div className="absolute top-20 left-20 w-[500px] h-[500px] bg-[#2D5F4C] rounded-full mix-blend-multiply filter blur-[128px] opacity-20 animate-blob" />
                <div className="absolute top-40 right-20 w-[500px] h-[500px] bg-[#D4745E] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-20 left-1/2 w-[500px] h-[500px] bg-[#F4B860] rounded-full mix-blend-multiply filter blur-[128px] opacity-10 animate-blob animation-delay-4000" />
            </div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Satoshi:wght@400;500;700;900&family=DM+Sans:wght@400;500;600;700&display=swap');
                
                * {
                    font-family: 'DM Sans', -apple-system, sans-serif;
                }
                
                h1, h2, h3, h4, h5, h6, .heading {
                    font-family: 'Satoshi', -apple-system, sans-serif;
                }
                
                @keyframes blob {
                    0%, 100% { transform: translate(0, 0) scale(1); }
                    25% { transform: translate(20px, -50px) scale(1.1); }
                    50% { transform: translate(-20px, 20px) scale(0.9); }
                    75% { transform: translate(50px, 50px) scale(1.05); }
                }
                
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                }
                
                @keyframes fadeInUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
                
                @keyframes slideInLeft {
                    from {
                        opacity: 0;
                        transform: translateX(-50px);
                    }
                    to {
                        opacity: 1;
                        transform: translateX(0);
                    }
                }
                
                @keyframes scaleIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
                
                .animate-blob {
                    animation: blob 15s ease-in-out infinite;
                }
                
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
                
                .animation-delay-4000 {
                    animation-delay: 4s;
                }
                
                .fade-in-up {
                    animation: fadeInUp 0.8s ease-out forwards;
                }
                
                .slide-in-left {
                    animation: slideInLeft 0.8s ease-out forwards;
                }
                
                .scale-in {
                    animation: scaleIn 0.6s ease-out forwards;
                }
                
                .hover-lift {
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }
                
                .hover-lift:hover {
                    transform: translateY(-8px);
                }
            `}</style>

            {/* Navigation */}
            <nav className="relative z-50 px-6 py-6">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-3 fade-in-up">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#2D5F4C] to-[#0B3D2E] flex items-center justify-center shadow-lg shadow-green-500/20">
                            <Sprout className="w-6 h-6 text-[#F4B860]" strokeWidth={2.5} />
                        </div>
                        <span className="text-2xl font-black heading tracking-tight">
                            Agri<span className="text-[#F4B860]">nova</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-4 fade-in-up" style={{ animationDelay: '0.2s' }}>
                        <Link to="/login" className="px-6 py-2.5 text-sm font-semibold text-white/80 hover:text-white transition-colors">
                            Sign In
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#2D5F4C] to-[#0B3D2E] text-white font-semibold text-sm hover:shadow-lg hover:shadow-green-500/30 transition-all hover:scale-105">
                            Get Started
                        </Link>
                    </div>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 pt-20 pb-32">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2D5F4C]/20 border border-[#2D5F4C]/30 mb-8 fade-in-up">
                            <Sparkles className="w-4 h-4 text-[#F4B860]" />
                            <span className="text-sm font-medium text-[#F4B860]">Revolutionizing Agriculture</span>
                        </div>
                        
                        <h1 className="text-6xl lg:text-7xl font-black heading leading-[1.1] mb-6 fade-in-up" style={{ animationDelay: '0.1s' }}>
                            Connect.<br />
                            Trade.<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2D5F4C] via-[#F4B860] to-[#D4745E]">
                                Thrive.
                            </span>
                        </h1>
                        
                        <p className="text-xl text-white/60 mb-10 leading-relaxed max-w-xl fade-in-up" style={{ animationDelay: '0.2s' }}>
                            India's first intelligent agricultural marketplace connecting farmers, mandis, and retailers. Fair prices, transparent supply chains, and prosperity for all.
                        </p>
                        
                        <div className="flex flex-wrap gap-4 fade-in-up" style={{ animationDelay: '0.3s' }}>
                            <Link to="/login" className="group px-8 py-4 rounded-xl bg-gradient-to-r from-[#2D5F4C] to-[#0B3D2E] text-white font-bold text-lg hover:shadow-2xl hover:shadow-green-500/30 transition-all hover:scale-105 flex items-center gap-2">
                                Start Your Journey
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </Link>
                            <Link to="#features" className="px-8 py-4 rounded-xl border-2 border-white/10 text-white font-semibold text-lg hover:bg-white/5 transition-all hover:scale-105">
                                Learn More
                            </Link>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-3 gap-8 mt-16 fade-in-up" style={{ animationDelay: '0.4s' }}>
                            <div>
                                <div className="text-3xl font-black heading text-[#F4B860]">1000+</div>
                                <div className="text-sm text-white/50">Active Farmers</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black heading text-[#D4745E]">50+</div>
                                <div className="text-sm text-white/50">Mandis Connected</div>
                            </div>
                            <div>
                                <div className="text-3xl font-black heading text-[#2D5F4C]">₹10Cr+</div>
                                <div className="text-sm text-white/50">Transactions</div>
                            </div>
                        </div>
                    </div>

                    {/* Right: Role Cards */}
                    <div className="relative">
                        <div className="grid gap-6">
                            {/* Farmer Card */}
                            <Link to="/farmer" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#2D5F4C]/40 to-[#0B3D2E]/40 backdrop-blur-xl border border-white/10 p-8 hover-lift scale-in">
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#2D5F4C] rounded-full filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative flex items-start justify-between">
                                    <div>
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#2D5F4C] to-[#0B3D2E] flex items-center justify-center mb-4 shadow-lg">
                                            <Leaf className="w-7 h-7 text-[#F4B860]" strokeWidth={2} />
                                        </div>
                                        <h3 className="text-2xl font-bold heading mb-2">Farmer</h3>
                                        <p className="text-white/60 mb-4">Get fair prices for your harvest. Direct market access.</p>
                                        <div className="flex items-center gap-2 text-[#F4B860] font-semibold">
                                            <span>Explore Dashboard</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Mandi Card */}
                            <Link to="/mandi" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#D4745E]/40 to-[#B85A44]/40 backdrop-blur-xl border border-white/10 p-8 hover-lift scale-in" style={{ animationDelay: '0.1s' }}>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#D4745E] rounded-full filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative flex items-start justify-between">
                                    <div>
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#D4745E] to-[#B85A44] flex items-center justify-center mb-4 shadow-lg">
                                            <Globe2 className="w-7 h-7 text-white" strokeWidth={2} />
                                        </div>
                                        <h3 className="text-2xl font-bold heading mb-2">Mandi</h3>
                                        <p className="text-white/60 mb-4">Manage inventory. Connect with suppliers and buyers.</p>
                                        <div className="flex items-center gap-2 text-[#F4B860] font-semibold">
                                            <span>View Platform</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Retailer Card */}
                            <Link to="/retailer" className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#F4B860]/40 to-[#E09B3D]/40 backdrop-blur-xl border border-white/10 p-8 hover-lift scale-in" style={{ animationDelay: '0.2s' }}>
                                <div className="absolute top-0 right-0 w-40 h-40 bg-[#F4B860] rounded-full filter blur-[80px] opacity-20 group-hover:opacity-30 transition-opacity" />
                                <div className="relative flex items-start justify-between">
                                    <div>
                                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-[#F4B860] to-[#E09B3D] flex items-center justify-center mb-4 shadow-lg">
                                            <BarChart3 className="w-7 h-7 text-[#0B3D2E]" strokeWidth={2} />
                                        </div>
                                        <h3 className="text-2xl font-bold heading mb-2">Retailer</h3>
                                        <p className="text-white/60 mb-4">Source fresh produce. Optimize your supply chain.</p>
                                        <div className="flex items-center gap-2 text-[#0B3D2E] font-semibold">
                                            <span>Start Sourcing</span>
                                            <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Section */}
            <div id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                <div className="text-center mb-20">
                    <h2 className="text-5xl font-black heading mb-6">
                        Why Choose <span className="text-[#F4B860]">Agrinova</span>
                    </h2>
                    <p className="text-xl text-white/60 max-w-2xl mx-auto">
                        Powered by intelligence, driven by transparency, built for prosperity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {[
                        {
                            icon: <TrendingUp className="w-8 h-8" strokeWidth={2} />,
                            title: "Fair Market Prices",
                            description: "AI-powered pricing ensures fairness for all stakeholders in the supply chain.",
                            color: "#2D5F4C"
                        },
                        {
                            icon: <Shield className="w-8 h-8" strokeWidth={2} />,
                            title: "Secure Transactions",
                            description: "End-to-end encryption and verified users for complete peace of mind.",
                            color: "#D4745E"
                        },
                        {
                            icon: <Zap className="w-8 h-8" strokeWidth={2} />,
                            title: "Instant Matching",
                            description: "Smart algorithms connect buyers and sellers in real-time.",
                            color: "#F4B860"
                        },
                        {
                            icon: <MapPin className="w-8 h-8" strokeWidth={2} />,
                            title: "Location Intelligence",
                            description: "Find the nearest mandis with real-time routing and distance calculation.",
                            color: "#2D5F4C"
                        },
                        {
                            icon: <Users className="w-8 h-8" strokeWidth={2} />,
                            title: "Community First",
                            description: "Built by farmers, for farmers. Your feedback shapes our platform.",
                            color: "#D4745E"
                        },
                        {
                            icon: <BarChart3 className="w-8 h-8" strokeWidth={2} />,
                            title: "Analytics Dashboard",
                            description: "Track trends, forecast demand, and make data-driven decisions.",
                            color: "#F4B860"
                        }
                    ].map((feature, index) => (
                        <div key={index} className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 p-8 hover-lift fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                            <div className="absolute top-0 right-0 w-32 h-32 rounded-full filter blur-[60px] opacity-0 group-hover:opacity-20 transition-opacity" style={{ background: feature.color }} />
                            <div className="relative">
                                <div className="w-16 h-16 rounded-xl mb-6 flex items-center justify-center" style={{ background: `${feature.color}20` }}>
                                    <div style={{ color: feature.color }}>
                                        {feature.icon}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold heading mb-3">{feature.title}</h3>
                                <p className="text-white/60 leading-relaxed">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* CTA Section */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-32">
                <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#2D5F4C] to-[#0B3D2E] p-16 text-center">
                    <div className="absolute top-0 left-0 w-full h-full">
                        <div className="absolute top-10 left-10 w-64 h-64 bg-[#F4B860] rounded-full filter blur-[120px] opacity-20" />
                        <div className="absolute bottom-10 right-10 w-64 h-64 bg-[#D4745E] rounded-full filter blur-[120px] opacity-20" />
                    </div>
                    <div className="relative z-10">
                        <h2 className="text-5xl font-black heading mb-6">
                            Ready to Transform Agriculture?
                        </h2>
                        <p className="text-xl text-white/80 mb-10 max-w-2xl mx-auto">
                            Join thousands of farmers, mandis, and retailers building a better future.
                        </p>
                        <Link to="/register" className="inline-flex items-center gap-2 px-10 py-5 rounded-xl bg-white text-[#0B3D2E] font-bold text-lg hover:shadow-2xl hover:shadow-white/30 transition-all hover:scale-105">
                            Join Agrinova Today
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="relative z-10 border-t border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2D5F4C] to-[#0B3D2E] flex items-center justify-center">
                                <Sprout className="w-5 h-5 text-[#F4B860]" />
                            </div>
                            <span className="text-xl font-bold heading">
                                Agri<span className="text-[#F4B860]">nova</span>
                            </span>
                        </div>
                        <div className="text-sm text-white/40">
                            © 2026 Agrinova. Empowering agriculture.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
