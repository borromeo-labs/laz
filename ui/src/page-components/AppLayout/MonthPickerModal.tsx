import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { useUpdateEffect } from 'react-use'
import { useQuery } from 'react-query'
import { range } from 'lodash'
import { useAxios } from '@/contexts/Axios'
import cx from 'classnames'
import { useExpenseMonth } from '@/page-components/ExpenseMonth'
import { Modal, SelectInput } from '@/components'
import { IoCaretDownOutline } from 'react-icons/io5'
import { isSameMonth, isAfter, isBefore, format } from 'date-fns'
import { formatCurrency } from '@/utils'
import { formatMonth } from '@/utils/api'
import { MONTHS } from './constants'

interface ExpenseGroupSummaryResponse {
  expense_groups: Record<string, number>
}

const MonthPickerModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const { selectedMonth } = useExpenseMonth()

  const [selectedYear, setSelectedYear] = useState(() => new Date(selectedMonth).getFullYear())

  const { axios } = useAxios()

  const { data, isLoading } = useQuery(
    ['expense-summary', selectedYear],
    () => axios.get<ExpenseGroupSummaryResponse>(`/expense-summary?year=${selectedYear}`),
    { select: (response) => response.data.expense_groups },
  )

  const { push } = useRouter()

  // @TODO: Update every interval
  const [today] = useState(() => formatMonth(new Date()))

  const months = useMemo(() => {
    return MONTHS.map((month, i) => {
      return {
        label: month,
        date: formatMonth(new Date(selectedYear, i)),
      }
    })
  }, [selectedYear])

  useUpdateEffect(() => {
    // We want to be reactive for when MonthControls navigates to a previous year
    setSelectedYear(new Date(selectedMonth).getFullYear())
  }, [selectedMonth])

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

  const handleSelectedYearChange = (year: string) => {
    setSelectedYear(Number(year))
  }

  const selectedMonthText = useMemo(() => {
    return format(new Date(selectedMonth), 'LLLL yyyy')
  }, [selectedMonth])

  const yearOptions = useMemo(() => {
    const currentYear = new Date(today).getFullYear()
    return range(1970, currentYear + 1)
      .reverse()
      .map((y) => {
        return { label: String(y), value: y }
      })
  }, [today])

  return (
    <>
      <button className="flex items-center rounded px-16 py-8 duration-150 hover:bg-neutral-200" onClick={handleOpen}>
        <p className="mr-8 font-sans text-h4">{selectedMonthText}</p>
        <i>
          <IoCaretDownOutline />
        </i>
      </button>

      <Modal
        title="Select Year & Month"
        isOpen={isModalOpen}
        action={<SelectInput options={yearOptions} value={selectedYear} onChange={handleSelectedYearChange} />}
        onClose={handleClose}>
        <div className="grid grid-cols-4 gap-16">
          {months.map((month) => {
            const amount = data?.[month.date] ?? 0

            const date = new Date(month.date)

            const isActiveMonth = isSameMonth(date, new Date(selectedMonth))

            const isFutureMonth = isAfter(date, new Date(today))

            const isInactivePreviousMonth = isBefore(date, new Date(today)) && amount === 0

            return (
              <button
                className={cx('rounded p-8 text-left disabled:cursor-not-allowed disabled:opacity-50', {
                  'border-2 border-primary-600': isActiveMonth,
                  'border border-neutral-300': !isActiveMonth,
                })}
                disabled={isFutureMonth || isInactivePreviousMonth}
                onClick={makeSelectDateHandler(month.date)}
                key={month.date}>
                <div className="text-neutral-600">{month.label}</div>
                <div className={cx('text-neutral-600', { 'font-bold': isActiveMonth })}>
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
