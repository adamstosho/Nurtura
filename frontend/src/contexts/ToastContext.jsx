"use client"

import { createContext, useContext, useState } from "react"

const ToastContext = createContext()

export const useToast = () => {
  const context = useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([])

  const addToast = (message, type = "info") => {
    const id = Date.now()
    const toast = { id, message, type }
    setToasts((prev) => [...prev, toast])

    setTimeout(() => {
      removeToast(id)
    }, 5000)
  }

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  const showSuccess = (message) => addToast(message, "success")
  const showError = (message) => addToast(message, "error")
  const showInfo = (message) => addToast(message, "info")

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast, showSuccess, showError, showInfo }}>
      {children}
    </ToastContext.Provider>
  )
}
