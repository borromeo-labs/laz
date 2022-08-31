import React, { useState, useMemo } from 'react'
import { useRouter } from 'next/router'
import { addMonths, subMonths } from 'date-fns'
import { IoChevronForwardOutline, IoChevronBackOutline } from 'react-icons/io5'
import { useExpenseMonth } from '@/page-components/ExpenseMonth'
import { formatMonth } from '@/utils/api'

const MonthControls = () => {
  const { push } = useRouter()

  const { selectedMonth } = useExpenseMonth()

  // @TODO: Update every interval
  const [today] = useState(() => formatMonth(new Date()))

  const handlePrevious = () => {
    const previous = subMonths(new Date(selectedMonth), 1)
    push(`?date=${formatMonth(previous)}`)
  }

  const handleNext = () => {
    const next = addMonths(new Date(selectedMonth), 1)
    push(`?date=${formatMonth(next)}`)
  }

  const isActiveMonth = useMemo(() => {
    return selectedMonth === today
  }, [selectedMonth, today])

  return (
    <>
      <button className="px-12 py-8 mr-8 rounded hover:bg-neutral-200 duration-150" onClick={handlePrevious}>
        <IoChevronBackOutline size={24} />
      </button>

      <button
        className="px-12 py-8 mr-12 rounded duration-150 hover:bg-neutral-200 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={handleNext}
        disabled={isActiveMonth}>
        <IoChevronForwardOutline size={24} />
      </button>
    </>
  )
}

export { MonthControls }
