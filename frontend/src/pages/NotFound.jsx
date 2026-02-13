import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Home, RefreshCw, ArrowLeft, AlertTriangle, Zap, Terminal } from 'lucide-react'

export default function NotFound() {
    const navigate = useNavigate()
    const [glitch, setGlitch] = useState(false)
    const [scanLine, setScanLine] = useState(0)
    const [dots, setDots] = useState('')

    useEffect(() => {
        // Glitch effect
        const glitchInterval = setInterval(() => {
            setGlitch(true)
            setTimeout(() => setGlitch(false), 100)
        }, 3000)

        // Scan line animation
        const scanInterval = setInterval(() => {
            setScanLine(prev => (prev >= 100 ? 0 : prev + 1))
        }, 50)

        // Loading dots animation
        const dotsInterval = setInterval(() => {
            setDots(prev => prev.length >= 3 ? '' : prev + '.')
        }, 500)

        // Inject industrial theme styles
        const style = document.createElement('style')
        style.textContent = `
            @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700;800&family=Orbitron:wght@400;700;900&display=swap');
            
            @keyframes glitchAnim {
                0% { transform: translate(0); }
                20% { transform: translate(-2px, 2px); }
                40% { transform: translate(-2px, -2px); }
                60% { transform: translate(2px, 2px); }
                80% { transform: translate(2px, -2px); }
                100% { transform: translate(0); }
            }
            
            @keyframes flicker {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.8; }
            }
            
            @keyframes pulse-glow {
                0%, 100% { box-shadow: 0 0 20px rgba(20, 184, 166, 0.3); }
                50% { box-shadow: 0 0 40px rgba(20, 184, 166, 0.6); }
            }
            
            @keyframes float {
                0%, 100% { transform: translateY(0px); }
                50% { transform: translateY(-20px); }
            }
            
            @keyframes rotate-360 {
                from { transform: rotate(0deg); }
                to { transform: rotate(360deg); }
            }
            
            .glitch-text {
                animation: glitchAnim 0.3s infinite;
            }
            
            .flicker {
                animation: flicker 0.1s infinite;
            }
            
            .scan-line {
                position: absolute;
                width: 100%;
                height: 2px;
                background: linear-gradient(transparent, rgba(20, 184, 166, 0.8), transparent);
                box-shadow: 0 0 10px rgba(20, 184, 166, 0.5);
                pointer-events: none;
                z-index: 100;
            }
            
            .crt-effect {
                animation: flicker 0.15s infinite;
            }
            
            .noise-bg {
                background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.05'/%3E%3C/svg%3E");
            }
        `
        document.head.appendChild(style)

        return () => {
            clearInterval(glitchInterval)
            clearInterval(scanInterval)
            clearInterval(dotsInterval)
            document.head.removeChild(style)
        }
    }, [])

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white relative overflow-hidden noise-bg">
            {/* Scan line effect */}
            <div className="scan-line" style={{ top: `${scanLine}%` }}></div>

            {/* Grid background */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div 
                    className="w-full h-full" 
                    style={{
                        backgroundImage: 'linear-gradient(rgba(20, 184, 166, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(20, 184, 166, 0.1) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                ></div>
            </div>

            {/* Radial gradient */}
            <div className="absolute inset-0 bg-gradient-radial from-[#14b8a6]/10 via-transparent to-transparent"></div>

            {/* Main content */}
            <div className="relative z-10 flex items-center justify-center min-h-screen p-8">
                <div className="max-w-4xl w-full">
                    
                    {/* Terminal-style header */}
                    <div className="mb-8 flex items-center gap-3" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <Terminal className="w-5 h-5 text-[#14b8a6]" />
                        <span className="text-xs tracking-[0.2em] text-white/40">SYSTEM_ERROR_TERMINAL</span>
                    </div>

                    {/* Main 404 Display */}
                    <div className="relative">
                        {/* Background glow */}
                        <div className="absolute inset-0 bg-[#14b8a6]/5 blur-3xl"></div>
                        
                        <div className="relative border-2 border-[#14b8a6]/30 bg-[#1a1a1a] p-12">
                            
                            {/* Status bar */}
                            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent"></div>
                            
                            {/* Error icon */}
                            <div className="flex justify-center mb-8">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-[#14b8a6]/20 blur-xl animate-pulse"></div>
                                    <div className="relative w-24 h-24 border-4 border-[#14b8a6] flex items-center justify-center" style={{ animation: 'float 3s ease-in-out infinite' }}>
                                        <AlertTriangle className="w-12 h-12 text-[#14b8a6]" style={{ animation: 'rotate-360 20s linear infinite' }} />
                                    </div>
                                </div>
                            </div>

                            {/* 404 Number */}
                            <div className="text-center mb-8">
                                <h1 
                                    className={`text-[120px] md:text-[180px] font-black leading-none ${glitch ? 'glitch-text' : ''}`}
                                    style={{ 
                                        fontFamily: "'Orbitron', sans-serif",
                                        color: '#14b8a6',
                                        textShadow: '0 0 20px rgba(20, 184, 166, 0.5), 0 0 40px rgba(20, 184, 166, 0.3)',
                                        letterSpacing: '0.05em'
                                    }}
                                >
                                    404
                                </h1>
                                <div className="h-1 w-32 mx-auto bg-[#14b8a6] mb-6"></div>
                            </div>

                            {/* Error message */}
                            <div className="text-center mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                <p className="text-2xl font-bold text-white mb-3 tracking-wider">
                                    PAGE_NOT_FOUND
                                </p>
                                <p className="text-sm text-white/50 tracking-[0.15em] mb-2">
                                    ERROR_CODE: 0x404_RESOURCE_UNAVAILABLE
                                </p>
                                <p className="text-xs text-white/30 mb-6">
                                    The requested resource does not exist in the system database{dots}
                                </p>
                            </div>

                            {/* System info box */}
                            <div className="border border-white/[0.08] bg-black/30 p-4 mb-8 text-xs" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                                <div className="flex items-center gap-2 mb-2 text-[#00ff88]">
                                    <Zap className="w-3 h-3" />
                                    <span>SYSTEM_STATUS</span>
                                </div>
                                <div className="space-y-1 text-white/40">
                                    <div className="flex justify-between">
                                        <span>SERVER:</span>
                                        <span className="text-[#14b8a6]">ONLINE</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>DATABASE:</span>
                                        <span className="text-[#14b8a6]">CONNECTED</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>REQUESTED_PATH:</span>
                                        <span className="text-[#ff3366]">NOT_FOUND</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>TIMESTAMP:</span>
                                        <span className="text-white/60">{new Date().toISOString()}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-center">
                                <button
                                    onClick={() => navigate(-1)}
                                    className="group flex items-center justify-center gap-2 px-6 py-4 border-2 border-white/[0.15] hover:border-[#14b8a6]/50 bg-black/20 hover:bg-[#14b8a6]/10 transition-all"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                                    <span className="text-xs tracking-[0.15em] text-white/60 group-hover:text-[#14b8a6] transition-colors">
                                        GO_BACK
                                    </span>
                                </button>

                                <Link
                                    to="/"
                                    className="group flex items-center justify-center gap-2 px-6 py-4 border-2 border-[#14b8a6] bg-[#14b8a6]/10 hover:bg-[#14b8a6] transition-all"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <Home className="w-4 h-4" />
                                    <span className="text-xs tracking-[0.15em] text-[#14b8a6] group-hover:text-black transition-colors font-bold">
                                        HOME_PAGE
                                    </span>
                                </Link>

                                <button
                                    onClick={() => window.location.reload()}
                                    className="group flex items-center justify-center gap-2 px-6 py-4 border-2 border-white/[0.15] hover:border-[#14b8a6]/50 bg-black/20 hover:bg-[#14b8a6]/10 transition-all"
                                    style={{ fontFamily: "'JetBrains Mono', monospace" }}
                                >
                                    <RefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                                    <span className="text-xs tracking-[0.15em] text-white/60 group-hover:text-[#14b8a6] transition-colors">
                                        RELOAD
                                    </span>
                                </button>
                            </div>

                            {/* Bottom status bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#14b8a6] to-transparent"></div>
                        </div>
                    </div>

                    {/* Footer info */}
                    <div className="mt-8 text-center" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
                        <p className="text-[10px] text-white/20 tracking-[0.2em]">
                            FOODCHAIN_SUPPLY_SYSTEM © 2025 | ERROR_HANDLER_v2.0
                        </p>
                    </div>

                    {/* Animated corner accents */}
                    <div className="fixed top-4 left-4 w-12 h-12 border-t-2 border-l-2 border-[#14b8a6]/30"></div>
                    <div className="fixed top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-[#14b8a6]/30"></div>
                    <div className="fixed bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-[#14b8a6]/30"></div>
                    <div className="fixed bottom-4 right-4 w-12 h-12 border-b-2 border-r-2 border-[#14b8a6]/30"></div>
                </div>
            </div>

            {/* Pulsing dots in corners */}
            <div className="fixed top-8 left-8 w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse"></div>
            <div className="fixed top-8 right-8 w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse" style={{ animationDelay: '0.5s' }}></div>
            <div className="fixed bottom-8 left-8 w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="fixed bottom-8 right-8 w-2 h-2 bg-[#14b8a6] rounded-full animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        </div>
    )
}
