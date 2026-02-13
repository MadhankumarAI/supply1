import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapContainer, TileLayer, Marker, Popup, Polyline, Circle } from 'react-leaflet'
import { ArrowLeft, TrendingUp, Clock, MapPin, Package, AlertCircle, Check } from 'lucide-react'
import { useMandi } from '../context/MandiContext'
import { 
  filterQualifiedMandis, 
  calculateMandiMetrics, 
  rankMandis, 
  generateReasoning,
  formatCurrency 
} from '../utils/mandiUtils'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'

// Fix leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

export default function MandiResults() {
  const navigate = useNavigate()
  const { currentSearch, setSelectedMandi } = useMandi()
  const [rankedMandis, setRankedMandis] = useState([])
  const [hoveredMandi, setHoveredMandi] = useState(null)
  const [sortBy, setSortBy] = useState('balanced')

  useEffect(() => {
    if (!currentSearch) {
      navigate('/mandi/search')
      return
    }

    // Filter mandis that have the product with sufficient quantity
    const qualified = filterQualifiedMandis(
      currentSearch.scenarioData.mandis,
      currentSearch.product,
      currentSearch.quantity
    )

    // Calculate metrics for each mandi
    const withMetrics = qualified.map(mandi =>
      calculateMandiMetrics(
        mandi,
        currentSearch.retailerLocation.latitude,
        currentSearch.retailerLocation.longitude,
        currentSearch.quantity,
        currentSearch.resalePrice
      )
    )

    // Rank mandis
    const ranked = rankMandis(withMetrics, sortBy)
    setRankedMandis(ranked)
  }, [currentSearch, navigate, sortBy])

  if (!currentSearch) {
    return null
  }

  const handleSelectMandi = (mandi) => {
    setSelectedMandi(mandi)
    navigate('/mandi/confirm')
  }

  // Create custom icons
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
            onClick={() => navigate('/mandi/search')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Search
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white mb-1">Available Mandis</h1>
              <p className="text-sm text-gray-400">
                {currentSearch.quantity} kg {currentSearch.product} • {currentSearch.scenarioData.name}
              </p>
            </div>
            <div className="flex gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="balanced">Balanced Score</option>
                <option value="distance">Nearest First</option>
                <option value="price">Cheapest First</option>
                <option value="profit">Best Profit</option>
                <option value="shelfLife">Best Quality</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-6">
        {rankedMandis.length === 0 ? (
          <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
            <AlertCircle className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">No Mandis Available</h3>
            <p className="text-gray-400">No mandi has sufficient stock of {currentSearch.product} ({currentSearch.quantity} kg)</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Left: Ranked List */}
            <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)]">
              {rankedMandis.map((mandi, index) => {
                const reasons = generateReasoning(mandi, index + 1, rankedMandis)
                return (
                  <div
                    key={mandi.id}
                    onMouseEnter={() => setHoveredMandi(mandi.id)}
                    onMouseLeave={() => setHoveredMandi(null)}
                    className={`bg-gray-800/50 backdrop-blur-xl border rounded-2xl p-6 transition-all cursor-pointer ${
                      hoveredMandi === mandi.id
                        ? 'border-green-500 shadow-lg shadow-green-500/20 scale-[1.02]'
                        : 'border-gray-700/50 hover:border-green-500/50'
                    }`}
                  >
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white font-bold">
                          #{index + 1}
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-white">{mandi.name}</h3>
                          <p className="text-xs text-gray-400">{mandi.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-green-400">{mandi.score}</div>
                        <div className="text-xs text-gray-400">Score</div>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <MapPin className="w-3 h-3" />
                          Distance
                        </div>
                        <div className="text-white font-semibold">{mandi.distance} km</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <Package className="w-3 h-3" />
                          Price
                        </div>
                        <div className="text-white font-semibold">₹{mandi.pricePerKg}/kg</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <Clock className="w-3 h-3" />
                          Shelf Life
                        </div>
                        <div className="text-white font-semibold">{mandi.shelfLife} days</div>
                      </div>
                      <div className="bg-gray-900/50 rounded-lg p-3">
                        <div className="flex items-center gap-2 text-gray-400 text-xs mb-1">
                          <TrendingUp className="w-3 h-3" />
                          Profit
                        </div>
                        <div className="text-green-400 font-semibold">{formatCurrency(mandi.profit)}</div>
                      </div>
                    </div>

                    {/* Reasoning */}
                    <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3 mb-4">
                      <div className="text-xs font-medium text-green-400 mb-2">Why this ranking?</div>
                      <ul className="space-y-1">
                        {reasons.map((reason, i) => (
                          <li key={i} className="text-xs text-gray-300 flex items-start gap-2">
                            <Check className="w-3 h-3 text-green-400 mt-0.5 flex-shrink-0" />
                            <span>{reason}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Total Cost */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-700">
                      <div>
                        <div className="text-xs text-gray-400">Total Cost</div>
                        <div className="text-lg font-bold text-white">{formatCurrency(mandi.totalCost)}</div>
                      </div>
                      <button
                        onClick={() => handleSelectMandi(mandi)}
                        className="px-6 py-2.5 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-green-500/25"
                      >
                        Select Mandi
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Right: Map */}
            <div className="lg:sticky lg:top-6 h-[calc(100vh-200px)]">
              <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden h-full">
                <MapContainer
                  center={[currentSearch.retailerLocation.latitude, currentSearch.retailerLocation.longitude]}
                  zoom={12}
                  style={{ height: '100%', width: '100%' }}
                  className="z-0"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {/* Retailer Marker */}
                  <Marker
                    position={[currentSearch.retailerLocation.latitude, currentSearch.retailerLocation.longitude]}
                    icon={retailerIcon}
                  >
                    <Popup>
                      <div className="text-sm font-semibold">{currentSearch.retailerLocation.name}</div>
                      <div className="text-xs text-gray-600">Your Location</div>
                    </Popup>
                  </Marker>

                  {/* Retailer Circle */}
                  <Circle
                    center={[currentSearch.retailerLocation.latitude, currentSearch.retailerLocation.longitude]}
                    radius={500}
                    pathOptions={{ color: '#10b981', fillColor: '#10b981', fillOpacity: 0.1 }}
                  />

                  {/* Mandi Markers */}
                  {rankedMandis.map((mandi, index) => (
                    <div key={mandi.id}>
                      <Marker
                        position={[mandi.latitude, mandi.longitude]}
                        icon={mandiIcon}
                      >
                        <Popup>
                          <div className="text-sm font-semibold">#{index + 1} {mandi.name}</div>
                          <div className="text-xs text-gray-600 mt-1">{mandi.distance} km away</div>
                          <div className="text-xs text-gray-600">₹{mandi.pricePerKg}/kg • {mandi.shelfLife} days</div>
                        </Popup>
                      </Marker>

                      {/* Route Line */}
                      <Polyline
                        positions={[
                          [currentSearch.retailerLocation.latitude, currentSearch.retailerLocation.longitude],
                          [mandi.latitude, mandi.longitude]
                        ]}
                        pathOptions={{
                          color: hoveredMandi === mandi.id ? '#10b981' : '#6b7280',
                          weight: hoveredMandi === mandi.id ? 3 : 1,
                          opacity: hoveredMandi === mandi.id ? 0.8 : 0.3,
                          dashArray: '5, 10'
                        }}
                      />
                    </div>
                  ))}
                </MapContainer>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
