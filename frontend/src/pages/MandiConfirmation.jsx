import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MapPin, Package, Clock, TrendingUp, CheckCircle } from 'lucide-react'
import { useMandi } from '../context/MandiContext'
import { formatCurrency } from '../utils/mandiUtils'

export default function MandiConfirmation() {
  const navigate = useNavigate()
  const { currentSearch, selectedMandi, addOrder } = useMandi()

  if (!currentSearch || !selectedMandi) {
    navigate('/mandi/search')
    return null
  }

  const handleConfirmOrder = () => {
    const order = {
      product: currentSearch.product,
      quantity: currentSearch.quantity,
      mandi: {
        id: selectedMandi.id,
        name: selectedMandi.name,
        location: selectedMandi.location
      },
      pricePerKg: selectedMandi.pricePerKg,
      totalCost: selectedMandi.totalCost,
      profit: selectedMandi.profit,
      distance: selectedMandi.distance,
      shelfLife: selectedMandi.shelfLife,
      deliveryTime: currentSearch.deliveryTime,
      scenario: currentSearch.scenarioData.name
    }

    addOrder(order)
    navigate('/mandi/history')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-green-500/20">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/mandi/results')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Results
          </button>
          <h1 className="text-2xl font-bold text-white">Confirm Order</h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto px-6 py-12">
        <div className="bg-gray-800/50 backdrop-blur-xl border border-gray-700/50 rounded-2xl overflow-hidden">
          {/* Success Banner */}
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 border-b border-green-500/30 p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white mb-1">Great Choice!</h2>
                <p className="text-gray-300">You've selected the optimal mandi for your requirements</p>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Mandi Details */}
            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-400 mb-3">Selected Mandi</h3>
              <div className="bg-gray-900/50 rounded-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-2xl font-bold text-white mb-1">{selectedMandi.name}</h4>
                    <p className="text-gray-400 flex items-center gap-2">
                      <MapPin className="w-4 h-4" />
                      {selectedMandi.location}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-green-400">{selectedMandi.score}</div>
                    <div className="text-xs text-gray-400">Match Score</div>
                  </div>
                </div>

                {/* Metrics Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <MapPin className="w-4 h-4" />
                      Distance
                    </div>
                    <div className="text-2xl font-bold text-white">{selectedMandi.distance}</div>
                    <div className="text-xs text-gray-400">kilometers</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <Package className="w-4 h-4" />
                      Price/kg
                    </div>
                    <div className="text-2xl font-bold text-white">₹{selectedMandi.pricePerKg}</div>
                    <div className="text-xs text-gray-400">per kilogram</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <Clock className="w-4 h-4" />
                      Shelf Life
                    </div>
                    <div className="text-2xl font-bold text-white">{selectedMandi.shelfLife}</div>
                    <div className="text-xs text-gray-400">days fresh</div>
                  </div>
                  <div className="bg-gray-800/50 rounded-lg p-4">
                    <div className="flex items-center gap-2 text-gray-400 text-sm mb-2">
                      <TrendingUp className="w-4 h-4" />
                      Profit
                    </div>
                    <div className="text-2xl font-bold text-green-400">
                      {formatCurrency(selectedMandi.profit)}
                    </div>
                    <div className="text-xs text-gray-400">expected</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            <div className="bg-gray-900/50 rounded-xl p-6 mb-8">
              <h3 className="text-lg font-semibold text-white mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Product</span>
                  <span className="text-white font-semibold">{currentSearch.product}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Quantity</span>
                  <span className="text-white font-semibold">{currentSearch.quantity} kg</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Price per kg</span>
                  <span className="text-white font-semibold">₹{selectedMandi.pricePerKg}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Delivery Time</span>
                  <span className="text-white font-semibold">{currentSearch.deliveryTime} hours</span>
                </div>
                <div className="border-t border-gray-700 pt-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Purchase Cost</span>
                    <span className="text-white font-semibold">{formatCurrency(selectedMandi.totalCost)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Expected Revenue</span>
                  <span className="text-white font-semibold">{formatCurrency(selectedMandi.expectedRevenue)}</span>
                </div>
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3 mt-3">
                  <div className="flex justify-between items-center">
                    <span className="text-green-400 font-semibold">Net Profit</span>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-400">{formatCurrency(selectedMandi.profit)}</div>
                      <div className="text-xs text-green-400/70">{selectedMandi.profitMargin}% margin</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <button
                onClick={() => navigate('/mandi/results')}
                className="flex-1 py-4 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-xl transition-all"
              >
                Choose Different Mandi
              </button>
              <button
                onClick={handleConfirmOrder}
                className="flex-1 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-500 hover:to-emerald-500 text-white font-semibold rounded-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-green-500/25 flex items-center justify-center gap-2"
              >
                <CheckCircle className="w-5 h-5" />
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
