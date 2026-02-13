import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100)
        
        // Add animations
        const style = document.createElement('style')
        style.textContent = `
            @keyframes spiral {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            @keyframes pulse-ring {
                0%, 100% { transform: scale(1); opacity: 0.4; }
                50% { transform: scale(1.05); opacity: 0.6; }
            }
            @keyframes float-particle {
                0%, 100% { transform: translate(0, 0); }
                25% { transform: translate(10px, -10px); }
                50% { transform: translate(-5px, -20px); }
                75% { transform: translate(-10px, -10px); }
            }
            @keyframes fade-in-up {
                from { opacity: 0; transform: translateY(20px); }
                to { opacity: 1; transform: translateY(0); }
            }
            @keyframes glow {
                0%, 100% { filter: drop-shadow(0 0 20px rgba(16, 185, 129, 0.4)); }
                50% { filter: drop-shadow(0 0 30px rgba(16, 185, 129, 0.6)); }
            }
        `
        document.head.appendChild(style)
        return () => document.head.removeChild(style)
    }, [])

    // Generate particles
    const particles = Array.from({ length: 50 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        delay: Math.random() * 5,
        duration: 3 + Math.random() * 2
    }))

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative">
            {/* Floating particles */}
            <div className="fixed inset-0 pointer-events-none">
                {particles.map(p => (
                    <div
                        key={p.id}
                        className="absolute w-1 h-1 bg-green-500/30 rounded-full"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            animation: `float-particle ${p.duration}s ease-in-out infinite ${p.delay}s`
                        }}
                    />
                ))}
            </div>

            {/* Main content container */}
            <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
                <div className="relative">
                    
                    {/* Left geometric pattern - Dotted spiral */}
                    <div className="absolute left-[-300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
                        <svg viewBox="0 0 500 500" className="w-full h-full" style={{ animation: 'spiral 30s linear infinite' }}>
                            {Array.from({ length: 12 }, (_, ring) => {
                                const dots = 40 - ring * 2
                                const radius = 200 - ring * 15
                                return Array.from({ length: dots }, (_, i) => {
                                    const angle = (i / dots) * Math.PI * 2
                                    const x = 250 + Math.cos(angle) * radius
                                    const y = 250 + Math.sin(angle) * radius
                                    return (
                                        <circle
                                            key={`${ring}-${i}`}
                                            cx={x}
                                            cy={y}
                                            r="2"
                                            fill={`rgba(16, 185, 129, ${0.3 - ring * 0.02})`}
                                        />
                                    )
                                })
                            })}
                        </svg>
                    </div>

                    {/* Right geometric pattern - Circular rings with dots */}
                    <div className="absolute right-[-300px] top-1/2 -translate-y-1/2 w-[500px] h-[500px] pointer-events-none">
                        <svg viewBox="0 0 500 500" className="w-full h-full">
                            {/* Outer rings */}
                            {[0, 1, 2].map((ring) => (
                                <g key={ring}>
                                    <circle
                                        cx="250"
                                        cy="250"
                                        r={180 + ring * 40}
                                        fill="none"
                                        stroke={`rgba(16, 185, 129, ${0.3 - ring * 0.1})`}
                                        strokeWidth="1"
                                        style={{ animation: `pulse-ring ${4 + ring}s ease-in-out infinite` }}
                                    />
                                    {/* Dots on ring */}
                                    {Array.from({ length: 60 }, (_, i) => {
                                        const angle = (i / 60) * Math.PI * 2
                                        const radius = 180 + ring * 40
                                        const x = 250 + Math.cos(angle) * radius
                                        const y = 250 + Math.sin(angle) * radius
                                        return (
                                            <circle
                                                key={i}
                                                cx={x}
                                                cy={y}
                                                r="1.5"
                                                fill={`rgba(16, 185, 129, ${0.4 - ring * 0.1})`}
                                            />
                                        )
                                    })}
                                </g>
                            ))}
                            {/* Diagonal line pattern */}
                            {Array.from({ length: 20 }, (_, i) => (
                                <line
                                    key={`line-${i}`}
                                    x1={280 + i * 8}
                                    y1={100}
                                    x2={300 + i * 8}
                                    y2={140}
                                    stroke={`rgba(16, 185, 129, ${0.2})`}
                                    strokeWidth="1"
                                />
                            ))}
                        </svg>
                    </div>

                    {/* Central content */}
                    <div 
                        className="text-center relative z-20"
                        style={{ 
                            opacity: loaded ? 1 : 0,
                            animation: loaded ? 'fade-in-up 0.8s ease-out' : 'none'
                        }}
                    >
                        {/* 404 with spiral */}
                        <div className="relative inline-block mb-8">
                            <h1 className="text-[180px] md:text-[240px] font-black leading-none tracking-tighter relative z-10">
                                <span className="text-white">4</span>
                                <span className="relative inline-block mx-4">
                                    {/* Spiral SVG in the "0" */}
                                    <span className="text-white">0</span>
                                    <div className="absolute inset-0 flex items-center justify-center" style={{ animation: 'spiral 8s linear infinite' }}>
                                        <svg viewBox="0 0 100 100" className="w-[80%] h-[80%]">
                                            <path
                                                d="M 50 50 Q 50 30, 65 35 T 70 50 Q 70 65, 55 65 T 45 50 Q 45 40, 52 42"
                                                fill="none"
                                                stroke="rgba(16, 185, 129, 0.6)"
                                                strokeWidth="3"
                                                strokeLinecap="round"
                                            />
                                            <circle cx="52" cy="42" r="3" fill="rgb(16, 185, 129)" />
                                        </svg>
                                    </div>
                                </span>
                                <span className="text-white">4</span>
                            </h1>
                            {/* Glow effect behind 404 */}
                            <div 
                                className="absolute inset-0 -z-10 blur-3xl bg-green-500/20"
                                style={{ animation: 'glow 3s ease-in-out infinite' }}
                            />
                        </div>

                        {/* Page Not Found text */}
                        <h2 
                            className="text-4xl md:text-5xl font-bold mb-4 tracking-tight"
                            style={{ 
                                animation: loaded ? 'fade-in-up 0.8s ease-out 0.2s backwards' : 'none'
                            }}
                        >
                            Page Not Found
                        </h2>
                        
                        <p 
                            className="text-lg text-gray-400 mb-12 max-w-md mx-auto"
                            style={{ 
                                animation: loaded ? 'fade-in-up 0.8s ease-out 0.3s backwards' : 'none'
                            }}
                        >
                            Sorry, we couldn't find the page you're looking for.
                        </p>

                        {/* Back To Home button */}
                        <div
                            style={{ 
                                animation: loaded ? 'fade-in-up 0.8s ease-out 0.4s backwards' : 'none'
                            }}
                        >
                            <Link
                                to="/"
                                className="inline-block px-8 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
                            >
                                Back To Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
