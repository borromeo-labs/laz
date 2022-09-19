import React, { useState, useMemo } from 'react'
import { isSameMonth } from 'date-fns'
import { formatItemDueAt } from '@/utils/api'
import { Button } from '@/components'
import { useExpenseMonth } from './ExpenseMonthProvider'
import { getDateGroupContainerId } from './utils'

const ExpenseScrollToCurrentDate = () => {
  const { data, isDataLoading, selectedMonth } = useExpenseMonth()

  // @TODO: Update every interval
  const [today] = useState(() => formatItemDueAt(new Date()))

  const handleClick = () => {
    const container = document.getElementById(getDateGroupContainerId(today))

    if (!container) {
      return
    }

    const y = container.getBoundingClientRect().top + window.pageYOffset - 120

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  const isActiveMonth = useMemo(() => {
    return isSameMonth(new Date(today), new Date(selectedMonth))
  }, [today, selectedMonth])

  if (!data || isDataLoading || !isActiveMonth) {
    return null
  }

  return (
    <div className="fixed bottom-32 right-32">
      <div className="animate-bounce">
        <Button size="sm" onClick={handleClick}>
          Scroll to Today
        </Button>
      </div>
    </div>
  )
}

export { ExpenseScrollToCurrentDate }
