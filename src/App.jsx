import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { HelmetProvider, Helmet } from 'react-helmet-async';
import './index.css'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import About from './pages/About'
import CourseList from './pages/CourseList'
import CourseDetail from './pages/CourseDetail'
import AIHub from './pages/AIHub'
import AINews from './pages/AINews'
import NewsDetail from './pages/NewsDetail'
import AIDictionary from './pages/AIDictionary'
import Login from './pages/admin/Login'
import AdminDashboard from './pages/admin/AdminDashboard'
import ManageAITools from './pages/admin/ManageAITools'
import ManageNews from './pages/admin/ManageNews'
import ManageCourses from './pages/admin/ManageCourses'
import ManageDictionary from './pages/admin/ManageDictionary'
import AdminLayout from './components/AdminLayout'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <>
      <Helmet>
        <title>จารย์โหน่ง AI | JarnNong.com</title>
        <meta name="description" content="ยกระดับทักษะของคุณด้วย AI — แหล่งเรียนรู้ AI สำหรับคนไทย" />
      </Helmet>
      {!isAdminPage && <Header />}
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/courses" element={<CourseList />} />
          <Route path="/course-detail/:id" element={<CourseDetail />} />
          <Route path="/ai-tools" element={<AIHub />} />
          <Route path="/ai-news" element={<AINews />} />
          <Route path="/ai-news/:id" element={<NewsDetail />} />
          <Route path="/ai-terms" element={<AIDictionary />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/*"
            element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    <Route path="dashboard" element={<AdminDashboard />} />
                    <Route path="courses" element={<ManageCourses />} />
                    <Route path="aitools" element={<ManageAITools />} />
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
    <HelmetProvider>
      <AuthProvider>
        <BrowserRouter>
          <AppContent />
        </BrowserRouter>
      </AuthProvider>
    </HelmetProvider>
  );
}

export default App;
