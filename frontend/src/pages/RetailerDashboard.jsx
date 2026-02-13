import { useState, useEffect, useCallback } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, Circle, useMap, Polyline } from 'react-leaflet'
import L from 'leaflet'
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler } from 'chart.js'
import { Line, Bar as BarChart, Doughnut, Radar, PolarArea } from 'react-chartjs-2'
import { 
    Package, ShoppingCart, TrendingUp, TrendingDown, MapPin, Phone, 
    User, Globe, Plus, Edit2, Trash2, Calendar, DollarSign, Truck,
    AlertCircle, CheckCircle, Clock, RefreshCw, BarChart3, PieChart,
    Save, X, Zap, Activity, Navigation, Radio
} from 'lucide-react'
import api from '../services/api'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, RadialLinearScale, Title, Tooltip, Legend, Filler)

const TABS = [
    { id: 'overview', label: '📊 Overview', icon: BarChart3 },
    { id: 'inventory', label: '📦 Inventory', icon: Package },
    { id: 'orders', label: '🚛 Orders', icon: Truck },
    { id: 'analytics', label: '📈 Analytics', icon: PieChart },
    { id: 'profile', label: '👤 Profile', icon: User },
]

const CROP_EMOJIS = {
    tomato: '🍅', onion: '🧅', potato: '🥔', carrot: '🥕', cabbage: '🥬',
    wheat: '🌾', rice: '🍚', chilli: '🌶️', apple: '🍎', banana: '🍌',
    default: '🌿'
}

const retailIcon = new L.DivIcon({ html: '<div style="font-size:28px;filter:drop-shadow(0 2px 6px rgba(0,0,0,.6))">🛒</div>', className: '', iconSize: [32, 32], iconAnchor: [16, 32] })
const mandiIcon = new L.DivIcon({ html: '<div style="font-size:24px;filter:drop-shadow(0 2px 4px rgba(0,0,0,.4))">🏪</div>', className: '', iconSize: [28, 28], iconAnchor: [14, 28] })

function MapFly({ center }) {
    const map = useMap()
    useEffect(() => { if (center) map.flyTo(center, 12, { duration: 1 }) }, [center])
    return null
}

