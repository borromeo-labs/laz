import React, { useContext, useMemo, useState } from 'react'
import immer, { current } from 'immer'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { useSession } from 'next-auth/react'
import { format, isSameMonth } from 'date-fns'
import { useAxios } from '@/contexts/Axios'
import { fatal } from '@/utils'
import { formatMonth } from '@/utils/api'
import { ExpenseGroup, ExpenseItem, ID, Uuid } from '@/types/api'
import { ExpenseMonthContext, DateGroup } from './context'
import { groupItemsByDate, getDateGroupTotal } from './utils'

// @TODO: Let's movethis under contexts/ folder
const ExpenseMonthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { query } = useRouter()

  const { data: session } = useSession()

  const [dates, setDates] = useState<DateGroup[]>([])

  const { axios } = useAxios()

  const selectedMonth = useMemo(() => {
    const base = query.date ? new Date(String(query.date)) : new Date()
    return format(base, 'yyyy-MM')
  }, [query])

  const { data, isLoading: isDataLoading } = useQuery<ExpenseGroup>(
    ['expense-groups', selectedMonth],
    async () => (await axios.get(`/expense-groups/${selectedMonth}`)).data.expense_group,
    {
      enabled: Boolean(session),
      onSuccess: (data) => setDates(groupItemsByDate(data)),
      onError: () => setDates([]),
    },
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
      }),
    )
  }

  // Should be used only to replace buffer item for newly created items
  const replaceItem = (id: Uuid, item: ExpenseItem) => {
    setDates(
      immer((draft) => {
        const group: DateGroup = draft.find((g) => g.date === item.due_at)
        if (!group) throw fatal('Unable to replace item from the correct date group.')
        const index = group.items.findIndex((item) => item.id === id)
        if (index === -1) throw fatal('Unable to replace buffer item.')
        group.items[index] = item
      }),
    )
  }

  // Should be used for actual update operations
  const updateItem = (id: ID, item: ExpenseItem) => {
    setDates(
      immer((draft) => {
        const group: DateGroup = draft.find((g) => g.date === item.due_at)
        if (!group) throw fatal('Unable to replace item from the correct date group.')
        const index = group.items.findIndex((item) => item.id === id)
        if (index === -1) throw fatal('Unable to replace buffer item.')
        group.items[index] = item
        group.total = getDateGroupTotal(group.items)
      }),
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
      }),
    )
  }

  return (
    <ExpenseMonthContext.Provider
      value={{
        data,
        selectedMonth,
        dates,
        isDataLoading,
        insertItem,
        replaceItem,
        updateItem,
        deleteItem,
      }}>
      {children}
    </ExpenseMonthContext.Provider>
  )
}

const useExpenseMonth = () => {
  return useContext(ExpenseMonthContext)
}

export { ExpenseMonthProvider, useExpenseMonth }
