type ID = number

export interface User {
  name: string
  email: string
  avatar: string
  expenses: ExpenseGroup[]
  bills: Bill[]
}

export interface ExpenseItem {
  id: ID
  group_id: ID
  group: ExpenseGroup
  amount: number
  description: string
  due_at: string
}

export interface ExpenseGroup {
  id: ID
  user_id: ID
  user: User
  name: string
  month: string
  amount_total: number
  items: ExpenseItem[]
  created_at: number
  updated_at: number
}

export interface Bill {
  id: ID
  user_id: ID
  amount: number
  description: string
  recur_at: string
  recur_interval: 'annually' | 'monthly'
}