function useGoogleTranslate() {
    useEffect(() => {
        const s = document.createElement('style')
        s.textContent = `.goog-te-banner-frame{display:none!important}body{top:0!important}.goog-te-gadget{font-size:0!important}.goog-te-gadget .goog-te-combo{background:rgba(20,184,166,.15)!important;color:#5eead4!important;border:1.5px solid rgba(20,184,166,.3)!important;border-radius:10px!important;padding:6px 12px!important;font-size:12px!important;font-weight:600!important;outline:none!important;cursor:pointer!important}.goog-te-gadget .goog-te-combo:hover{background:rgba(20,184,166,.2)!important;border-color:rgba(20,184,166,.5)!important}.goog-te-gadget .goog-te-combo option{background:#1a1a1a!important;color:#fff!important}#google_translate_element{display:inline-block}.skiptranslate iframe{display:none!important}`
        document.head.appendChild(s)
        window.googleTranslateElementInit = () => { new window.google.translate.TranslateElement({ pageLanguage: 'en', includedLanguages: 'hi,kn,te,ta,mr,bn,gu,pa,ml', layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE, autoDisplay: false }, 'google_translate_element') }
        if (!document.querySelector('script[src*="translate.google.com"]')) { const sc = document.createElement('script'); sc.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit'; sc.async = true; document.body.appendChild(sc) }
        else if (window.google?.translate) window.googleTranslateElementInit()
        return () => document.head.removeChild(s)
    }, [])
}

const chartOpts = (title) => ({
    responsive: true, maintainAspectRatio: false,
    plugins: { 
        legend: { labels: { color: '#fff', font: { size: 11 } } }, 
        title: { display: !!title, text: title, color: '#14b8a6', font: { size: 13, weight: 'bold' } } 
    },
    scales: { 
        x: { ticks: { color: '#ffffff60', font: { size: 10 } }, grid: { color: '#ffffff08' } }, 
        y: { ticks: { color: '#ffffff60', font: { size: 10 } }, grid: { color: '#ffffff08' } } 
    },
})

export default function RetailerDashboard() {
    const navigate = useNavigate()
    useGoogleTranslate()
    
    const [tab, setTab] = useState('overview')
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState(null)
    const [items, setItems] = useState([])
    const [orders, setOrders] = useState([])
    const [lastUpdated, setLastUpdated] = useState(new Date())
    const [autoRefresh, setAutoRefresh] = useState(true)
    const [selectedOrder, setSelectedOrder] = useState(null)
    
    // Modals
    const [showAddItem, setShowAddItem] = useState(false)
    const [showAddOrder, setShowAddOrder] = useState(false)
    const [editingItem, setEditingItem] = useState(null)
    const [editingOrder, setEditingOrder] = useState(null)
    const [editingProfile, setEditingProfile] = useState(false)
    
    // Forms
    const [itemForm, setItemForm] = useState({ name: '', item: '', quantity: 0 })
    const [orderForm, setOrderForm] = useState({ 
        src_lat: 0, src_long: 0, dest_lat: 0, dest_long: 0, 
        item: '', price_per_kg: 0, quantity: 0, 
        start_time: '', order_date: '' 
    })
    const [profileForm, setProfileForm] = useState({ contact: '', latitude: 0, longitude: 0, language: 'English' })

    useEffect(() => {
        const u = JSON.parse(localStorage.getItem('user') || '{}')
        if (!u.access_token && !localStorage.getItem('token')) { 
            navigate('/login')
            return 
        }
        loadAll()
    }, [])

    // Real-time auto-refresh every 30 seconds
    useEffect(() => {
        if (!autoRefresh) return
        const interval = setInterval(() => {
            loadAll()
        }, 30000) // 30 seconds
        return () => clearInterval(interval)
    }, [autoRefresh])

    const loadAll = async () => {
        setLoading(true)
        try {
            const [profileRes, itemsRes, ordersRes] = await Promise.allSettled([
                api.get('/retailer/profile'),
                api.get('/retailer/items'),
                api.get('/retailer/orders'),
            ])
            if (profileRes.status === 'fulfilled') {
                setProfile(profileRes.value.data)
                setProfileForm({
                    contact: profileRes.value.data.user?.contact || '',
                    latitude: profileRes.value.data.user?.latitude || 0,
                    longitude: profileRes.value.data.user?.longitude || 0,
                    language: profileRes.value.data.language || 'English'
                })
            }
            if (itemsRes.status === 'fulfilled') setItems(itemsRes.value.data || [])
            if (ordersRes.status === 'fulfilled') setOrders(ordersRes.value.data || [])
            setLastUpdated(new Date())
        } catch (err) {
            console.error('Failed to load:', err)
        }
        setLoading(false)
    }

    // Item Operations
    const handleAddItem = async () => {
        try {
            await api.post('/retailer/items', itemForm)
            setItemForm({ name: '', item: '', quantity: 0 })
            setShowAddItem(false)
            loadAll()
        } catch (err) {
            console.error('Failed to add item:', err)
        }
    }

    const handleUpdateItem = async () => {
        try {
            await api.put(`/retailer/items/${editingItem.id}`, itemForm)
            setEditingItem(null)
            setItemForm({ name: '', item: '', quantity: 0 })
            loadAll()
        } catch (err) {
            console.error('Failed to update item:', err)
        }
    }

    const handleDeleteItem = async (id) => {
        if (!confirm('Delete this item?')) return
        try {
            await api.delete(`/retailer/items/${id}`)
            loadAll()
        } catch (err) {
            console.error('Failed to delete item:', err)
        }
    }

    // Order Operations
    const handleAddOrder = async () => {
        try {
            const payload = {
                ...orderForm,
                src_lat: parseFloat(orderForm.src_lat) || profile?.user?.latitude || 0,
                src_long: parseFloat(orderForm.src_long) || profile?.user?.longitude || 0,
                dest_lat: parseFloat(orderForm.dest_lat) || 0,
                dest_long: parseFloat(orderForm.dest_long) || 0,
                price_per_kg: parseFloat(orderForm.price_per_kg) || 0,
                quantity: parseFloat(orderForm.quantity) || 0,
                start_time: orderForm.start_time || new Date().toISOString(),
                order_date: orderForm.order_date || new Date().toISOString(),
            }
            await api.post('/retailer/orders', payload)
            setOrderForm({ src_lat: 0, src_long: 0, dest_lat: 0, dest_long: 0, item: '', price_per_kg: 0, quantity: 0, start_time: '', order_date: '' })
            setShowAddOrder(false)
            loadAll()
        } catch (err) {
            console.error('Failed to add order:', err)
        }
    }

    const handleUpdateOrder = async () => {
        try {
            const payload = {
                src_lat: parseFloat(orderForm.src_lat) || 0,
                src_long: parseFloat(orderForm.src_long) || 0,
                dest_lat: parseFloat(orderForm.dest_lat) || 0,
                dest_long: parseFloat(orderForm.dest_long) || 0,
                item: orderForm.item,
                price_per_kg: parseFloat(orderForm.price_per_kg) || 0,
                quantity: parseFloat(orderForm.quantity) || 0,
                start_time: orderForm.start_time || new Date().toISOString(),
                order_date: orderForm.order_date || new Date().toISOString(),
            }
            await api.put(`/retailer/orders/${editingOrder.id}`, payload)
            setEditingOrder(null)
            setOrderForm({ src_lat: 0, src_long: 0, dest_lat: 0, dest_long: 0, item: '', price_per_kg: 0, quantity: 0, start_time: '', order_date: '' })
            loadAll()
        } catch (err) {
            console.error('Failed to update order:', err)
        }
    }

    const handleDeleteOrder = async (id) => {
        if (!confirm('Delete this order?')) return
        try {
            await api.delete(`/retailer/orders/${id}`)
            loadAll()
        } catch (err) {
            console.error('Failed to delete order:', err)
        }
    }

    // Profile Update
    const handleUpdateProfile = async () => {
        try {
            await api.put('/retailer/profile', profileForm)
            setEditingProfile(false)
            loadAll()
        } catch (err) {
            console.error('Failed to update profile:', err)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        navigate('/login')
    }

    // Analytics calculations
    const totalStock = items.reduce((sum, i) => sum + parseFloat(i.quantity || 0), 0)
    const totalOrderValue = orders.reduce((sum, o) => sum + (o.price_per_kg * o.quantity), 0)
    const avgOrderSize = orders.length > 0 ? totalOrderValue / orders.length : 0
    
    // Chart data for inventory distribution
    const inventoryChartData = {
        labels: items.map(i => i.item),
        datasets: [{
            data: items.map(i => i.quantity),
            backgroundColor: [
                'rgba(20, 184, 166, 0.8)',
                'rgba(34, 197, 94, 0.8)',
                'rgba(59, 130, 246, 0.8)',
                'rgba(249, 115, 22, 0.8)',
                'rgba(168, 85, 247, 0.8)',
                'rgba(236, 72, 153, 0.8)',
            ],
            borderColor: '#0a0a0a',
            borderWidth: 2,
        }]
    }

    // Orders timeline chart
    const ordersTimelineData = {
        labels: orders.slice(0, 10).map((o, i) => `Order ${i + 1}`),
        datasets: [{
            label: 'Order Value (₹)',
            data: orders.slice(0, 10).map(o => o.price_per_kg * o.quantity),
            backgroundColor: 'rgba(20, 184, 166, 0.6)',
            borderColor: '#14b8a6',
            borderWidth: 2,
        }]
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white/40">
                <RefreshCw className="w-8 h-8 animate-spin mr-3 text-teal-400" />
                <span className="text-lg">Loading retailer dashboard...</span>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white" style={{ fontFamily: "'Inter','Segoe UI',sans-serif" }}>
            {/* NAV */}
            <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/[0.06]">
                <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <Link to="/retailer" className="flex items-center gap-2">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <ShoppingCart className="w-5 h-5 text-black" />
                            </div>
                            <span className="text-sm font-bold">FoodChain <span className="text-teal-400">Retail</span></span>
                        </Link>
                        <span className="px-2.5 py-1 rounded-full bg-teal-500/15 text-teal-400 text-[9px] font-bold uppercase tracking-widest">Smart Inventory</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-teal-500/10 to-cyan-500/10 border border-teal-500/20 hover:border-teal-500/40 transition-all">
                            <Globe className="w-4 h-4 text-teal-400" />
                            <div id="google_translate_element" className="flex items-center"></div>
                        </div>
                        <button onClick={handleLogout} className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-xs text-white/50 hover:text-white transition-all">
                            Logout
                        </button>
                    </div>
                </div>
            </nav>

            {/* TABS */}
            <div className="sticky top-[57px] z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.04]">
                <div className="max-w-7xl mx-auto px-4 flex gap-1 overflow-x-auto py-2">
                    {TABS.map(t => (
                        <button 
                            key={t.id} 
                            onClick={() => setTab(t.id)} 
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                                tab === t.id 
                                    ? 'bg-teal-500/20 text-teal-400 shadow-lg shadow-teal-500/10' 
                                    : 'text-white/35 hover:text-white/60 hover:bg-white/[0.04]'
                            }`}
                        >
                            <t.icon className="w-4 h-4" />
                            {t.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-4 md:p-6">

                {/* ═══ OVERVIEW TAB ═══ */}
                {tab === 'overview' && (
                    <div className="space-y-6">
                        {/* Welcome Banner */}
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-teal-500/10 via-cyan-500/5 to-blue-500/10 border border-teal-500/20 p-8">
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute top-0 left-0 w-40 h-40 bg-teal-400 rounded-full blur-3xl"></div>
                                <div className="absolute bottom-0 right-0 w-40 h-40 bg-cyan-400 rounded-full blur-3xl"></div>
                            </div>
                            <div className="relative flex items-center justify-between">
                                <div>
                                    <h1 className="text-3xl font-black mb-2">Welcome back, {profile?.user?.username}! 🛒</h1>
                                    <p className="text-white/60 text-sm">Your retail command center • Manage inventory • Track orders • Optimize stock</p>
                                </div>
                                <div className="text-6xl animate-bounce hidden sm:block">📊</div>
                            </div>
                        </div>

                        {/* KPI Cards */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="p-5 rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/10 to-teal-500/5 hover:scale-[1.02] transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <Package className="w-8 h-8 text-teal-400" />
                                    <div className="text-3xl font-black text-teal-400">{items.length}</div>
                                </div>
                                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Inventory Items</div>
                            </div>
                            
                            <div className="p-5 rounded-2xl border border-cyan-500/20 bg-gradient-to-br from-cyan-500/10 to-cyan-500/5 hover:scale-[1.02] transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <Truck className="w-8 h-8 text-cyan-400" />
                                    <div className="text-3xl font-black text-cyan-400">{orders.length}</div>
                                </div>
                                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Active Orders</div>
                            </div>
                            
                            <div className="p-5 rounded-2xl border border-emerald-500/20 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 hover:scale-[1.02] transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <TrendingUp className="w-8 h-8 text-emerald-400" />
                                    <div className="text-3xl font-black text-emerald-400">{totalStock.toFixed(0)}</div>
                                </div>
                                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Total Stock (kg)</div>
                            </div>
                            
                            <div className="p-5 rounded-2xl border border-blue-500/20 bg-gradient-to-br from-blue-500/10 to-blue-500/5 hover:scale-[1.02] transition-all">
                                <div className="flex items-center justify-between mb-3">
                                    <DollarSign className="w-8 h-8 text-blue-400" />
                                    <div className="text-3xl font-black text-blue-400">₹{(totalOrderValue/1000).toFixed(1)}K</div>
                                </div>
                                <div className="text-xs text-white/40 font-medium uppercase tracking-wider">Order Value</div>
                            </div>
                        </div>

                        {/* Charts Row */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Inventory Distribution */}
                            {items.length > 0 && (
                                <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                    <h3 className="text-sm font-bold text-teal-400 mb-4 flex items-center gap-2">
                                        <PieChart className="w-4 h-4" />
                                        Inventory Distribution
                                    </h3>
                                    <div style={{ height: 260 }}>
                                        <Doughnut data={inventoryChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff', font: { size: 10 } } } } }} />
                                    </div>
                                </div>
                            )}

                            {/* Orders Value Chart */}
                            {orders.length > 0 && (
                                <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                    <h3 className="text-sm font-bold text-teal-400 mb-4 flex items-center gap-2">
                                        <BarChart3 className="w-4 h-4" />
                                        Recent Orders Value
                                    </h3>
                                    <div style={{ height: 260 }}>
                                        <BarChart data={ordersTimelineData} options={chartOpts()} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className="p-6 rounded-2xl border border-teal-500/20 bg-gradient-to-br from-teal-500/5 to-cyan-500/5">
                            <h3 className="text-sm font-bold text-teal-400 mb-4">🚀 Quick Actions</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                                <button 
                                    onClick={() => { setTab('inventory'); setShowAddItem(true); }}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-teal-500/10 hover:border-teal-500/30 transition-all group"
                                >
                                    <Plus className="w-6 h-6 text-teal-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-xs font-semibold">Add Item</div>
                                </button>
                                <button 
                                    onClick={() => { setTab('orders'); setShowAddOrder(true); }}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-cyan-500/10 hover:border-cyan-500/30 transition-all group"
                                >
                                    <Truck className="w-6 h-6 text-cyan-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-xs font-semibold">New Order</div>
                                </button>
                                <button 
                                    onClick={() => setTab('inventory')}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-emerald-500/10 hover:border-emerald-500/30 transition-all group"
                                >
                                    <Package className="w-6 h-6 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-xs font-semibold">View Stock</div>
                                </button>
                                <button 
                                    onClick={() => setTab('analytics')}
                                    className="p-4 rounded-xl bg-white/5 border border-white/10 hover:bg-blue-500/10 hover:border-blue-500/30 transition-all group"
                                >
                                    <TrendingUp className="w-6 h-6 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                    <div className="text-xs font-semibold">Analytics</div>
                                </button>
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Recent Items */}
                            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                <h3 className="text-sm font-bold text-teal-400 mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Package className="w-4 h-4" />
                                        Recent Items
                                    </span>
                                    <button onClick={() => setTab('inventory')} className="text-xs text-white/40 hover:text-teal-400 transition-colors">
                                        View All →
                                    </button>
                                </h3>
                                <div className="space-y-2">
                                    {items.slice(0, 5).map(item => (
                                        <div key={item.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-all">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{CROP_EMOJIS[item.item?.toLowerCase()] || CROP_EMOJIS.default}</span>
                                                <div>
                                                    <div className="text-sm font-semibold">{item.item}</div>
                                                    <div className="text-xs text-white/40">{item.name}</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-teal-400">{item.quantity}kg</div>
                                            </div>
                                        </div>
                                    ))}
                                    {items.length === 0 && (
                                        <div className="text-center py-8 text-white/30 text-sm">
                                            <Package className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                            No items yet
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Recent Orders */}
                            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                <h3 className="text-sm font-bold text-teal-400 mb-4 flex items-center justify-between">
                                    <span className="flex items-center gap-2">
                                        <Truck className="w-4 h-4" />
                                        Recent Orders
                                    </span>
                                    <button onClick={() => setTab('orders')} className="text-xs text-white/40 hover:text-teal-400 transition-colors">
                                        View All →
                                    </button>
                                </h3>
                                <div className="space-y-2">
                                    {orders.slice(0, 5).map(order => (
                                        <div key={order.id} className="flex items-center justify-between p-3 rounded-xl bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.04] transition-all">
                                            <div className="flex items-center gap-3">
                                                <span className="text-2xl">{CROP_EMOJIS[order.item?.toLowerCase()] || CROP_EMOJIS.default}</span>
                                                <div>
                                                    <div className="text-sm font-semibold">{order.item}</div>
                                                    <div className="text-xs text-white/40">{order.quantity}kg @ ₹{order.price_per_kg}/kg</div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="text-sm font-bold text-cyan-400">₹{(order.price_per_kg * order.quantity).toLocaleString()}</div>
                                                <div className="text-xs text-white/30">{order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</div>
                                            </div>
                                        </div>
                                    ))}
                                    {orders.length === 0 && (
                                        <div className="text-center py-8 text-white/30 text-sm">
                                            <Truck className="w-12 h-12 mx-auto mb-2 opacity-30" />
                                            No orders yet
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* ═══ INVENTORY TAB ═══ */}
                {tab === 'inventory' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black flex items-center gap-2">
                                    <Package className="w-6 h-6 text-teal-400" />
                                    Inventory Management
                                </h2>
                                <p className="text-sm text-white/40 mt-1">{items.length} items • {totalStock.toFixed(0)}kg total stock</p>
                            </div>
                            <button 
                                onClick={() => { setShowAddItem(true); setItemForm({ name: '', item: '', quantity: 0 }); }}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-500 text-black font-bold hover:bg-teal-400 transition-all shadow-lg shadow-teal-500/20"
                            >
                                <Plus className="w-4 h-4" />
                                Add Item
                            </button>
                        </div>

                        {(showAddItem || editingItem) && (
                            <div className="p-6 rounded-2xl border-2 border-teal-500/30 bg-gradient-to-br from-teal-500/10 to-cyan-500/5">
                                <h3 className="text-lg font-bold mb-4">{editingItem ? '✏️ Edit Item' : '➕ Add New Item'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Store Name</label>
                                        <input type="text" placeholder="e.g., Main Store" value={itemForm.name}
                                            onChange={e => setItemForm({ ...itemForm, name: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-teal-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Item Name</label>
                                        <input type="text" placeholder="e.g., Tomato" value={itemForm.item}
                                            onChange={e => setItemForm({ ...itemForm, item: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-teal-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Quantity (kg)</label>
                                        <input type="number" placeholder="0" value={itemForm.quantity}
                                            onChange={e => setItemForm({ ...itemForm, quantity: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-teal-500/50"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={editingItem ? handleUpdateItem : handleAddItem}
                                        className="px-6 py-3 rounded-xl bg-teal-500 text-black font-bold hover:bg-teal-400 transition-all">
                                        {editingItem ? 'Update' : 'Add'} Item
                                    </button>
                                    <button onClick={() => { setShowAddItem(false); setEditingItem(null); setItemForm({ name: '', item: '', quantity: 0 }); }}
                                        className="px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {items.map(item => (
                                <div key={item.id} className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-teal-500/[0.03] hover:border-teal-500/20 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{CROP_EMOJIS[item.item?.toLowerCase()] || CROP_EMOJIS.default}</span>
                                            <div>
                                                <div className="text-lg font-bold">{item.item}</div>
                                                <div className="text-xs text-white/40">{item.name}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingItem(item); setItemForm({ name: item.name, item: item.item, quantity: item.quantity }); }}
                                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => handleDeleteItem(item.id)}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-white/40">Stock:</span>
                                            <span className="font-bold text-teal-400">{item.quantity} kg</span>
                                        </div>
                                        <div className="w-full h-2 rounded-full bg-white/[0.06] overflow-hidden">
                                            <div className={`h-full rounded-full transition-all ${item.quantity > 50 ? 'bg-green-500' : item.quantity > 20 ? 'bg-yellow-500' : 'bg-red-500'}`}
                                                style={{ width: `${Math.min(100, (item.quantity / 100) * 100)}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-2 text-xs">
                                            {item.quantity > 50 ? (
                                                <><CheckCircle className="w-3 h-3 text-green-400" /><span className="text-green-400">Healthy Stock</span></>
                                            ) : item.quantity > 20 ? (
                                                <><AlertCircle className="w-3 h-3 text-yellow-400" /><span className="text-yellow-400">Low Stock</span></>
                                            ) : (
                                                <><AlertCircle className="w-3 h-3 text-red-400" /><span className="text-red-400">Critical</span></>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {items.length === 0 && !showAddItem && (
                            <div className="text-center py-20">
                                <Package className="w-16 h-16 mx-auto mb-4 text-white/10" />
                                <h3 className="text-xl font-bold text-white/40 mb-2">No inventory items yet</h3>
                                <p className="text-sm text-white/30 mb-6">Start by adding your first inventory item</p>
                                <button onClick={() => setShowAddItem(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-teal-500 text-black font-bold hover:bg-teal-400 transition-all">
                                    <Plus className="w-4 h-4" />
                                    Add First Item
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ ORDERS TAB ═══ */}
                {tab === 'orders' && (
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h2 className="text-2xl font-black flex items-center gap-2">
                                    <Truck className="w-6 h-6 text-cyan-400" />
                                    Order Management
                                </h2>
                                <p className="text-sm text-white/40 mt-1">{orders.length} orders • ₹{(totalOrderValue/1000).toFixed(1)}K total value</p>
                            </div>
                            <button onClick={() => { setShowAddOrder(true); setOrderForm({ ...orderForm, src_lat: profile?.user?.latitude || 0, src_long: profile?.user?.longitude || 0 }); }}
                                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all shadow-lg shadow-cyan-500/20">
                                <Plus className="w-4 h-4" />
                                New Order
                            </button>
                        </div>

                        {(showAddOrder || editingOrder) && (
                            <div className="p-6 rounded-2xl border-2 border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-blue-500/5">
                                <h3 className="text-lg font-bold mb-4">{editingOrder ? '✏️ Edit Order' : '➕ Create New Order'}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Item Name</label>
                                        <input type="text" placeholder="e.g., Tomato" value={orderForm.item}
                                            onChange={e => setOrderForm({ ...orderForm, item: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Quantity (kg)</label>
                                        <input type="number" placeholder="0" value={orderForm.quantity}
                                            onChange={e => setOrderForm({ ...orderForm, quantity: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Price per kg (₹)</label>
                                        <input type="number" placeholder="0" value={orderForm.price_per_kg}
                                            onChange={e => setOrderForm({ ...orderForm, price_per_kg: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Destination Lat</label>
                                        <input type="number" step="0.0001" placeholder="0" value={orderForm.dest_lat}
                                            onChange={e => setOrderForm({ ...orderForm, dest_lat: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Destination Long</label>
                                        <input type="number" step="0.0001" placeholder="0" value={orderForm.dest_long}
                                            onChange={e => setOrderForm({ ...orderForm, dest_long: parseFloat(e.target.value) || 0 })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Order Date</label>
                                        <input type="date" value={orderForm.order_date ? orderForm.order_date.split('T')[0] : ''}
                                            onChange={e => setOrderForm({ ...orderForm, order_date: e.target.value ? new Date(e.target.value).toISOString() : '' })}
                                            className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-500/50"
                                        />
                                    </div>
                                </div>
                                <div className="flex gap-3">
                                    <button onClick={editingOrder ? handleUpdateOrder : handleAddOrder}
                                        className="px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all">
                                        {editingOrder ? 'Update' : 'Create'} Order
                                    </button>
                                    <button onClick={() => { setShowAddOrder(false); setEditingOrder(null); setOrderForm({ src_lat: 0, src_long: 0, dest_lat: 0, dest_long: 0, item: '', price_per_kg: 0, quantity: 0, start_time: '', order_date: '' }); }}
                                        className="px-6 py-3 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 transition-all">
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {orders.length > 0 && profile?.user?.latitude && (
                            <div className="rounded-2xl overflow-hidden border border-white/[0.06]" style={{ height: 400 }}>
                                <MapContainer center={[profile.user.latitude, profile.user.longitude]} zoom={12} style={{ height: '100%', width: '100%' }}>
                                    <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                                    <Marker position={[profile.user.latitude, profile.user.longitude]} icon={retailIcon}>
                                        <Popup><b>🛒 Your Store</b></Popup>
                                    </Marker>
                                    {orders.filter(o => o.dest_lat && o.dest_long).map(o => (
                                        <Marker key={o.id} position={[o.dest_lat, o.dest_long]} icon={mandiIcon}>
                                            <Popup><b>{o.item}</b><br />{o.quantity}kg @ ₹{o.price_per_kg}/kg</Popup>
                                        </Marker>
                                    ))}
                                </MapContainer>
                            </div>
                        )}

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                            {orders.map(order => (
                                <div key={order.id} className="group p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-cyan-500/[0.03] hover:border-cyan-500/20 transition-all">
                                    <div className="flex items-start justify-between mb-3">
                                        <div className="flex items-center gap-3">
                                            <span className="text-3xl">{CROP_EMOJIS[order.item?.toLowerCase()] || CROP_EMOJIS.default}</span>
                                            <div>
                                                <div className="text-lg font-bold">{order.item}</div>
                                                <div className="text-xs text-white/40">{order.quantity}kg @ ₹{order.price_per_kg}/kg</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button onClick={() => { setEditingOrder(order); setOrderForm({ src_lat: order.src_lat, src_long: order.src_long, dest_lat: order.dest_lat, dest_long: order.dest_long, item: order.item, price_per_kg: order.price_per_kg, quantity: order.quantity, start_time: order.start_time, order_date: order.order_date }); }}
                                                className="p-2 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all">
                                                <Edit2 className="w-3 h-3" />
                                            </button>
                                            <button onClick={() => handleDeleteOrder(order.id)}
                                                className="p-2 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all">
                                                <Trash2 className="w-3 h-3" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="grid grid-cols-3 gap-3 text-xs">
                                        <div className="p-2 rounded-lg bg-white/[0.03]">
                                            <div className="text-white/30">Total Value</div>
                                            <div className="text-sm font-bold text-cyan-400 mt-1">₹{(order.price_per_kg * order.quantity).toLocaleString()}</div>
                                        </div>
                                        <div className="p-2 rounded-lg bg-white/[0.03]">
                                            <div className="text-white/30">Date</div>
                                            <div className="text-sm font-medium mt-1">{order.order_date ? new Date(order.order_date).toLocaleDateString() : 'N/A'}</div>
                                        </div>
                                        <div className="p-2 rounded-lg bg-white/[0.03]">
                                            <div className="text-white/30">Status</div>
                                            <div className="text-sm font-medium mt-1 text-green-400">Active</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {orders.length === 0 && !showAddOrder && (
                            <div className="text-center py-20">
                                <Truck className="w-16 h-16 mx-auto mb-4 text-white/10" />
                                <h3 className="text-xl font-bold text-white/40 mb-2">No orders yet</h3>
                                <p className="text-sm text-white/30 mb-6">Create your first order to get started</p>
                                <button onClick={() => setShowAddOrder(true)}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-400 transition-all">
                                    <Plus className="w-4 h-4" />
                                    Create First Order
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ ANALYTICS TAB ═══ */}
                {tab === 'analytics' && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black flex items-center gap-2 mb-2">
                                <PieChart className="w-6 h-6 text-blue-400" />
                                Business Analytics
                            </h2>
                            <p className="text-sm text-white/40">Insights and trends for your retail business</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-teal-500/5 to-transparent">
                                <div className="text-sm text-white/40 mb-2">Avg Order Value</div>
                                <div className="text-3xl font-black text-teal-400">₹{avgOrderSize.toFixed(0)}</div>
                            </div>
                            <div className="p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-cyan-500/5 to-transparent">
                                <div className="text-sm text-white/40 mb-2">Total Revenue</div>
                                <div className="text-3xl font-black text-cyan-400">₹{(totalOrderValue/1000).toFixed(1)}K</div>
                            </div>
                            <div className="p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-emerald-500/5 to-transparent">
                                <div className="text-sm text-white/40 mb-2">Stock Value</div>
                                <div className="text-3xl font-black text-emerald-400">{totalStock.toFixed(0)}kg</div>
                            </div>
                            <div className="p-5 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-blue-500/5 to-transparent">
                                <div className="text-sm text-white/40 mb-2">Total Items</div>
                                <div className="text-3xl font-black text-blue-400">{items.length}</div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {items.length > 0 && (
                                <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                    <h3 className="text-sm font-bold text-teal-400 mb-4">📦 Stock Distribution</h3>
                                    <div style={{ height: 280 }}>
                                        <Doughnut data={inventoryChartData} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { labels: { color: '#fff', font: { size: 10 } } } } }} />
                                    </div>
                                </div>
                            )}

                            {items.length > 0 && (
                                <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                    <h3 className="text-sm font-bold text-teal-400 mb-4">📈 Stock Levels Trend</h3>
                                    <div style={{ height: 280 }}>
                                        <Line data={stockTrendData} options={chartOpts()} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {orders.length > 0 && (
                            <div className="p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                <h3 className="text-sm font-bold text-cyan-400 mb-4">💰 Order Value Timeline</h3>
                                <div style={{ height: 300 }}>
                                    <BarChart data={ordersTimelineData} options={chartOpts('Recent Orders Performance')} />
                                </div>
                            </div>
                        )}

                        {items.length === 0 && orders.length === 0 && (
                            <div className="text-center py-20">
                                <PieChart className="w-16 h-16 mx-auto mb-4 text-white/10" />
                                <h3 className="text-xl font-bold text-white/40 mb-2">No analytics data yet</h3>
                                <p className="text-sm text-white/30">Add items and create orders to see analytics</p>
                            </div>
                        )}
                    </div>
                )}

                {/* ═══ PROFILE TAB ═══ */}
                {tab === 'profile' && profile && (
                    <div className="space-y-6">
                        <div>
                            <h2 className="text-2xl font-black flex items-center gap-2 mb-2">
                                <User className="w-6 h-6 text-purple-400" />
                                Profile Settings
                            </h2>
                            <p className="text-sm text-white/40">Manage your account information</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="lg:col-span-1 p-6 rounded-2xl border border-white/[0.06] bg-gradient-to-br from-purple-500/5 to-transparent">
                                <div className="text-center">
                                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-400 to-cyan-600 flex items-center justify-center text-3xl mx-auto mb-4">
                                        <User className="w-10 h-10 text-black" />
                                    </div>
                                    <h3 className="text-xl font-bold mb-1">{profile.user?.username}</h3>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/15 text-teal-400 text-xs font-semibold uppercase">
                                        <ShoppingCart className="w-3 h-3" />
                                        Retailer
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-lg font-bold">Account Information</h3>
                                    {!editingProfile ? (
                                        <button onClick={() => setEditingProfile(true)}
                                            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500/20 text-teal-400 hover:bg-teal-500/30 transition-all">
                                            <Edit2 className="w-4 h-4" />
                                            Edit
                                        </button>
                                    ) : (
                                        <div className="flex gap-2">
                                            <button onClick={handleUpdateProfile}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-teal-500 text-black font-bold hover:bg-teal-400 transition-all">
                                                <Save className="w-4 h-4" />
                                                Save
                                            </button>
                                            <button onClick={() => { setEditingProfile(false); setProfileForm({ contact: profile.user?.contact || '', latitude: profile.user?.latitude || 0, longitude: profile.user?.longitude || 0, language: profile.language || 'English' }); }}
                                                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 text-white/60 hover:bg-white/10 transition-all">
                                                <X className="w-4 h-4" />
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Username</label>
                                        <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white/40">
                                            {profile.user?.username}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Contact Number</label>
                                        {editingProfile ? (
                                            <input type="tel" value={profileForm.contact}
                                                onChange={e => setProfileForm({ ...profileForm, contact: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                                            />
                                        ) : (
                                            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                                <Phone className="w-4 h-4 inline mr-2 text-teal-400" />
                                                {profile.user?.contact || 'Not set'}
                                            </div>
                                        )}
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="text-xs font-semibold text-white/60 block mb-2">Latitude</label>
                                            {editingProfile ? (
                                                <input type="number" step="0.0001" value={profileForm.latitude}
                                                    onChange={e => setProfileForm({ ...profileForm, latitude: parseFloat(e.target.value) || 0 })}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                                                />
                                            ) : (
                                                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                                    <MapPin className="w-4 h-4 inline mr-2 text-teal-400" />
                                                    {profile.user?.latitude?.toFixed(4)}
                                                </div>
                                            )}
                                        </div>
                                        <div>
                                            <label className="text-xs font-semibold text-white/60 block mb-2">Longitude</label>
                                            {editingProfile ? (
                                                <input type="number" step="0.0001" value={profileForm.longitude}
                                                    onChange={e => setProfileForm({ ...profileForm, longitude: parseFloat(e.target.value) || 0 })}
                                                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50"
                                                />
                                            ) : (
                                                <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                                    <MapPin className="w-4 h-4 inline mr-2 text-teal-400" />
                                                    {profile.user?.longitude?.toFixed(4)}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-white/60 block mb-2">Preferred Language</label>
                                        {editingProfile ? (
                                            <select value={profileForm.language}
                                                onChange={e => setProfileForm({ ...profileForm, language: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-teal-500/50">
                                                <option value="English">English</option>
                                                <option value="Hindi">Hindi</option>
                                                <option value="Kannada">Kannada</option>
                                                <option value="Telugu">Telugu</option>
                                                <option value="Tamil">Tamil</option>
                                            </select>
                                        ) : (
                                            <div className="px-4 py-3 rounded-xl bg-white/5 border border-white/10">
                                                <Globe className="w-4 h-4 inline mr-2 text-teal-400" />
                                                {profile.language}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
