import React, { useContext, useState, useMemo } from 'react'
import { ExpenseGroup, ExpenseItem } from '@/types/api'

export interface DateGroup {
  label: string
  date: string
  total: number
  items: ExpenseItem[]
}

export interface ExpenseMonthContextType {
  data: any
  dates: DateGroup[]
  isDataLoading: boolean
}

const ExpenseMonthContext = React.createContext<ExpenseMonthContextType>({} as ExpenseMonthContextType)

export { ExpenseMonthContext }
