import { Link } from 'react-router-dom'
import { useEffect, useState, useRef } from 'react'

const roles = [
    {
        id: 'farmer',
        title: 'Farmer',
        emoji: '🌾',
        description: 'AI-powered crop intelligence, weather alerts, and voice-driven farming insights.',
        gradient: 'from-green-500 to-emerald-400',
        border: 'hover:border-green-500/50',
        glow: 'group-hover:shadow-green-500/20',
        bg: 'group-hover:bg-green-500/5',
        link: '/farmer',
        accentColor: '#22c55e'
    },
    {
        id: 'mandi',
        title: 'Mandi',
        emoji: '🏪',
        description: 'Real-time price tracking, supply flow optimization, and multilingual alerts.',
        gradient: 'from-orange-500 to-amber-400',
        border: 'hover:border-orange-500/50',
        glow: 'group-hover:shadow-orange-500/20',
        bg: 'group-hover:bg-orange-500/5',
        link: '/mandi',
        accentColor: '#f97316'
    },
    {
        id: 'retailer',
        title: 'Retailer',
        emoji: '🛒',
        description: 'Demand forecasting, stock optimization, dynamic pricing, and consumer alerts.',
        gradient: 'from-teal-400 to-cyan-400',
        border: 'hover:border-teal-400/50',
        glow: 'group-hover:shadow-teal-400/20',
        bg: 'group-hover:bg-teal-400/5',
        link: '/retailer',
        accentColor: '#14b8a6'
    },
]

