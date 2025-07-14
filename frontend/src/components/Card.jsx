const Card = ({ children, className = "", ...props }) => {
  return (
    <div className={`bg-card rounded-2xl shadow-card border border-border p-6 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardHeader = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-0 pb-4 border-b border-border mb-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

export const CardContent = ({ children, className = "", ...props }) => {
  return (
    <div className={`px-0 pt-2 ${className}`} {...props}>
      {children}
    </div>
  )
}

export default Card
