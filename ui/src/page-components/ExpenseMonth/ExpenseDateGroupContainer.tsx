import React, { useState } from 'react'
import { DateGroup } from './context'
import { formatItemDueAt } from '@/utils/api'

interface Props {
  group: DateGroup
  children: React.ReactNode
}

const ExpenseDateGroupContainer: React.FC<Props> = ({ group, children }) => {
  // @TODO: Update every interval
  const [today] = useState(() => formatItemDueAt(new Date()))

  const registerRef = (element: HTMLDivElement) => {
    if (typeof window === 'undefined') {
      return
    }

    if (!element) {
      return
    }

    if (today !== group.date) {
      return
    }

    console.log('here')

    const y = element.getBoundingClientRect().top + window.pageYOffset - 120

    window.scrollTo({ top: y, behavior: 'smooth' })
  }

  return (
    <div className="relative mb-[56px]" key={group.date} ref={registerRef}>
      {children}
    </div>
  )
}

export { ExpenseDateGroupContainer }
