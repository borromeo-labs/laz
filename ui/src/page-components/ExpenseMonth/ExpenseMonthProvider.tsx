import React, { useContext, useMemo, useState } from 'react'
import immer, { current } from 'immer'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { format, isSameMonth } from 'date-fns'
import { useAxios } from '@/contexts/Axios'
import { fatal } from '@/utils'
import { ExpenseGroup, ExpenseItem, ID, Uuid } from '@/types/api'
import { ExpenseMonthContext, DateGroup } from './context'
import { groupItemsByDate, getDateGroupTotal } from './utils'

// @TODO: Let's movethis under contexts/ folder
const ExpenseMonthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { query } = useRouter()

  const [dates, setDates] = useState<DateGroup[]>([])

  const { axios } = useAxios()

  const date = useMemo(() => {
    const base = query.date ? new Date(String(query.date)) : new Date()
    return format(base, 'yyyy-MM')
  }, [query])

  const { data, isLoading: isDataLoading } = useQuery<ExpenseGroup>(
    ['expense-groups', date],
    async () => (await axios.get(`/expense-groups/${date}`)).data.expense_group,
    { onSuccess: (data) => setDates(groupItemsByDate(data)) }
  )

  const insertItem = (item: ExpenseItem) => {
    if (!isSameMonth(new Date(data?.month), new Date(item.due_at))) return

    setDates(
      immer((draft) => {
        const group: DateGroup = draft.find((g) => g.date === item.due_at)
        if (!group) throw fatal('Unable to insert item into the correct date group.')
        group.items.push(item)
        // @TODO: We probably should calculate this on our render function instead
        group.total = getDateGroupTotal(group.items)
      })
    )
  }

  const replaceItem = (id: Uuid, item: ExpenseItem) => {
    setDates(
      immer((draft) => {
        const group: DateGroup = draft.find((g) => g.date === item.due_at)
        if (!group) throw fatal('Unable to replace item from the correct date group.')
        console.log(current(group.items), id)
        const index = group.items.findIndex((item) => item.id === id)
        if (index === -1) throw fatal('Unable to replace buffer item.')
        group.items[index] = item
      })
    )
  }

  const deleteItem = (item: ExpenseItem) => {
    setDates(
      immer((draft) => {
        const group: DateGroup = draft.find((g) => g.date === item.due_at)
        if (!group) throw fatal('Unable to delete item from the correct date group.')
        group.items = group.items.filter((i) => i.id !== item.id)
        // @TODO: We probably should calculate this on our render function instead
        group.total = getDateGroupTotal(group.items)
      })
    )
  }

  return (
    <ExpenseMonthContext.Provider value={{ data, dates, isDataLoading, insertItem, replaceItem, deleteItem }}>
      {children}
    </ExpenseMonthContext.Provider>
  )
}

const useExpenseMonth = () => {
  return useContext(ExpenseMonthContext)
}

export { ExpenseMonthProvider, useExpenseMonth }
