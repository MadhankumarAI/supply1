import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        setTimeout(() => setLoaded(true), 100)
    }, [])

    return (
        <div className="min-h-screen bg-black text-white overflow-hidden relative flex items-center justify-center">
            {/* Animated background particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 30 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute w-1 h-1 bg-green-500/20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animation: `float ${3 + Math.random() * 2}s ease-in-out infinite ${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Main content wrapper */}
            <div className="relative z-10 flex items-center justify-center">
                {/* Left side - Dotted expanding pattern */}
                <div 
                    className="absolute left-[-400px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-0 animate-fadeIn"
                    style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}
                >
                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        <style>{`
                            @keyframes rotateLeft {
                                from { transform: rotate(0deg); }
                                to { transform: rotate(360deg); }
                            }
                            .rotate-left { 
                                transform-origin: center;
                                animation: rotateLeft 40s linear infinite;
                            }
                        `}</style>
                        <g className="rotate-left">
                            {Array.from({ length: 15 }).map((_, ring) => {
                                const numDots = Math.max(8, 50 - ring * 2)
                                const radius = 40 + ring * 20
                                return Array.from({ length: numDots }).map((_, i) => {
                                    const angle = (i / numDots) * Math.PI * 2
                                    const x = 300 + Math.cos(angle) * radius
                                    const y = 300 + Math.sin(angle) * radius
                                    const opacity = Math.max(0.1, 0.5 - ring * 0.03)
                                    return (
                                        <circle
                                            key={`left-${ring}-${i}`}
                                            cx={x}
                                            cy={y}
                                            r="2"
                                            fill={`rgba(34, 197, 94, ${opacity})`}
                                        />
                                    )
                                })
                            })}
                        </g>
                    </svg>
                </div>

                {/* Right side - Circular rings with dots and diagonal lines */}
                <div 
                    className="absolute right-[-400px] top-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-0 animate-fadeIn"
                    style={{ animationDelay: '0.3s', animationFillMode: 'forwards' }}
                >
                    <svg viewBox="0 0 600 600" className="w-full h-full">
                        <style>{`
                            @keyframes pulseRing {
                                0%, 100% { opacity: 0.3; transform: scale(1); }
                                50% { opacity: 0.6; transform: scale(1.02); }
                            }
                        `}</style>
                        
                        {/* Main circular rings */}
                        {[200, 245, 290].map((radius, idx) => (
                            <g key={`ring-${idx}`}>
                                <circle
                                    cx="300"
                                    cy="300"
                                    r={radius}
                                    fill="none"
                                    stroke="rgba(34, 197, 94, 0.3)"
                                    strokeWidth="1.5"
                                    style={{
                                        animation: `pulseRing ${3 + idx * 0.5}s ease-in-out infinite`,
                                        transformOrigin: 'center'
                                    }}
                                />
                                {/* Dots on rings */}
                                {Array.from({ length: 80 }).map((_, i) => {
                                    const angle = (i / 80) * Math.PI * 2
                                    const x = 300 + Math.cos(angle) * radius
                                    const y = 300 + Math.sin(angle) * radius
                                    return (
                                        <circle
                                            key={`dot-${idx}-${i}`}
                                            cx={x}
                                            cy={y}
                                            r="1.5"
                                            fill={`rgba(34, 197, 94, ${0.4 - idx * 0.08})`}
                                        />
                                    )
                                })}
                            </g>
                        ))}
                        
                        {/* Diagonal line pattern (top right) */}
                        {Array.from({ length: 25 }).map((_, i) => (
                            <line
                                key={`diag-${i}`}
                                x1={350 + i * 6}
                                y1={80}
                                x2={370 + i * 6}
                                y2={120}
                                stroke="rgba(34, 197, 94, 0.2)"
                                strokeWidth="1"
                            />
                        ))}
                    </svg>
                </div>

                {/* Center content */}
                <div className="text-center px-6">
                    {/* 404 Text with animated spiral */}
                    <div className="relative inline-block mb-10">
                        <div className={`transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
                            <h1 className="text-[200px] md:text-[280px] lg:text-[320px] font-black leading-none tracking-tighter select-none">
                                <span className="text-white">4</span>
                                <span className="relative inline-block mx-2 md:mx-6">
                                    <span className="text-white">0</span>
                                    {/* Animated spiral inside the 0 */}
                                    <div className="absolute inset-0 flex items-center justify-center">
                                        <svg viewBox="0 0 100 100" className="w-[85%] h-[85%]">
                                            <style>{`
                                                @keyframes spinSpiral {
                                                    from { transform: rotate(0deg); }
                                                    to { transform: rotate(360deg); }
                                                }
                                                .spiral {
                                                    transform-origin: center;
                                                    animation: spinSpiral 6s linear infinite;
                                                }
                                            `}</style>
                                            <g className="spiral">
                                                <path
                                                    d="M 50 50 Q 50 35 58 38 Q 66 41 68 50 Q 70 59 63 63 Q 56 67 50 63 Q 44 59 44 50 Q 44 43 50 42"
                                                    fill="none"
                                                    stroke="rgb(34, 197, 94)"
                                                    strokeWidth="3.5"
                                                    strokeLinecap="round"
                                                />
                                                <circle cx="50" cy="42" r="3.5" fill="rgb(34, 197, 94)" />
                                            </g>
                                        </svg>
                                    </div>
                                </span>
                                <span className="text-white">4</span>
                            </h1>
                        </div>
                        {/* Glow effect */}
                        <div className="absolute inset-0 -z-10 blur-[80px]">
                            <div className="w-full h-full bg-green-500/30 animate-pulse" style={{ animationDuration: '3s' }} />
                        </div>
                    </div>

                    {/* Page Not Found heading */}
                    <h2 
                        className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-5 tracking-tight transition-all duration-1000 delay-200 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        Page Not Found
                    </h2>

                    {/* Subtitle */}
                    <p 
                        className={`text-lg md:text-xl text-gray-400 mb-12 max-w-lg mx-auto transition-all duration-1000 delay-300 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    >
                        Sorry, we couldn't find the page you're looking for.
                    </p>

                    {/* Back To Home button */}
                    <div className={`transition-all duration-1000 delay-500 ${loaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        <Link
                            to="/"
                            className="inline-block px-10 py-4 bg-green-600 hover:bg-green-500 text-white font-semibold text-lg rounded-lg transition-all duration-300 transform hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.6)] active:scale-95"
                        >
                            Back To Home
                        </Link>
                    </div>
                </div>
            </div>

            <style jsx>{`
                @keyframes float {
                    0%, 100% { transform: translate(0, 0); }
                    25% { transform: translate(15px, -15px); }
                    50% { transform: translate(-10px, -25px); }
                    75% { transform: translate(-15px, -10px); }
                }
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                .animate-fadeIn {
                    animation: fadeIn 1s ease-out;
                }
            `}</style>
        </div>
    )
}
