import React from 'react'
import Avatar from 'boring-avatars'
import LogoLaz from '@/assets/png/logo_laz.png'
import { SelectMenu } from '@/components'
import {
  IoChevronForwardOutline,
  IoChevronBackOutline,
  IoCaretDownOutline,
  IoWallet,
  IoPersonSharp,
  IoLogOut,
} from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import { ExpenseClerk } from '@/page-components/ExpenseClerk'
import { signOut } from 'next-auth/react'
import { MonthPickerModal } from './MonthPickerModal'

const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { data } = useSession()

  return (
    <div className="flex-col bg-[#FAFBFF]">
      {/* Navbar */}
      <div className="bg-white border-b-[1px] border-neutral-300">
        <div className="flex items-center justify-between max-w-[1440px] mx-auto px-56 py-12">
          <div className="flex w-1/4">
            <img src={LogoLaz.src} width="56" />
          </div>

          <div className="flex justify-center w-half">
            <button className="px-12 py-8 mr-8 rounded hover:bg-neutral-200 duration-150">
              <IoChevronBackOutline size={24} />
            </button>

            <button className="px-12 py-8 mr-12 rounded hover:bg-neutral-200 duration-150">
              <IoChevronForwardOutline size={24} />
            </button>

            <MonthPickerModal />
          </div>

          <div className="flex justify-end items-center w-1/4">
            <ExpenseClerk />

            <SelectMenu
              items={[
                {
                  label: 'Bills',
                  url: '/',
                  icon: <IoWallet className="mr-12" color="#8A4FFF" size="20" />,
                },
                {
                  label: 'Account Settings',
                  url: '/',
                  icon: <IoPersonSharp className="mr-12" color="#8A4FFF" size="20" />,
                },
                {
                  label: 'Logout',
                  onClick: () => signOut({ redirect: true }),
                  icon: <IoLogOut className="mr-12" color="#8A4FFF" size="20" />,
                },
              ]}>
              <div>
                <Avatar
                  size={32}
                  name={data.user.email}
                  variant="beam"
                  colors={['#92A1C6', '#146A7C', '#F0AB3D', '#C271B4', '#C20D90']}
                />
              </div>
            </SelectMenu>
          </div>
        </div>
      </div>

      {children}
    </div>
  )
}

export { AppLayout }
