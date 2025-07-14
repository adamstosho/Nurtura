"use client"

import { useToast } from "../contexts/ToastContext"
import { CheckCircle, XCircle, Info, X } from "lucide-react"

const Toast = () => {
  const { toasts, removeToast } = useToast()

  const getIcon = (type) => {
    switch (type) {
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />
      default:
        return <Info className="h-5 w-5 text-blue-500" />
    }
  }

  const getStyles = (type) => {
    switch (type) {
      case "success":
        return "bg-green-50 border-green-200"
      case "error":
        return "bg-red-50 border-red-200"
      default:
        return "bg-blue-50 border-blue-200"
    }
  }

  return (
    <div className="fixed top-20 right-4 z-50 space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-4 rounded-lg border shadow-lg max-w-sm ${getStyles(toast.type)}`}
        >
          {getIcon(toast.type)}
          <p className="ml-3 text-sm font-medium text-gray-900 flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="ml-4 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
