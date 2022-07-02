import { useMutation } from 'react-query'
import { axios } from '@/axios'
import { ExpenseGroup } from '@/types/api'

interface ExpenseGroupVariables {
  group: string
}

interface ExpenseGroupCreateInput {
  amount: number
  description: string
  due_at: string
}

interface ExpenseGroupCreateResponse {
  expense_group: ExpenseGroup
}

const useExpenseGroupCreateMutation = ({ group }: ExpenseGroupVariables) => {
  return useMutation<ExpenseGroupCreateResponse, unknown, ExpenseGroupCreateInput>(
    ['expenses-groups', group, 'items'],
    (values) => axios.post(`/expense-groups/${group}/items`, values)
  )
}

export { useExpenseGroupCreateMutation }
