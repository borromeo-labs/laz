import React from 'react'
import { formatCurrency } from '@/utils'
import { useExpenseMonth } from './ExpenseMonthProvider'

const ExpenseMonth: React.FC = () => {
  const { dates } = useExpenseMonth()

  return (
    <div className="py-56">
      <div className="relative mx-auto max-w-[560px]">
        {/* Table Component */}
        {dates.map((group) => (
          <div className="relative mb-[56px]" key={group.date}>
            <div className="flex items-center absolute -left-[360px]">
              <p className="text-neutral-600 font-semibold mr-[24px] w-[160px] text-right">{group.label}</p>
              <div className="h-12 w-12 bg-primary-500 rounded-full outline-8 outline-[#F8FAFC] outline z-timeline-circle"></div>
            </div>

            <div className="bg-white height-full rounded-lg border border-neutral-300">
              {/* Panel Header */}
              <div className="p-16 border-b border-neutral-400">
                <p className="text-h6 font-semibold ">Total Summary</p>
                <p className="">{formatCurrency(group.total)}</p>
              </div>

              {/* Table Heading */}
              <div className="flex wrap border-b border-neutral-400">
                <div className="shrink-0 w-[160px] bg-neutral-200 text-neutral-600 px-16 py-12 text-h6 font-semibold border-r border-neutral-400">
                  Amount
                </div>
                <div className="bg-neutral-200 text-neutral-500 px-16 py-12 text-h6 font-semibold w-full">Description</div>
              </div>

              {/* Table Items */}
              {group.items.map((item) => (
                <div className="flex group" key={item.id}>
                  <input
                    defaultValue={item.amount}
                    className="shrink-0 group-last:rounded-bl-[8px] group-last:border-b-0 w-[160px] px-16 py-8 border-r border-b border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                  <input
                    defaultValue={item.description}
                    className="w-full group-last:rounded-br-[8px] group-last:border-b-0 px-16 py-8 border-r border-b border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset"></input>
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className="w-px absolute top-0 bottom-0 -left-[171px] bg-neutral-200"></div>
      </div>
    </div>
  )
}

export { ExpenseMonth }
