import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import Auth from './pages/Auth.jsx'
import FarmerLandingPage from './pages/FarmerLandingPage.jsx'
import FarmerDashboard from './pages/FarmerDashboard.jsx'
import MandiLandingPage from './pages/MandiLandingPage.jsx'
import MandiDashboard from './pages/MandiDashboard.jsx'
import RetailerLandingPage from './pages/RetailerLandingPage.jsx'
import RetailerDashboard from './pages/RetailerDashboard.jsx'
import RetailerOrders from './pages/RetailerOrders.jsx'
import NotFound from './pages/NotFound.jsx'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Auth />} />
      <Route path="/register" element={<Auth />} />
      <Route path="/farmer" element={<FarmerLandingPage />} />
      <Route path="/farmer/dashboard" element={<FarmerDashboard />} />
      <Route path="/mandi" element={<MandiLandingPage />} />
      <Route path="/mandi/dashboard" element={<MandiDashboard />} />
      <Route path="/retailer" element={<RetailerLandingPage />} />
      <Route path="/retailer/dashboard" element={<RetailerDashboard />} />
      <Route path="/retailer/orders" element={<RetailerOrders />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default App;
