import React from 'react'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="flex">
        <div className="h-screen w-1/2 bg-black"></div>
        <div className="flex justify-center w-1/2 p-[160px]">
          <div className="flex flex-col w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { AuthLayout }
