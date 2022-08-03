import React from 'react'

interface BadgeProps {
  children: React.ReactNode
}

const Badge: React.FC<BadgeProps> = ({ children }) => {
  return (
    <span className="inline-block p-8 text-primary-600 text-h6 font-bold leading-none bg-primary-200 rounded">
      {children}
    </span>
  )
}

export { Badge }
