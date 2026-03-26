import { Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import ProtectedRoute from './components/ProtectedRoute'
import AdminLayout from './pages/admin/AdminLayout'
import AdminLogin from './pages/admin/AdminLogin'
import AdminOverview from './pages/admin/AdminOverview'
import AdminProducts from './pages/admin/AdminProducts'
import AdminCustomers from './pages/admin/AdminCustomers'
import AdminSales from './pages/admin/AdminSales'
import AdminReports from './pages/admin/AdminReports'
import CustomerHome from './pages/CustomerHome'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import VendorLayout from './pages/vendor/VendorLayout'
import VendorLogin from './pages/vendor/VendorLogin'
import VendorOverview from './pages/vendor/VendorOverview'
import VendorProducts from './pages/vendor/VendorProducts'
import VendorReports from './pages/vendor/VendorReports'

const App = () => {
  return (
    <div className="app">
      <NavBar />
      <Routes>
        <Route path="/" element={<CustomerHome />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admin/login" element={<AdminLogin />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute allow={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminOverview />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="sales" element={<AdminSales />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        <Route path="/vendor/login" element={<VendorLogin />} />
        <Route
          path="/vendor"
          element={
            <ProtectedRoute allow={['vendor']}>
              <VendorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<VendorOverview />} />
          <Route path="products" element={<VendorProducts />} />
          <Route path="reports" element={<VendorReports />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
