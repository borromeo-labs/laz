import React from 'react'
import { formatCurrency } from '@/utils'
import { useExpenseMonth } from './ExpenseMonthProvider'

const ExpenseMonth: React.FC = () => {
  const { dates } = useExpenseMonth()

  return (
    <div className="py-[56px]">
      <div className="relative mx-auto max-w-[560px]">
        {/* Table Component */}
        {dates.map((group) => (
          <div className="relative mx-auto max-w-[560px] static mb-[56px]" key={group.date}>
            <div className="flex items-center absolute -left-[360px]">
              <p className="font-semibold mr-[24px] w-[160px] text-right">{group.label}</p>
              <div className="h-[12px] w-[12px] bg-[#8A4FFF] rounded-full outline-8 outline-[#FAFBFF] outline z-timeline-circle"></div>
            </div>

            <div className="bg-white height-full rounded-lg outline outline-1 outline-slate-200">
              {/* Panel Header */}
              <div className="p-16 border-b-[1px]">
                <p className="text-[12.8px] font-semibold ">Total Summary</p>
                <p className="">{formatCurrency(group.total)}</p>
              </div>

              {/* Table Heading */}
              <div className="flex">
                <div className="shrink-0 w-[160px] bg-slate-300 px-16 py-12 text-[12.8px] font-semibold border-r-[1px]">
                  Amount
                </div>
                <div className="bg-slate-300 px-16 py-12 text-[12.8px] font-semibold w-full">Description</div>
              </div>

              {/* Table Items */}
              {group.items.map((item) => (
                <div className="flex" key={item.id}>
                  <input
                    defaultValue={item.amount}
                    className="shrink-0 w-[160px] px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                  <input
                    defaultValue={item.description}
                    className="w-full px-16 py-12 border-r-[1px] focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="h-screen w-px absolute top-0 -left-[171px] bg-[#B0B0B0]"></div>
      </div>
    </div>
  )
}

export { ExpenseMonth }
