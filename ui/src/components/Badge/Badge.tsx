import React from 'react'

interface BadgeProps {
  children: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="inline-block p-8 text-blue-600 text-h6 font-bold leading-none bg-blue-200 rounded">
      {children}
    </span>
  )
}

export { Badge }
