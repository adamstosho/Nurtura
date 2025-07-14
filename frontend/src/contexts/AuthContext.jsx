"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { api } from "../utils/api"

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("healthpulse_token")
    if (token) {
      fetchProfile()
    } else {
      setLoading(false)
    }
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get("/auth/profile")
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem("healthpulse_token")
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password })
    const { token, user } = response.data
    localStorage.setItem("healthpulse_token", token)
    setUser(user)
    return response.data
  }

  const register = async (name, email, password, region) => {
    const response = await api.post("/auth/register", { name, email, password, region })
    const { token, user } = response.data
    localStorage.setItem("healthpulse_token", token)
    setUser(user)
    return response.data
  }

  const logout = () => {
    localStorage.removeItem("healthpulse_token")
    setUser(null)
  }

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
