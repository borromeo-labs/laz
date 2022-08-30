import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useAxios } from '@/contexts/Axios'
import cx from 'classnames'
import { Modal } from '@/components'
import { IoCaretDownOutline } from 'react-icons/io5'
import { isSameMonth, isAfter, format } from 'date-fns'
import { useExpenseMonth } from '@/page-components/ExpenseMonth'
import { formatCurrency } from '@/utils'
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

interface ExpenseGroupSummaryResponse {
  expense_groups: Record<string, number>
}

const MonthPickerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { selectedMonth } = useExpenseMonth()

  const [selectedYear, setSelectedYear] = useState(() => new Date(selectedMonth).getFullYear())

  const { axios } = useAxios()

  const { data, isLoading } = useQuery(
    'expense-summary',
    () => {
      const year = new Date(selectedMonth).getFullYear()
      return axios.get<ExpenseGroupSummaryResponse>(`/expense-summary?year=${year}`)
    },
    { select: (response) => response.data.expense_groups },
  )

  const { push } = useRouter()

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
    setIsModalOpen(true)
  }

  const handleClose = () => {
    setIsModalOpen(false)
  }

  const makeSelectDateHandler = (date: string) => {
    return () => {
      push(`/?date=${date}`)
      setIsModalOpen(false)
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

      <Modal title="Select Year & Month" isOpen={isModalOpen} onClose={handleClose}>
        <div className="grid grid-cols-4 gap-16">
          {months.map((month, i) => {
            const isActiveMonth = isSameMonth(new Date(month.date), new Date(selectedMonth))

            const isFutureMonth = isAfter(new Date(month.date), new Date(today))

            const amount = data?.[month.date]

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
                <div className="text-neutral-600">
                  {isLoading || !amount ? <span>&mdash;</span> : formatCurrency(amount)}
                </div>
              </button>
            )
          })}
        </div>
      </Modal>
    </>
  )
}

export { MonthPickerModal }
