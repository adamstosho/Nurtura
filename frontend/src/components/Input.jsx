import { forwardRef } from "react"

const Input = forwardRef(({ label, error, type = "text", className = "", ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-gray-700">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`
          block w-full px-3 py-2 border rounded-lg shadow-sm placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          ${error ? "border-red-300" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"

export default Input
