import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, Package, Clock, MapPin } from 'lucide-react'
import { SCENARIOS, RETAILER_LOCATION } from '../data/mandiScenarios'
import { useMandi } from '../context/MandiContext'

export default function MandiSearch() {
  const navigate = useNavigate()
  const { setCurrentSearch } = useMandi()
  
  const [formData, setFormData] = useState({
    product: 'Tomatoes',
    quantity: 200,
    deliveryTime: 12,
    scenario: 'scenario1'
  })

  const products = ['Tomatoes', 'Onions', 'Potatoes', 'Carrots', 'Cabbage', 'Cauliflower', 'Spinach', 'Green Beans']

  const handleSearch = (e) => {
    e.preventDefault()
    
    const searchData = {
      ...formData,
      retailerLocation: RETAILER_LOCATION,
      resalePrice: RETAILER_LOCATION.resale_prices[formData.product],
      scenarioData: SCENARIOS[formData.scenario],
      timestamp: new Date()
    }
    
    setCurrentSearch(searchData)
    navigate('/retailer/results')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-green-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Mandi Connect</h1>
              <p className="text-xs text-gray-400">Bangalore Wholesale Network</p>
            </div>
          </div>
          <button
            onClick={() => navigate('/retailer/history')}
            className="px-4 py-2 bg-green-600/20 hover:bg-green-600/30 text-green-400 rounded-lg transition-all border border-green-500/30 text-sm font-medium"
          >
            Order History
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        {/* Retailer Info */}
        <div className="bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20 rounded-2xl p-6 mb-8">
          <div className="flex items-center gap-3 mb-2">
            <MapPin className="w-5 h-5 text-green-400" />
            <h2 className="text-lg font-semibold text-white">{RETAILER_LOCATION.name}</h2>
          </div>
          <p className="text-gray-400 text-sm">Connected to Bangalore's largest wholesale markets</p>
        </div>

        {/* Search Form */}
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl p-8 shadow-2xl">
          <div className="flex items-center gap-3 mb-6">
            <Search className="w-6 h-6 text-green-400" />
            <h2 className="text-2xl font-bold text-white">Find Best Mandi</h2>
          </div>

          <form onSubmit={handleSearch} className="space-y-6">
            {/* Scenario Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Select Scenario
              </label>
              <select
                value={formData.scenario}
                onChange={(e) => setFormData({ ...formData, scenario: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {Object.entries(SCENARIOS).map(([key, scenario]) => (
                  <option key={key} value={key}>
                    {scenario.name}
                  </option>
                ))}
              </select>
              <p className="mt-2 text-xs text-gray-400">
                {SCENARIOS[formData.scenario].description}
              </p>
            </div>

            {/* Product Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Product
              </label>
              <select
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {products.map(product => (
                  <option key={product} value={product}>{product}</option>
                ))}
              </select>
            </div>

            {/* Quantity */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Required Quantity (kg)
              </label>
              <input
                type="number"
                value={formData.quantity}
                onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) })}
                min="10"
                step="10"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Delivery Time */}
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Required Delivery Time
              </label>
              <div className="grid grid-cols-3 gap-3">
                {[6, 12, 24].map(hours => (
                  <button
                    key={hours}
                    type="button"
                    onClick={() => setFormData({ ...formData, deliveryTime: hours })}
                    className={`px-4 py-3 rounded-xl border transition-all ${
                      formData.deliveryTime === hours
                        ? 'bg-green-600 border-green-500 text-white'
                        : 'bg-gray-900 border-gray-700 text-gray-400 hover:border-green-500/50'
                    }`}
                  >
                    <Clock className="w-4 h-4 mx-auto mb-1" />
                    <span className="text-sm font-medium">{hours} hours</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
            >
              <Search className="w-5 h-5" />
              Search Available Mandis
            </button>
          </form>
        </div>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
            <div className="text-green-400 font-semibold mb-1">Smart Ranking</div>
            <div className="text-xs text-gray-400">Distance, price, shelf life & profit optimized</div>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
            <div className="text-green-400 font-semibold mb-1">Real-time Data</div>
            <div className="text-xs text-gray-400">Live stock updates from all mandis</div>
          </div>
          <div className="bg-gray-800/30 border border-gray-700/50 rounded-xl p-4">
            <div className="text-green-400 font-semibold mb-1">Multiple Scenarios</div>
            <div className="text-xs text-gray-400">Test different market conditions</div>
          </div>
        </div>
      </div>
    </div>
  )
}
