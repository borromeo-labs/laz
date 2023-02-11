import React, { useState, useRef, useMemo } from 'react'
import cx from 'classnames'
import { formatItemDueAt } from '@/utils/api'
import { DateGroup } from './context'
import { getDateGroupContainerId } from './utils'
import { isSameMonth } from 'date-fns'

interface Props {
  group: DateGroup
  children: React.ReactNode
}

const ExpenseDateGroupContainer: React.FC<Props> = ({ group, children }) => {
  // @TODO: Update every interval
  const [today] = useState(() => new Date())

  const todayString = useMemo(() => {
    return formatItemDueAt(today)
  }, [today])

  const isDayActive = todayString === group.date

  const isMonthActive = useMemo(() => {
    return isSameMonth(new Date(group.date), today)
  }, [group.date, today])

  // Prevent subsequent calls. For some reason, ref gets called again when user refocuses the window.
  const onceRef = useRef(false)

  const registerRef = (element: HTMLDivElement) => {
    if (onceRef.current) {
      return
    }

    onceRef.current = true

    if (typeof window === 'undefined') {
      return
    }

    if (!element) {
      return
    }

    if (!isDayActive) {
      return
    }

    const y = element.getBoundingClientRect().top + window.pageYOffset - 120

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div
      className={cx('relative -ml-[360px] flex justify-center pb-56', {
        'opacity-60 focus-within:opacity-100': isMonthActive && !isDayActive,
      })}
      id={getDateGroupContainerId(group.date)}
      key={group.date}
      ref={registerRef}>
      {children}
    </div>
  )
}

export { ExpenseDateGroupContainer }
