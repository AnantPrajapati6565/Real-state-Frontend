import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../components/layout/MainLayout'
import PrivateRoute from './PrivateRoute'

// ============================================
// PUBLIC PAGES - No authentication required
// ============================================
import Home from '../pages/Home'
import About from '../pages/About'
import Services from '../pages/Services'
import Projects from '../pages/Projects'
import ProjectDetails from '../pages/ProjectDetails'
import OngoingProjects from '../pages/OngoingProjects'
import Gallery from '../pages/Gallery'
import Testimonials from '../pages/Testimonials'
import Contact from '../pages/Contact'
import NotFound from '../pages/NotFound'

// ============================================
// ADMIN PAGES - Authentication required
// ============================================
import AdminLogin from '../components/admin/AdminLogin'
import AdminDashboard from '../components/admin/AdminDashboard'
import AdminProjects from '../components/admin/AdminProjects'
import AdminServices from '../components/admin/AdminServices'
import AdminTestimonials from '../components/admin/AdminTestimonials'
import AdminContacts from '../components/admin/AdminContacts'
import AdminGallery from '../components/admin/AdminGallery'

const AppRoutes = () => {
  return (
    <Routes>
      {/* ============================================
          PUBLIC ROUTES - Everyone can access
          ============================================ */}
      <Route path="/" element={<MainLayout><Home /></MainLayout>} />
      <Route path="/about" element={<MainLayout><About /></MainLayout>} />
      <Route path="/services" element={<MainLayout><Services /></MainLayout>} />
      <Route path="/projects" element={<MainLayout><Projects /></MainLayout>} />
      <Route path="/projects/:id" element={<MainLayout><ProjectDetails /></MainLayout>} />
      <Route path="/ongoing-projects" element={<MainLayout><OngoingProjects /></MainLayout>} />
      <Route path="/gallery" element={<MainLayout><Gallery /></MainLayout>} />
      <Route path="/testimonials" element={<MainLayout><Testimonials /></MainLayout>} />
      <Route path="/contact" element={<MainLayout><Contact /></MainLayout>} />
      
      {/* ============================================
          ADMIN AUTH ROUTE - Login page (public)
          ============================================ */}
      <Route path="/admin/login" element={<AdminLogin />} />
      
      {/* ============================================
          ADMIN PROTECTED ROUTES - Require login
          ============================================ */}
      <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
      
      {/* Dashboard */}
      <Route 
        path="/admin/dashboard" 
        element={
          <PrivateRoute>
            <AdminDashboard />
          </PrivateRoute>
        } 
      />
      
      {/* Projects Management */}
      <Route 
        path="/admin/projects" 
        element={
          <PrivateRoute>
            <AdminDashboard>
              <AdminProjects />
            </AdminDashboard>
          </PrivateRoute>
        } 
      />
      
      {/* Services Management */}
      <Route 
        path="/admin/services" 
        element={
          <PrivateRoute>
            <AdminDashboard>
              <AdminServices />
            </AdminDashboard>
          </PrivateRoute>
        } 
      />
      
      {/* Testimonials Management */}
      <Route 
        path="/admin/testimonials" 
        element={
          <PrivateRoute>
            <AdminDashboard>
              <AdminTestimonials />
            </AdminDashboard>
          </PrivateRoute>
        } 
      />
      
      {/* Contacts Management */}
      <Route 
        path="/admin/contacts" 
        element={
          <PrivateRoute>
            <AdminDashboard>
              <AdminContacts />
            </AdminDashboard>
          </PrivateRoute>
        } 
      />
      
      {/* Gallery Management */}
      <Route 
        path="/admin/gallery" 
        element={
          <PrivateRoute>
            <AdminDashboard>
              <AdminGallery />
            </AdminDashboard>
          </PrivateRoute>
        } 
      />
      
      {/* ============================================
          404 - Page Not Found
          ============================================ */}
      <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
    </Routes>
  )
}

export default AppRoutes