export default function HomePage() {
    const [loaded, setLoaded] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const cardsRef = useRef([])

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100)

        // Mouse move parallax effect
        const handleMouseMove = (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 2
            const y = (e.clientY / window.innerHeight - 0.5) * 2
            setMousePosition({ x, y })
        }

        window.addEventListener('mousemove', handleMouseMove)

        // Inject 3D animation styles
        const style = document.createElement('style')
        style.textContent = `
            @keyframes float {
                0%, 100% { transform: translateY(0px) scale(1); }
                50% { transform: translateY(-20px) scale(1.05); }
            }
            
            @keyframes rotate3d {
                0% { transform: perspective(1000px) rotateY(0deg) rotateX(0deg); }
                100% { transform: perspective(1000px) rotateY(360deg) rotateX(0deg); }
            }
            
            @keyframes pulse3d {
                0%, 100% { transform: scale3d(1, 1, 1); }
                50% { transform: scale3d(1.05, 1.05, 1.05); }
            }
            
            @keyframes shimmer {
                0% { background-position: -1000px 0; }
                100% { background-position: 1000px 0; }
            }
            
            .perspective-container {
                perspective: 2000px;
                transform-style: preserve-3d;
            }
            
            .card-3d {
                transform-style: preserve-3d;
                transition: transform 0.3s ease-out;
            }
            
            .card-3d-layer {
                transform: translateZ(30px);
            }
            
            .shimmer-effect {
                background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                background-size: 1000px 100%;
                animation: shimmer 3s infinite;
            }
            
            .text-glow {
                text-shadow: 0 0 20px currentColor, 0 0 40px currentColor;
            }
        `
        document.head.appendChild(style)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            document.head.removeChild(style)
        }
    }, [])

    const handleCardMouseMove = (e, index) => {
        const card = cardsRef.current[index]
        if (!card) return

        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const centerX = rect.width / 2
        const centerY = rect.height / 2

        const rotateX = (y - centerY) / 10
        const rotateY = (centerX - x) / 10

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px) scale3d(1.02, 1.02, 1.02)`
    }

    const handleCardMouseLeave = (index) => {
        const card = cardsRef.current[index]
        if (!card) return
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px) scale3d(1, 1, 1)'
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex flex-col overflow-hidden">
            {/* Animated 3D background */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                {/* Parallax floating orbs */}
                <div 
                    className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" 
                    style={{ 
                        animation: 'float 8s ease-in-out infinite',
                        transform: `translate(${mousePosition.x * 30}px, ${mousePosition.y * 30}px)`
                    }} 
                />
                <div 
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl" 
                    style={{ 
                        animation: 'float 10s ease-in-out infinite 2s',
                        transform: `translate(${mousePosition.x * -20}px, ${mousePosition.y * -20}px)`
                    }} 
                />
                <div 
                    className="absolute top-1/2 left-1/2 w-96 h-96 bg-teal-500/5 rounded-full blur-3xl" 
                    style={{ 
                        animation: 'float 12s ease-in-out infinite 4s',
                        transform: `translate(${mousePosition.x * 40}px, ${mousePosition.y * 40}px)`
                    }} 
                />

                {/* Animated grid */}
                <div 
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
                        backgroundSize: '100px 100px',
                        transform: `translate(${mousePosition.x * 10}px, ${mousePosition.y * 10}px)`
                    }}
                />

                {/* Floating particles */}
                {[...Array(20)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-white/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${8 + Math.random() * 4}s ease-in-out infinite ${Math.random() * 4}s`,
                            opacity: Math.random() * 0.5
                        }}
                    />
                ))}
            </div>

            {/* Nav with 3D effect */}
            <nav 
                className="relative z-10 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto w-full"
                style={{
                    transform: `translateY(${loaded ? 0 : -20}px)`,
                    opacity: loaded ? 1 : 0,
                    transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
            >
                <div className="flex items-center gap-2 group">
                    <div 
                        className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-sm font-bold transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        F
                    </div>
                    <span className="text-lg font-semibold tracking-tight">FoodChain AI</span>
                </div>
                <div className="flex items-center gap-6 text-sm text-white/60">
                    <Link to="/login" className="hover:text-white transition-colors hover:scale-105 transform">Login</Link>
                    <Link to="/register" className="px-4 py-2 rounded-full bg-white/10 text-white text-sm font-medium hover:bg-white/20 transition-all border border-white/10 hover:scale-105 hover:shadow-lg transform">
                        Register
                    </Link>
                </div>
            </nav>

            {/* Hero with 3D text */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 py-20">
                <div 
                    className="text-center"
                    style={{
                        transform: `translateY(${loaded ? 0 : 30}px)`,
                        opacity: loaded ? 1 : 0,
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                >
                    {/* Badge with shimmer */}
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs font-medium text-white/70 mb-8 relative overflow-hidden">
                        <div className="absolute inset-0 shimmer-effect pointer-events-none" />
                        <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse relative z-10" />
                        <span className="relative z-10">AI-Powered Food Supply Intelligence</span>
                    </div>

                    {/* 3D Animated heading */}
                    <h1 
                        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter leading-[0.95] mb-6"
                        style={{
                            transform: `perspective(1000px) rotateX(${mousePosition.y * 2}deg) rotateY(${mousePosition.x * 2}deg)`,
                            transformStyle: 'preserve-3d',
                            transition: 'transform 0.3s ease-out'
                        }}
                    >
                        <span 
                            className="block text-white"
                            style={{ 
                                transform: 'translateZ(20px)',
                                display: 'inline-block'
                            }}
                        >
                            Predict.
                        </span>
                        <br />
                        <span 
                            className="block bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400 bg-clip-text text-transparent text-glow"
                            style={{ 
                                transform: 'translateZ(40px)',
                                display: 'inline-block'
                            }}
                        >
                            Protect.
                        </span>
                        <br />
                        <span 
                            className="block text-white"
                            style={{ 
                                transform: 'translateZ(20px)',
                                display: 'inline-block'
                            }}
                        >
                            Prosper.
                        </span>
                    </h1>

                    <p 
                        className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto mb-16 leading-relaxed font-light"
                        style={{
                            transform: 'translateZ(10px)',
                            transformStyle: 'preserve-3d'
                        }}
                    >
                        Prevent systemic food supply failures with AI that detects stress signals, predicts disruptions, and recommends stabilizing interventions — all through voice.
                    </p>
                </div>

                {/* 3D Interactive Role Cards */}
                <div 
                    className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full perspective-container"
                    style={{
                        opacity: loaded ? 1 : 0,
                        transform: loaded ? 'translateY(0)' : 'translateY(50px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.3s'
                    }}
                >
                    {roles.map((role, i) => (
                        <Link
                            key={role.id}
                            to={role.link}
                            className="group"
                            ref={(el) => (cardsRef.current[i] = el)}
                            onMouseMove={(e) => handleCardMouseMove(e, i)}
                            onMouseLeave={() => handleCardMouseLeave(i)}
                            style={{ 
                                transitionDelay: `${400 + i * 150}ms`,
                                transformStyle: 'preserve-3d'
                            }}
                        >
                            <div 
                                className={`card-3d relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-8 backdrop-blur-xl transition-all duration-300 ${role.border} ${role.bg} group-hover:shadow-2xl ${role.glow} overflow-hidden`}
                                style={{
                                    transformStyle: 'preserve-3d',
                                    willChange: 'transform'
                                }}
                            >
                                {/* Animated gradient border */}
                                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}>
                                    <div className={`absolute inset-x-0 -top-px h-px bg-gradient-to-r ${role.gradient}`} />
                                    <div className={`absolute inset-x-0 -bottom-px h-px bg-gradient-to-r ${role.gradient}`} />
                                    <div className={`absolute inset-y-0 -left-px w-px bg-gradient-to-b ${role.gradient}`} />
                                    <div className={`absolute inset-y-0 -right-px w-px bg-gradient-to-b ${role.gradient}`} />
                                </div>

                                {/* Shimmer effect */}
                                <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                                {/* Floating emoji with 3D */}
                                <div 
                                    className="text-5xl mb-6 transition-transform duration-300 group-hover:scale-125"
                                    style={{ 
                                        transform: 'translateZ(60px)',
                                        animation: 'pulse3d 2s ease-in-out infinite',
                                        transformStyle: 'preserve-3d'
                                    }}
                                >
                                    {role.emoji}
                                </div>

                                <div style={{ transform: 'translateZ(30px)', transformStyle: 'preserve-3d' }}>
                                    <h3 className="text-2xl font-bold mb-3 tracking-tight group-hover:scale-105 transition-transform">
                                        {role.title}
                                    </h3>
                                    <p className="text-white/50 text-sm leading-relaxed mb-6">
                                        {role.description}
                                    </p>

                                    <div className="flex items-center gap-2 text-sm font-medium text-white/40 group-hover:text-white/80 transition-colors">
                                        <span>Explore</span>
                                        <svg 
                                            className="w-4 h-4 transform group-hover:translate-x-2 transition-transform" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor" 
                                            strokeWidth={2}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </div>

                                {/* Glow orb */}
                                <div 
                                    className={`absolute -z-10 inset-0 bg-gradient-to-br ${role.gradient} opacity-0 group-hover:opacity-20 blur-3xl transition-opacity duration-500`}
                                    style={{ transform: 'translateZ(-50px)' }}
                                />
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Bottom features with 3D */}
                <div 
                    className="mt-20 flex items-center gap-8 text-xs text-white/30"
                    style={{
                        opacity: loaded ? 1 : 0,
                        transform: loaded ? 'translateY(0)' : 'translateY(20px)',
                        transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1) 0.7s'
                    }}
                >
                    {[
                        { icon: '🎙️', text: 'Voice AI Powered' },
                        { icon: '🌐', text: 'Multilingual Alerts' },
                        { icon: '📊', text: 'Real-time Analytics' }
                    ].map((feature, i) => (
                        <div key={i} className="group">
                            <span className="flex items-center gap-2 hover:text-white/60 transition-colors cursor-default">
                                <span className="text-base group-hover:scale-125 transition-transform inline-block">
                                    {feature.icon}
                                </span>
                                {feature.text}
                            </span>
                            {i < 2 && <span className="w-px h-4 bg-white/10 inline-block mx-8" />}
                        </div>
                    ))}
                </div>
            </main>
        </div>
    )
}
