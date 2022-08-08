import { createContext } from 'react'
import { ExpenseGroup, ExpenseItem, ID, Uuid } from '@/types/api'

export interface DateGroup {
  label: string
  date: string
  total: number
  items: ExpenseItem[]
}

export interface ExpenseMonthContextType {
  data: ExpenseGroup
  dates: DateGroup[]
  isDataLoading: boolean
  insertItem: (item: ExpenseItem) => void
  replaceItem: (uuid: Uuid, item: ExpenseItem) => void
  updateItem: (uuid: ID, item: ExpenseItem) => void
  deleteItem: (item: ExpenseItem) => void
}

const ExpenseMonthContext = createContext<ExpenseMonthContextType>({} as ExpenseMonthContextType)

export { ExpenseMonthContext }
