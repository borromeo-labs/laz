import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import cx from 'classnames'
import { Modal } from '@/components'
import { IoCaretDownOutline } from 'react-icons/io5'
import { isSameMonth, isAfter, format } from 'date-fns'
import { useExpenseMonth } from '@/page-components/ExpenseMonth'
import { formatMonth } from '@/utils/api'

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
]

const MonthPickerModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  const { push } = useRouter()

  const [selectedYear, setSelectedYear] = useState(() => new Date().getFullYear())

  const { selectedMonth } = useExpenseMonth()

  // @TODO: Update every interval
  const [today] = useState(() => formatMonth(new Date()))

  const months = useMemo(() => {
    return MONTHS.map((month, i) => {
      return {
        label: month,
        date: formatMonth(new Date(selectedYear, i + 1)),
      }
    })
  }, [selectedYear])

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
  }

  const makeSelectDateHandler = (date: string) => {
    return () => {
      push(`/?date=${date}`)
      setIsOpen(false)
    }
  }

  const selectedMonthText = useMemo(() => {
    return format(new Date(selectedMonth), 'LLLL yyyy')
  }, [selectedMonth])

  return (
    <>
      <button className="flex items-center px-16 py-8 rounded hover:bg-neutral-200 duration-150" onClick={handleOpen}>
        <p className="font-sans text-h4 mr-8">{selectedMonthText}</p>
        <i>
          <IoCaretDownOutline />
        </i>
      </button>

      <Modal title="Select Year & Month" isOpen={isOpen} onClose={handleClose}>
        <div className="grid grid-cols-4 gap-16">
          {months.map((month, i) => {
            const isActiveMonth = isSameMonth(new Date(month.date), new Date(selectedMonth))

            const isFutureMonth = isAfter(new Date(month.date), new Date(today))

            return (
              <button
                className={cx('p-8 text-left rounded disabled:opacity-50', {
                  'border-2 border-primary-600': isActiveMonth,
                  'border border-neutral-300': !isActiveMonth,
                })}
                disabled={isFutureMonth}
                onClick={makeSelectDateHandler(month.date)}
                key={month.date}>
                <div className="text-neutral-600">{month.label}</div>
                <div className="text-neutral-600">&mdash;</div>
              </button>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export { MonthPickerModal }
