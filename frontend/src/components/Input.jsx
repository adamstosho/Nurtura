import { forwardRef } from "react"

const Input = forwardRef(({ label, error, type = "text", className = "", ...props }, ref) => {
  return (
    <div className="space-y-1">
      {label && <label className="block text-sm font-medium text-text-primary mb-1">{label}</label>}
      <input
        ref={ref}
        type={type}
        className={`
          block w-full px-4 py-2 border rounded-xl shadow-input placeholder-text-muted bg-surface text-text-primary
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-colors duration-200
          ${error ? "border-error focus:ring-error" : "border-border"}
          ${className}
        `}
        {...props}
      />
      {error && <p className="text-xs text-error mt-1">{error}</p>}
    </div>
  )
})

Input.displayName = "Input"

export default Input
