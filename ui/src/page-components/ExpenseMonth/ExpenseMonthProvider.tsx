import React, { useContext, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'
import { format } from 'date-fns'
import { axios } from '@/axios'
import { ExpenseGroup } from '@/types/api'
import { ExpenseMonthContext, DateGroup } from './context'
import { groupItemsByDate } from './utils'

const ExpenseMonthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { query } = useRouter()

  const [dates, setDates] = useState<DateGroup[]>([])

  const date = useMemo(() => {
    const base = query.date ? new Date(String(query.date)) : new Date()
    return format(base, 'yyyy-MM')
  }, [query])

  const { data, isLoading: isDataLoading } = useQuery<ExpenseGroup>(
    ['expense-groups', date],
    async () => (await axios.get(`/expense-groups/${date}`)).data.expense_group,
    { onSuccess: (data) => setDates(groupItemsByDate(data)) }
  )

  return <ExpenseMonthContext.Provider value={{ data, dates, isDataLoading }}>{children}</ExpenseMonthContext.Provider>
}

const useExpenseMonth = () => {
  return useContext(ExpenseMonthContext)
}

export { ExpenseMonthProvider, useExpenseMonth }
