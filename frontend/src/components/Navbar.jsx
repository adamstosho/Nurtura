"use client"

import { useState } from "react"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../contexts/AuthContext"
import { Heart, Menu, X, Home, Activity, History, Lightbulb, MapPin, Phone, User, LogOut } from "lucide-react"
import Button from "./Button"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate("/login")
  }

  const navigation = [
    { name: "Dashboard", href: "/", icon: Home },
    { name: "Log Symptom", href: "/symptoms", icon: Activity },
    { name: "History", href: "/symptoms/history", icon: History },
    { name: "Health Tips", href: "/tips", icon: Lightbulb },
    { name: "Find Clinics", href: "/clinics", icon: MapPin },
    { name: "Emergency", href: "/emergency", icon: Phone },
  ]

  const isActive = (path) => location.pathname === path

  if (location.pathname === "/login" || location.pathname === "/register") {
    return null
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-40 bg-navbar shadow-navbar transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="Nurtura.png" alt="Nurtura Logo" className="h-15 w-14" />
        </Link>
        <div className="hidden md:flex items-center gap-6">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-base
                ${isActive(item.href)
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-surface hover:text-primary"}
              `}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="ml-2">
              <LogOut className="h-5 w-5 mr-1" /> Logout
            </Button>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button
            className="p-2 rounded-lg text-primary hover:bg-surface focus:outline-none focus:ring-2 focus:ring-primary"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-navbar shadow-navbar border-t border-border px-4 py-4 space-y-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-colors font-medium text-base
                ${isActive(item.href)
                  ? "bg-primary text-white shadow-sm"
                  : "text-gray-700 hover:bg-surface hover:text-primary"}
              `}
              onClick={() => setIsOpen(false)}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
          {user && (
            <Button variant="ghost" size="sm" onClick={handleLogout} className="w-full mt-2">
              <LogOut className="h-5 w-5 mr-1" /> Logout
            </Button>
          )}
        </div>
      )}
    </nav>
  )
}

export default Navbar
