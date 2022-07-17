import React from 'react'
import Avatar from 'boring-avatars'
import LogoLaz from '@/assets/png/logo_laz.png'
import { IoChevronForwardOutline, IoChevronBackOutline, IoCaretDownOutline } from 'react-icons/io5'
import { ExpenseClerk } from '@/page-components/ExpenseClerk'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="flex-col bg-[#FAFBFF]">
      {/* Navbar */}
      <div className="bg-white border-b-[1px] border-neutral-300">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-56 py-12">
          <div className="flex w-1/4">
            <img 
              src={LogoLaz.src}
              width="56"
            />
          </div>

          <div className="flex justify-center w-half">
            <button className="px-12 py-8 mr-8 rounded hover:bg-neutral-200 duration-150">
              <IoChevronBackOutline size={24} />
            </button>

            <button className="px-12 py-8 mr-12 rounded hover:bg-neutral-200 duration-150">
              <IoChevronForwardOutline size={24} />
            </button>

            <button className="flex items-center px-16 py-8 rounded hover:bg-neutral-200 duration-150">
              <p className="font-sans text-h4 mr-8">June 2022</p>
              <i>
                <IoCaretDownOutline />
              </i>
            </button>
          </div>

          <div className="flex justify-end items-center w-1/4">
            <ExpenseClerk />

            <button className="p-[4px] rounded hover:bg-neutral-200 duration-150">
              <Avatar
                size={40}
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
