import { useMutation, useQueryClient } from 'react-query'
import { AxiosResponse } from 'axios'
import { useAxios } from '@/contexts/Axios'
import { ExpenseItem, Uuid } from '@/types/api'
import { useExpenseMonth } from '@/page-components/ExpenseMonth'
import { v4 as uuid } from 'uuid'

interface ExpenseItemParams {
  group: string
}

interface ExpenseItemCreateOriginalVariables {
  amount: number
  description: string
  due_at: string
}

interface ExpenseItemCreateBufferVariables {
  id: Uuid
  group_id: Uuid
  created_at: string
  updated_at: string
}

type ExpenseItemCreateInputVariables = ExpenseItemCreateOriginalVariables & ExpenseItemCreateBufferVariables

interface ExpenseItemCreateResponse {
  expense_item: ExpenseItem
}

const useExpenseItemCreateMutation = ({ group }: ExpenseItemParams) => {
  const { insertItem, replaceItem, deleteItem } = useExpenseMonth()

  const { axios } = useAxios()

  const client = useQueryClient()

  const { mutate: mutationFn, ...mutationData } = useMutation<
    AxiosResponse<ExpenseItemCreateResponse>,
    unknown,
    ExpenseItemCreateInputVariables
  >(['expenses-groups', group, 'items'], (values) => axios.post(`/expense-groups/${group}/items`, values), {
    onSuccess: async (response, variables) => {
      const item = response.data.expense_item
      replaceItem(variables.id, item)
      client.invalidateQueries(['expense-summary', new Date(item.created_at).getFullYear()])
    },
    onError: (_, variables) => {
      deleteItem(variables)
    },
  })

  const mutate = (input: ExpenseItemCreateOriginalVariables) => {
    const item: ExpenseItemCreateInputVariables = {
      id: uuid(),
      group_id: uuid(),
      amount: input.amount,
      description: input.description,
      due_at: input.due_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    }

    mutationFn(item)

    insertItem(item)
  }

  return { mutate, ...mutationData }
}

export { useExpenseItemCreateMutation }
