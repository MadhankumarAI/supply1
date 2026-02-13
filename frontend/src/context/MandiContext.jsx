import { createContext, useContext, useState } from 'react';

const MandiContext = createContext();

export function MandiProvider({ children }) {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [selectedMandi, setSelectedMandi] = useState(null);
  const [mandiNotifications, setMandiNotifications] = useState([]);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      orderDate: new Date(),
      status: 'confirmed'
    };
    setOrderHistory(prev => [newOrder, ...prev]);
    
    // Create notification for the mandi
    const notification = {
      id: Date.now() + Math.random(),
      mandiId: order.mandi.id,
      mandiName: order.mandi.name,
      retailerName: 'Your Store - Koramangala',
      product: order.product,
      quantity: order.quantity,
      totalCost: order.totalCost,
      profit: order.profit,
      distance: order.distance,
      timestamp: new Date(),
      read: false,
      type: 'new_order'
    };
    setMandiNotifications(prev => [notification, ...prev]);
  };

  const markNotificationAsRead = (notificationId) => {
    setMandiNotifications(prev =>
      prev.map(notif =>
        notif.id === notificationId ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllNotificationsAsRead = (mandiId) => {
    setMandiNotifications(prev =>
      prev.map(notif =>
        notif.mandiId === mandiId ? { ...notif, read: true } : notif
      )
    );
  };

  const getNotificationsForMandi = (mandiId) => {
    return mandiNotifications.filter(notif => notif.mandiId === mandiId);
  };

  const getUnreadCountForMandi = (mandiId) => {
    return mandiNotifications.filter(notif => notif.mandiId === mandiId && !notif.read).length;
  };

  return (
    <MandiContext.Provider
      value={{
        orderHistory,
        addOrder,
        currentSearch,
        setCurrentSearch,
        selectedMandi,
        setSelectedMandi,
        mandiNotifications,
        markNotificationAsRead,
        markAllNotificationsAsRead,
        getNotificationsForMandi,
        getUnreadCountForMandi
      }}
    >
      {children}
    </MandiContext.Provider>
  );
}

export function useMandi() {
  const context = useContext(MandiContext);
  if (!context) {
    throw new Error('useMandi must be used within MandiProvider');
  }
  return context;
}
