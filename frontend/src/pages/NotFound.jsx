import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, RefreshCw, ArrowLeft, AlertTriangle } from 'lucide-react'

export default function NotFound() {
    const navigate = useNavigate()
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100)
        
        // Add floating animation
        const style = document.createElement('style')
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            @keyframes rotate {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
        `
        document.head.appendChild(style)
        return () => document.head.removeChild(style)
    }, [])

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col">
            {/* Animated background - Multi-color gradients like homepage */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" style={{ animation: 'float 10s ease-in-out infinite 2s' }} />
                <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" style={{ animation: 'float 12s ease-in-out infinite 4s' }} />
            </div>

            {/* Nav - Same as homepage */}
            <nav className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full">
                <Link to="/" className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-sm font-bold">F</div>
                    <span className="text-lg font-semibold tracking-tight">FoodChain AI</span>
                </Link>
                <div className="flex items-center gap-6 text-sm text-white/60">
                    <Link to="/login" className="hover:text-white transition-colors">Login</Link>
                    <Link to="/register" className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all border border-white/10">
                        Register
                    </Link>
                </div>
            </nav>

            {/* Main 404 Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
                <div className={`text-center transition-all duration-1000 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    
                    {/* Floating 404 Icon */}
                    <div className="mb-8 flex justify-center">
                        <div className="relative" style={{ animation: 'float 3s ease-in-out infinite' }}>
                            <div className="absolute inset-0 bg-gradient-to-r from-green-400 via-orange-400 to-teal-400 opacity-20 blur-3xl"></div>
                            <div className="relative w-32 h-32 rounded-3xl border border-white/[0.08] bg-white/[0.02] backdrop-blur-xl flex items-center justify-center">
                                <AlertTriangle className="w-16 h-16 text-orange-400" style={{ animation: 'rotate 20s linear infinite' }} />
                            </div>
                        </div>
                    </div>

                    {/* 404 Number with gradient */}
                    <h1 className="text-[120px] sm:text-[160px] md:text-[200px] font-black leading-none tracking-tighter mb-4">
                        <span className="bg-gradient-to-r from-green-400 via-orange-400 to-teal-400 bg-clip-text text-transparent">
                            404
                        </span>
                    </h1>

                    {/* Error message */}
                    <div className="mb-8">
                        <h2 className="text-3xl sm:text-4xl font-bold mb-3 tracking-tight">
                            Page Not Found
                        </h2>
                        <p className="text-lg text-white/50 max-w-md mx-auto leading-relaxed">
                            The page you're looking for doesn't exist or has been moved.
                        </p>
                    </div>

                    {/* Action buttons - Same style as homepage */}
                    <div className={`flex flex-col sm:flex-row gap-4 justify-center mt-12 transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <button
                            onClick={() => navigate(-1)}
                            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.05] transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                            <span className="font-medium">Go Back</span>
                        </button>

                        <Link
                            to="/"
                            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 text-black font-semibold hover:shadow-2xl hover:shadow-teal-500/20 transition-all hover:-translate-y-1"
                        >
                            <Home className="w-4 h-4" />
                            <span>Back to Home</span>
                        </Link>

                        <button
                            onClick={() => window.location.reload()}
                            className="group flex items-center justify-center gap-2 px-6 py-3 rounded-2xl border border-white/[0.06] bg-white/[0.02] backdrop-blur-xl hover:border-white/20 hover:bg-white/[0.05] transition-all hover:-translate-y-1 hover:shadow-xl"
                        >
                            <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                            <span className="font-medium">Refresh</span>
                        </button>
                    </div>

                    {/* Helpful links */}
                    <div className={`mt-16 transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <p className="text-sm text-white/40 mb-4">Or explore by role:</p>
                        <div className="flex flex-wrap gap-3 justify-center">
                            <Link
                                to="/farmer"
                                className="px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm font-medium hover:bg-green-500/20 hover:border-green-500/40 transition-all"
                            >
                                🌾 Farmer
                            </Link>
                            <Link
                                to="/mandi"
                                className="px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 text-sm font-medium hover:bg-orange-500/20 hover:border-orange-500/40 transition-all"
                            >
                                🏪 Mandi
                            </Link>
                            <Link
                                to="/retailer"
                                className="px-4 py-2 rounded-full bg-teal-500/10 border border-teal-500/20 text-teal-400 text-sm font-medium hover:bg-teal-500/20 hover:border-teal-500/40 transition-all"
                            >
                                🛒 Retailer
                            </Link>
                        </div>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 text-center py-6 text-xs text-white/30">
                FoodChain AI © 2025 • Powered by AI
            </footer>
        </div>
    )
}
