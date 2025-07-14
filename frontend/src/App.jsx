import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider } from "./contexts/AuthContext"
import { ToastProvider } from "./contexts/ToastContext"
import Navbar from "./components/Navbar"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Dashboard from "./pages/Dashboard"
import SymptomTracker from "./pages/SymptomTracker"
import SymptomHistory from "./pages/SymptomHistory"
import HealthTips from "./pages/HealthTips"
import ClinicFinder from "./pages/ClinicFinder"
import EmergencyContacts from "./pages/EmergencyContacts"
import Profile from "./pages/Profile"
import ProtectedRoute from "./components/ProtectedRoute"
import Toast from "./components/Toast"

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="pt-16">
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/symptoms"
                  element={
                    <ProtectedRoute>
                      <SymptomTracker />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/symptoms/history"
                  element={
                    <ProtectedRoute>
                      <SymptomHistory />
                    </ProtectedRoute>
                  }
                />
                <Route path="/tips" element={<HealthTips />} />
                <Route path="/clinics" element={<ClinicFinder />} />
                <Route path="/emergency" element={<EmergencyContacts />} />
                <Route
                  path="/profile"
                  element={
                    <ProtectedRoute>
                      <Profile />
                    </ProtectedRoute>
                  }
                />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Toast />
          </div>
        </Router>
      </ToastProvider>
    </AuthProvider>
  )
}

export default App
