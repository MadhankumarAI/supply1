import { createContext, useContext, useState } from 'react';

const MandiContext = createContext();

export function MandiProvider({ children }) {
  const [orderHistory, setOrderHistory] = useState([]);
  const [currentSearch, setCurrentSearch] = useState(null);
  const [selectedMandi, setSelectedMandi] = useState(null);

  const addOrder = (order) => {
    const newOrder = {
      ...order,
      id: Date.now(),
      orderDate: new Date(),
      status: 'confirmed'
    };
    setOrderHistory(prev => [newOrder, ...prev]);
  };

  return (
    <MandiContext.Provider
      value={{
        orderHistory,
        addOrder,
        currentSearch,
        setCurrentSearch,
        selectedMandi,
        setSelectedMandi
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
