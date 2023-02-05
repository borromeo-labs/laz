import React from 'react'
import { IoAddSharp } from 'react-icons/io5'
import { formatCurrency } from '@/utils'
import { useExpenseMonth } from './ExpenseMonthProvider'
import { ExpenseDateGroupContainer } from './ExpenseDateGroupContainer'
import { ExpenseItem } from './ExpenseItem'
import { ExpenseScrollToCurrentDate } from './ExpenseScrollToCurrentDate'
import { ExpenseMonthSkeleton } from './ExpenseMonthSkeleton'

const ExpenseMonth: React.FC = () => {
  const { dates, isDataLoading } = useExpenseMonth()

  if (isDataLoading) {
    return <ExpenseMonthSkeleton />
  }

  return (
    <>
      <div className="py-56">
        <div className="relative mx-auto max-w-[560px]">
          {dates.map((group) => (
            <ExpenseDateGroupContainer group={group} key={group.date}>
              <div className="absolute -left-[360px] flex items-center">
                <p className="mr-[24px] w-[160px] text-right font-semibold text-neutral-600">{group.label}</p>
                <div className="z-month-page-timeline-circle h-12 w-12 rounded-full bg-primary-500 outline outline-8 outline-[#F8FAFC]"></div>
              </div>

              <div className="height-full rounded-lg border border-neutral-300 bg-white">
                {/* Panel Header */}
                <div className="border-b border-neutral-400 p-16">
                  <p className="text-h6 font-semibold ">Total Summary</p>
                  <p className="">{formatCurrency(group.total)}</p>
                </div>

                {/* Table Heading */}
                <div className="wrap flex border-b border-neutral-400">
                  <div className="w-[160px] shrink-0 border-r border-neutral-400 bg-neutral-200 px-16 py-12 text-h6 font-semibold text-neutral-600">
                    Amount
                  </div>
                  <div className="w-full bg-neutral-200 px-16 py-12 text-h6 font-semibold text-neutral-500">
                    Description
                  </div>
                </div>

                {group.items.map((item) => (
                  <ExpenseItem item={item} key={item.id} />
                ))}

                <button className="flex w-full items-center p-8 text-neutral-500 duration-200 hover:text-primary-500">
                  <IoAddSharp className="mr-8" size="20" />
                  Add expenses
                </button>
              </div>
            </ExpenseDateGroupContainer>
          ))}

          <div className="absolute top-0 bottom-0 -left-[171px] w-px bg-neutral-200"></div>
        </div>
      </div>

      <ExpenseScrollToCurrentDate />
    </>
  )
}

export { ExpenseMonth }
