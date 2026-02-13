import { Link } from 'react-router-dom'
import { Leaf, TrendingUp, Shield, Zap, Users, BarChart3, MapPin, ArrowRight } from 'lucide-react'

export default function HomePage() {
    return (
        <div className="min-h-screen bg-white">
            {/* Custom Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800;900&display=swap');
                
                * {
                    font-family: 'Poppins', -apple-system, sans-serif;
                }
            `}</style>

            {/* Header */}
            <header className="bg-white border-b border-gray-100">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                            <Leaf className="w-6 h-6 text-white" />
                        </div>
                        <span className="text-2xl font-bold text-gray-900">Agrinova</span>
                    </div>
                    <nav className="hidden md:flex items-center gap-8">
                        <Link to="/" className="text-gray-700 hover:text-green-600 font-medium">Home</Link>
                        <Link to="#solutions" className="text-gray-700 hover:text-green-600 font-medium">Solutions</Link>
                        <Link to="#about" className="text-gray-700 hover:text-green-600 font-medium">About</Link>
                        <Link to="#contact" className="text-gray-700 hover:text-green-600 font-medium">Contact</Link>
                    </nav>
                    <div className="flex items-center gap-3">
                        <Link to="/login" className="px-5 py-2 text-gray-700 hover:text-green-600 font-medium">
                            Sign in
                        </Link>
                        <Link to="/register" className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors">
                            Get Started
                        </Link>
                    </div>
                </div>
            </header>

            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-green-50 via-white to-emerald-50 overflow-hidden">
                {/* Background Image */}
                <div className="absolute right-0 top-0 w-1/2 h-full">
                    <img 
                        src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&h=800&fit=crop" 
                        alt="Farmer in field" 
                        className="w-full h-full object-cover opacity-70"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 py-24 lg:py-32">
                    <div className="lg:w-1/2">
                        {/* Tag */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 rounded-full mb-6">
                            <span className="text-sm font-semibold text-green-700">Revolutionizing Agriculture</span>
                        </div>

                        {/* Headline */}
                        <h1 className="text-5xl lg:text-6xl font-black text-gray-900 leading-tight mb-6">
                            Connect.<br />
                            Trade.<br />
                            Thrive.
                        </h1>

                        {/* Subtitle */}
                        <p className="text-xl text-gray-600 mb-8 max-w-xl leading-relaxed">
                            India's first intelligent agricultural marketplace connecting farmers, mandis, and retailers. Fair prices, transparent supply chains, and prosperity for all.
                        </p>

                        {/* CTA */}
                        <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition-all hover:shadow-lg">
                            Start Your Journey
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Role Cards Section */}
            <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10 mb-20">
                <div className="grid md:grid-cols-3 gap-6">
                    {/* Farmer Card */}
                    <Link to="/farmer" className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <Leaf className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Farmer</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Get fair prices for your harvest. Direct market access.
                        </p>
                        <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                            <span>Explore Dashboard</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>

                    {/* Mandi Card */}
                    <Link to="/mandi" className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="w-14 h-14 bg-orange-100 rounded-xl flex items-center justify-center mb-4">
                            <MapPin className="w-7 h-7 text-orange-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Mandi</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Manage inventory. Connect with suppliers and buyers.
                        </p>
                        <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                            <span>View Platform</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>

                    {/* Retailer Card */}
                    <Link to="/retailer" className="group bg-white rounded-2xl shadow-lg border border-gray-100 p-8 hover:shadow-xl transition-all hover:-translate-y-2">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <BarChart3 className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-3">Retailer</h3>
                        <p className="text-gray-600 mb-4 leading-relaxed">
                            Source fresh produce. Optimize your supply chain.
                        </p>
                        <div className="flex items-center gap-2 text-green-600 font-semibold group-hover:gap-3 transition-all">
                            <span>Start Sourcing</span>
                            <ArrowRight className="w-4 h-4" />
                        </div>
                    </Link>
                </div>
            </section>

            {/* Why Choose Agrinova Section */}
            <section className="max-w-7xl mx-auto px-6 py-20">
                <div className="text-center mb-16">
                    <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
                        Why Choose Agrinova
                    </h2>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                        Powered by intelligence, driven by transparency, built for prosperity.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-green-100 rounded-xl flex items-center justify-center mb-4">
                            <TrendingUp className="w-7 h-7 text-green-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Fair Market Prices</h3>
                        <p className="text-gray-600 leading-relaxed">
                            AI-powered pricing ensures fairness for all stakeholders in the supply chain.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <Shield className="w-7 h-7 text-blue-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Secure Transactions</h3>
                        <p className="text-gray-600 leading-relaxed">
                            End-to-end encryption and verified users for complete peace of mind.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-yellow-100 rounded-xl flex items-center justify-center mb-4">
                            <Zap className="w-7 h-7 text-yellow-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Instant Matching</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Smart algorithms connect buyers and sellers in real-time.
                        </p>
                    </div>

                    {/* Feature 4 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-purple-100 rounded-xl flex items-center justify-center mb-4">
                            <MapPin className="w-7 h-7 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Location Intelligence</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Find the nearest mandis with real-time routing and distance calculation.
                        </p>
                    </div>

                    {/* Feature 5 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-pink-100 rounded-xl flex items-center justify-center mb-4">
                            <Users className="w-7 h-7 text-pink-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Community First</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Built by farmers, for farmers. Your feedback shapes our platform.
                        </p>
                    </div>

                    {/* Feature 6 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:shadow-lg transition-shadow">
                        <div className="w-14 h-14 bg-indigo-100 rounded-xl flex items-center justify-center mb-4">
                            <BarChart3 className="w-7 h-7 text-indigo-600" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-3">Analytics Dashboard</h3>
                        <p className="text-gray-600 leading-relaxed">
                            Track trends, forecast demand, and make data-driven decisions.
                        </p>
                    </div>
                </div>
            </section>

            {/* Final CTA Section */}
            <section className="bg-gradient-to-r from-green-600 to-green-700 py-20">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
                        Ready to Transform Agriculture?
                    </h2>
                    <p className="text-xl text-green-50 mb-10 leading-relaxed">
                        Join thousands of farmers, mandis, and retailers building a better future.
                    </p>
                    <Link to="/register" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-green-700 font-bold rounded-lg hover:shadow-2xl transition-all hover:scale-105">
                        Join Agrinova Today
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="max-w-7xl mx-auto px-6 py-12">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-600 to-green-700 flex items-center justify-center">
                                <Leaf className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold text-gray-900">Agrinova</span>
                        </div>
                        <div className="text-gray-500 text-sm">
                            © 2026 Agrinova. Empowering agriculture.
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}
