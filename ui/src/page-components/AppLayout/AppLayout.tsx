import React from 'react'
import Avatar from 'boring-avatars'
import { IoChevronForwardOutline, IoChevronBackOutline, IoCaretDownOutline } from 'react-icons/io5'
import { ExpenseClerk } from '@/page-components/ExpenseClerk'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-col bg-[#FAFBFF]">
      {/* Navbar */}
      <div className="bg-white border-b-[1px] border-slate-200">
        <div className="flex justify-between max-w-[1440px] mx-auto px-56 py-12">
          <div className="w-1/4"></div>

          <div className="flex justify-center w-half">
            <button className="px-12 py-8 mr-8 rounded hover:bg-slate-200 duration-100 ease-linear">
              <IoChevronBackOutline size={24} />
            </button>

            <button className="px-12 py-8 mr-12 rounded hover:bg-slate-200 duration-100 ease-linear">
              <IoChevronForwardOutline size={24} />
            </button>

            <button className="flex items-center px-16 py-8 rounded hover:bg-slate-200 duration-100 ease-linear">
              <p className="font-sans text-h4 mr-8">June 2022</p>
              <i>
                <IoCaretDownOutline />
              </i>
            </button>
          </div>

          <div className="flex items-center justify-end w-1/4">
            <ExpenseClerk />

            <button className="flex items-center justify-center h-[48px] w-[48px]">
              <Avatar
                size={48}
                name="Mother Frances"
                variant="beam"
                colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
              />
            </button>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

export { AppLayout }
