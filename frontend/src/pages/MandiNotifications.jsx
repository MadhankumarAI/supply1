import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, Bell, Package, Clock, MapPin, CheckCircle, Circle, AlertCircle } from 'lucide-react'
import { useMandi } from '../context/MandiContext'
import { formatCurrency, formatDate } from '../utils/mandiUtils'

export default function MandiNotifications() {
  const navigate = useNavigate()
  const location = useLocation()
  const { 
    mandiNotifications, 
    markNotificationAsRead, 
    markAllNotificationsAsRead, 
    getNotificationsForMandi 
  } = useMandi()

  // Get mandiId from URL query params or use first mandi for demo
  const searchParams = new URLSearchParams(location.search)
  const mandiId = searchParams.get('mandiId') || 'm1'

  const [filter, setFilter] = useState('all') // all, unread, read

  // Get notifications for this specific mandi
  const allNotifications = getNotificationsForMandi(mandiId)
  
  const filteredNotifications = allNotifications.filter(notif => {
    if (filter === 'unread') return !notif.read
    if (filter === 'read') return notif.read
    return true
  })

  const unreadCount = allNotifications.filter(n => !n.read).length

  const handleMarkAsRead = (notificationId) => {
    markNotificationAsRead(notificationId)
  }

  const handleMarkAllAsRead = () => {
    markAllNotificationsAsRead(mandiId)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-orange-500/20">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate('/mandi/dashboard')}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Bell className="w-6 h-6 text-orange-400" />
                <h1 className="text-2xl font-bold text-white">Notifications</h1>
                {unreadCount > 0 && (
                  <span className="px-3 py-1 bg-orange-600 text-white text-sm font-bold rounded-full">
                    {unreadCount} New
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-400 mt-1">New orders from retailers</p>
            </div>
            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="px-4 py-2 bg-orange-600/20 hover:bg-orange-600/30 text-orange-400 rounded-lg transition-all border border-orange-500/30 text-sm font-medium"
              >
                Mark All as Read
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Filter Tabs */}
        <div className="flex items-center gap-4 mb-6">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'all'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            All ({allNotifications.length})
          </button>
          <button
            onClick={() => setFilter('unread')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'unread'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Unread ({unreadCount})
          </button>
          <button
            onClick={() => setFilter('read')}
            className={`px-4 py-2 rounded-lg transition-all ${
              filter === 'read'
                ? 'bg-orange-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
            }`}
          >
            Read ({allNotifications.length - unreadCount})
          </button>
        </div>

        {/* Notifications List */}
        <div className="space-y-4">
          {filteredNotifications.length === 0 ? (
            <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-12 text-center">
              <Bell className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {filter === 'unread' ? 'No Unread Notifications' : 'No Notifications Yet'}
              </h3>
              <p className="text-gray-400">
                {filter === 'unread' 
                  ? 'All notifications have been read'
                  : 'When retailers place orders, you\'ll see notifications here'}
              </p>
            </div>
          ) : (
            filteredNotifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-gray-800/50 backdrop-blur-xl border rounded-2xl p-6 transition-all ${
                  notification.read
                    ? 'border-gray-700/50'
                    : 'border-orange-500/30 bg-orange-500/5'
                }`}
              >
                <div className="flex items-start justify-between">
                  {/* Left: Notification Content */}
                  <div className="flex-1">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        notification.read ? 'bg-gray-700' : 'bg-orange-600'
                      }`}>
                        <Package className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">
                            New Order from {notification.retailerName}
                          </h3>
                          {!notification.read && (
                            <span className="px-2 py-1 bg-orange-600 text-white text-xs font-bold rounded">
                              NEW
                            </span>
                          )}
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Product</div>
                            <div className="text-sm font-semibold text-white">{notification.product}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Quantity</div>
                            <div className="text-sm font-semibold text-white">{notification.quantity} kg</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Order Value</div>
                            <div className="text-sm font-semibold text-green-400">{formatCurrency(notification.totalCost)}</div>
                          </div>
                          <div>
                            <div className="text-xs text-gray-400 mb-1">Distance</div>
                            <div className="text-sm font-semibold text-white">{notification.distance} km</div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-xs text-gray-400">
                          <Clock className="w-3 h-3" />
                          <span>{formatDate(notification.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex flex-col items-end gap-2">
                    {!notification.read && (
                      <button
                        onClick={() => handleMarkAsRead(notification.id)}
                        className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-lg transition-all flex items-center gap-1"
                      >
                        <CheckCircle className="w-3 h-3" />
                        Mark as Read
                      </button>
                    )}
                    {notification.read && (
                      <div className="flex items-center gap-1 text-xs text-green-400">
                        <CheckCircle className="w-3 h-3" />
                        Read
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Info Box */}
        <div className="mt-8 bg-orange-500/10 border border-orange-500/20 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
            <div className="text-sm text-gray-300">
              <strong className="text-orange-400">Demo Mode:</strong> In a real system, notifications would be sent in real-time when retailers place orders. This demo shows all orders as notifications for the selected mandi.
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
