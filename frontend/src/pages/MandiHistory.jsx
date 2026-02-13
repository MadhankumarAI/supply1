import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Package, TrendingUp, MapPin, Clock, Calendar, ShoppingBag, Map, X } from 'lucide-react'
import { MapContainer, TileLayer, Marker, Polyline, Popup, Circle } from 'react-leaflet'
import { useMandi } from '../context/MandiContext'
import { formatCurrency, formatDate } from '../utils/mandiUtils'
import { RETAILER_LOCATION } from '../data/mandiScenarios'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MandiHistory() {
  const navigate = useNavigate()
  const { orderHistory } = useMandi()
  const [selectedOrderForMap, setSelectedOrderForMap] = useState(null)

  const totalOrders = orderHistory.length
  const totalProfit = orderHistory.reduce((sum, order) => sum + order.profit, 0)
  const totalQuantity = orderHistory.reduce((sum, order) => sum + order.quantity, 0)

  // Custom icons for map
  const retailerIcon = L.divIcon({
    html: '<div style="background: #10b981; width: 24px; height: 24px; border-radius: 50%; border: 3px solid white; box-shadow: 0 2px 8px rgba(0,0,0,0.3);"></div>',
    className: 'custom-icon',
    iconSize: [24, 24],
    iconAnchor: [12, 12]
  })

  const mandiIcon = L.divIcon({
    html: '<div style="background: #ef4444; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; box-shadow: 0 2px 6px rgba(0,0,0,0.3);"></div>',
    className: 'custom-icon',
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/retailer/search')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Order History</h1>
              <p className="text-sm text-gray-400">Track your mandi transactions and profitability</p>
            </div>
            <button
              onClick={() => navigate('/retailer/search')}
              className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25 flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              New Search
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-green-600/20 to-emerald-600/20 border border-green-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-green-600 flex items-center justify-center">
                <Package className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Orders</div>
                <div className="text-3xl font-bold text-white">{totalOrders}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Profit</div>
                <div className="text-3xl font-bold text-white">{formatCurrency(totalProfit)}</div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-purple-600 flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-sm text-gray-400">Total Quantity</div>
                <div className="text-3xl font-bold text-white">{totalQuantity} kg</div>
              </div>
            </div>
          </div>
        </div>

        {/* Order List */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
          {orderHistory.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">No Orders Yet</h3>
              <p className="text-gray-400 mb-6">Start by searching for available mandis</p>
              <button
                onClick={() => navigate('/retailer/search')}
                className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all"
              >
                Search Mandis
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900/50 border-b border-gray-700">
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Date & Time
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Mandi
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Quantity
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Cost
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Profit
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Details
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                      Map
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {orderHistory.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="w-4 h-4 text-gray-400" />
                          <span className="text-white">{formatDate(order.orderDate)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 rounded-lg bg-green-600/20 flex items-center justify-center">
                            <Package className="w-5 h-5 text-green-400" />
                          </div>
                          <div>
                            <div className="text-sm font-semibold text-white">{order.product}</div>
                            <div className="text-xs text-gray-400">{order.scenario}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-medium text-white">{order.mandi.name}</div>
                        <div className="text-xs text-gray-400 flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {order.distance} km
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-white">{order.quantity} kg</div>
                        <div className="text-xs text-gray-400">₹{order.pricePerKg}/kg</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-semibold text-white">{formatCurrency(order.totalCost)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm font-bold text-green-400">{formatCurrency(order.profit)}</div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {order.shelfLife}d
                          </div>
                          <div className="flex items-center gap-1">
                            <TrendingUp className="w-3 h-3" />
                            {order.deliveryTime}h
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => setSelectedOrderForMap(order)}
                          className="p-2 bg-green-600/20 hover:bg-green-600/30 border border-green-500/30 rounded-lg transition-all group"
                          title="View map route"
                        >
                          <Map className="w-4 h-4 text-green-400 group-hover:scale-110 transition-transform" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
