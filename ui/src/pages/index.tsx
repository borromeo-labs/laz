import { ExpenseClerk } from '@/page-components/ExpenseClerk'
import { IoChevronForwardOutline } from 'react-icons/io5'
import { IoChevronBackOutline } from 'react-icons/io5'
import { IoCaretDownOutline } from 'react-icons/io5'
import Avatar from 'boring-avatars'

export default function Home() {
  return (
    <div>
      <div className="flex-col bg-[#FAFBFF]">
        {/* Navbar */}
        <div className="bg-white border-b-[1px] border-slate-200">
          <div className="flex justify-between max-w-[1440px] mx-auto px-56 py-12">
            <div className="w-1/4"></div>

            <div className="flex justify-center w-half">
              <button className="px-12 py-8 mr-8 rounded hover:bg-slate-200 duration-100 ease-linear">
                <IoChevronBackOutline 
                  size={24} />
              </button>

              <button className="px-12 py-8 mr-12 rounded hover:bg-slate-200 duration-100 ease-linear">
                <IoChevronForwardOutline 
                  size={24} 
                />
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
                  name='Mother Frances'
                  variant='beam'
                  colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                />
              </button>
            </div>
          </div>
        </div>
        <div className="py-[56px]">
          {/* Table Component */}
          <div className="mx-auto max-w-[560px] static mb-[56px]">
            <div className="flex items-center absolute left-[360px]">
              <p className="font-semibold mr-[24px]">June 1, Wednesday</p>
              <div className="h-[12px] w-[12px] bg-[#8A4FFF] rounded-full outline-8 outline-[#FAFBFF] outline z-timeline-circle"></div>
            </div>
            <div className="bg-white height-full rounded-lg outline outline-1 outline-slate-200">
              {/* Panel Header */}
              <div className="p-16 border-b-[1px]">
                <p className="text-[12.8px] font-semibold ">Total Summary</p>
                <p className="">₱3,000.00</p>
              </div>
              {/* Table Heading */}
              <div className="flex">
                <div className="shrink-0 w-[160px] bg-slate-300 px-16 py-12 text-[12.8px] font-semibold border-r-[1px]">
                  Amount
                </div>
                <div className="bg-slate-300 px-16 py-12 text-[12.8px] font-semibold w-full">Description</div>
              </div>
              {/* Table Items */}
              <div className="flex">
                <input type="number" className="shrink-0 w-[160px] px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                <input className="w-full px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
              </div>
            </div>
          </div>

          {/* Table Component */}
          <div className="mx-auto max-w-[560px] static mb-[56px]">
            <div className="flex items-center absolute left-[360px]">
              <p className="font-semibold mr-[24px]">June 1, Wednesday</p>
              <div className="h-[12px] w-[12px] bg-[#8A4FFF] rounded-full outline-8 outline-[#FAFBFF] outline z-timeline-circle"></div>
            </div>
            <div className="bg-white height-full rounded-lg outline outline-1 outline-slate-200">
              {/* Panel Header */}
              <div className="p-16 border-b-[1px]">
                <p className="text-[12.8px] font-semibold ">Total Summary</p>
                <p className="">₱3,000.00</p>
              </div>
              {/* Table Heading */}
              <div className="flex">
                <div className="shrink-0 w-[160px] bg-slate-300 px-16 py-12 text-[12.8px] font-semibold border-r-[1px]">
                  Amount
                </div>
                <div className="bg-slate-300 px-16 py-12 text-[12.8px] font-semibold w-full">Description</div>
              </div>
              {/* Table Items */}
              <div className="flex">
                <input type="number" className="shrink-0 w-[160px] px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                <input className="w-full px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
              </div>
            </div>
          </div>

          {/* Table Component */}
          <div className="mx-auto max-w-[560px] static mb-[56px]">
            <div className="flex items-center absolute left-[360px]">
              <p className="font-semibold mr-[24px]">June 1, Wednesday</p>
              <div className="h-[12px] w-[12px] bg-[#8A4FFF] rounded-full outline-8 outline-[#FAFBFF] outline z-timeline-circle"></div>
            </div>
            <div className="bg-white height-full rounded-lg outline outline-1 outline-slate-200">
              {/* Panel Header */}
              <div className="p-16 border-b-[1px]">
                <p className="text-[12.8px] font-semibold ">Total Summary</p>
                <p className="">₱3,000.00</p>
              </div>
              {/* Table Heading */}
              <div className="flex">
                <div className="shrink-0 w-[160px] bg-slate-300 px-16 py-12 text-[12.8px] font-semibold border-r-[1px]">
                  Amount
                </div>
                <div className="bg-slate-300 px-16 py-12 text-[12.8px] font-semibold w-full">Description</div>
              </div>
              {/* Table Items */}
              <div className="flex">
                <input type="number" className="shrink-0 w-[160px] px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                <input className="w-full px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
              </div>
            </div>
          </div>

          {/* Table Component */}
          <div className="mx-auto max-w-[560px] static mb-[56px]">
            <div className="flex items-center absolute left-[360px]">
              <p className="font-semibold mr-[24px]">June 1, Wednesday</p>
              <div className="h-[12px] w-[12px] bg-[#8A4FFF] rounded-full outline-8 outline-[#C7D2FE] outline z-timeline-circle z-timeline-circle"></div>
            </div>
            <div className="bg-white height-full rounded-lg outline outline-1 outline-slate-200">
              {/* Panel Header */}
              <div className="p-16 border-b-[1px]">
                <p className="text-[12.8px] font-semibold ">Total Summary</p>
                <p className="">₱3,000.00</p>
              </div>
              {/* Table Heading */}
              <div className="flex">
                <div className="shrink-0 w-[160px] bg-slate-300 px-16 py-12 text-[12.8px] font-semibold border-r-[1px]">
                  Amount
                </div>
                <div className="bg-slate-300 px-16 py-12 text-[12.8px] font-semibold w-full">Description</div>
              </div>
              {/* Table Items */}
              <div className="flex">
                <input type="number" className="shrink-0 w-[160px] px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                <input className="w-full px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="h-screen w-px absolute top-[136px] left-[543px] bg-[#B0B0B0]"></div>
    </div>
  )
}
