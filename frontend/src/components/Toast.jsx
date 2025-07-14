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
        return "bg-secondary-light/30 border-secondary shadow-card text-secondary-dark";
      case "error":
        return "bg-error/10 border-error shadow-card text-error";
      default:
        return "bg-primary-light/20 border-primary shadow-card text-primary-dark";
    }
  };

  return (
    <div className="fixed top-24 right-4 z-50 space-y-3">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center p-4 rounded-xl border max-w-sm min-w-[260px] animate-in fade-in-0 zoom-in-95 transition-all duration-200 ${getStyles(toast.type)}`}
        >
          {getIcon(toast.type)}
          <p className="ml-3 text-sm font-medium flex-1">{toast.message}</p>
          <button onClick={() => removeToast(toast.id)} className="ml-4 text-gray-400 hover:text-gray-600">
            <X className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  )
}

export default Toast
