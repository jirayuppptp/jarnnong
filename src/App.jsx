import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import AIHub from './pages/AIHub'
import AdminLogin from './pages/admin/AdminLogin'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageAITools from './pages/admin/ManageAITools'
import ManageNews from './pages/admin/ManageNews'
import ManageDictionary from './pages/admin/ManageDictionary'
import AdminLayout from './components/AdminLayout'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      {!isAdminPage && <Header />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/ai-hub" element={<AIHub />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="ai-tools" element={<ManageAITools />} />
                    <Route path="news" element={<ManageNews />} />
                    <Route path="dictionary" element={<ManageDictionary />} />
                    <Route path="*" element={<AdminDashboard />} />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
