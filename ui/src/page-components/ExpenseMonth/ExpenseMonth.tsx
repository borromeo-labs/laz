import React, { useMemo } from 'react'
import cx from 'classnames'
import { IoAddSharp } from 'react-icons/io5'
import { isSameDay } from 'date-fns'
import { formatCurrency } from '@/utils'
import { useExpenseMonth } from './ExpenseMonthProvider'
import { ExpenseDateGroupContainer } from './ExpenseDateGroupContainer'
import { ExpenseItem } from './ExpenseItem'
import { ExpenseScrollToCurrentDate } from './ExpenseScrollToCurrentDate'
import { ExpenseMonthSkeleton } from './ExpenseMonthSkeleton'

const ExpenseMonth: React.FC = () => {
  const { dates, isDataLoading } = useExpenseMonth()

  // Update in intervals
  const today = useMemo(() => {
    return new Date()
  }, [])

  if (isDataLoading) {
    return <ExpenseMonthSkeleton />
  }

  return (
    <>
      <div className="py-56">
        {dates.map((group, i) => {
          const isDayActive = isSameDay(new Date(group.date), today)

          return (
            <ExpenseDateGroupContainer group={group} key={group.date}>
              <div className="pr-[160px]">
                <div className="relative mb-56 flex h-full">
                  <div className="mr-[24px] w-[160px] text-right leading-none">
                    <div className="font-semibold text-neutral-600">{group.label.date},</div>
                    <div className="h-8" />
                    <div className="text-neutral-500">{group.label.day}</div>
                  </div>
                  <div
                    className={cx('z-month-page-timeline-circle h-12 w-12 rounded-full', {
                      'bg-neutral-400': !isDayActive,
                      'bg-primary-500': isDayActive,
                    })}></div>
                  <div
                    className={cx('absolute top-0 -bottom-56 right-[5px] w-px bg-neutral-200', {
                      hidden: i === dates.length - 1,
                    })}></div>
                </div>
              </div>

              <div
                className={cx('height-full w-[560px] flex-shrink-0 rounded-lg border bg-white', {
                  'border-neutral-300': !isDayActive,
                  'border-primary-500': isDayActive,
                })}>
                {/* Panel Header */}
                <div className="border-b border-neutral-400 p-16">
                  <p className="text-h6 font-semibold">Total Summary</p>
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
          )
        })}
      </div>

      <ExpenseScrollToCurrentDate />
    </>
  )
}

export { ExpenseMonth }
