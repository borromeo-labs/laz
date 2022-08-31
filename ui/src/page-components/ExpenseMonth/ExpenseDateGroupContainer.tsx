import React, { useState, useRef } from 'react'
import { formatItemDueAt } from '@/utils/api'
import { DateGroup } from './context'
import { getDateGroupContainerId } from './utils'

interface Props {
  group: DateGroup
  children: React.ReactNode
}

const ExpenseDateGroupContainer: React.FC<Props> = ({ group, children }) => {
  // @TODO: Update every interval
  const [today] = useState(() => formatItemDueAt(new Date()))

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

    if (today !== group.date) {
      return
    }

    const y = element.getBoundingClientRect().top + window.pageYOffset - 120

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="relative mb-[56px]" id={getDateGroupContainerId(group.date)} key={group.date} ref={registerRef}>
      {children}
    </div>
  )
}

export { ExpenseDateGroupContainer }
