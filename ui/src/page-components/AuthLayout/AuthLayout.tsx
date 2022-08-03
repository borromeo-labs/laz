import React from 'react'
import LogoLaz from '@/assets/png/logo_laz.png'
import LoginIllustration from '@/assets/png/login_illustration.png'

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <div className="flex">
        <div className="h-screen w-1/2 bg-[#FDE4E3] p-40">
          <img 
            src={LogoLaz.src}
            alt="LAZ Logo"
            width={80}
          />
          <img 
            src={LoginIllustration.src}
            alt="LAZ Logo"
            width={640}
            className="mt-[120px]"
          />
        </div>
        <div className="flex justify-center w-1/2 p-[160px]">
          <div className="flex flex-col w-full max-w-[400px]">{children}</div>
        </div>
      </div>
    </div>
  )
}

export { AuthLayout }
