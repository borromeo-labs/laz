import { groupBy } from 'lodash'
import { ExpenseItem, ExpenseGroup } from '@/types/api'
import { DateGroup } from './context'
import { format, lastDayOfMonth, setDate } from 'date-fns'

const groupItemsByDate = (group: ExpenseGroup): DateGroup[] => {
  const groups = groupBy<ExpenseItem>(group.items, 'due_at')
  const dayCount = lastDayOfMonth(new Date(group.month)).getDate()
  const days = Array.from({ length: dayCount }).map((_, i) => i)

  return days.map((day) => {
    const d = setDate(new Date(group.month), day + 1)
    const date = format(d, 'yyyy-MM-dd')
    const label = { date: format(d, 'LLLL d'), day: format(d, 'EEEE') }
    const items = date in groups ? groups[date] : []
    const total = date in groups ? getDateGroupTotal(items) : 0
    return { label, date, total, items }
  })
}

const getDateGroupTotal = (items: ExpenseItem[]): number => {
  return items.reduce((total, item) => total + item.amount, 0)
}

const getDateGroupContainerId = (date: string) => {
  return `expense-date-group-container-${date}`
}

export { groupItemsByDate, getDateGroupTotal, getDateGroupContainerId }
