import { useMutation } from 'react-query'
import { useAxios } from '@/contexts/Axios'
import { ExpenseGroup, Uuid } from '@/types/api'
import { useExpenseMonth } from '@/page-components/ExpenseMonth'
import { v4 as uuid } from 'uuid'

interface ExpenseGroupParams {
  group: string
}

interface ExpenseGroupCreateOriginalVariables {
  amount: number
  description: string
  due_at: string
}

interface ExpenseGroupCreateBufferVariables {
  id: Uuid
  group_id: Uuid
  created_at: string
  updated_at: string
}

type ExpenseGroupCreateInputVariables = ExpenseGroupCreateOriginalVariables & ExpenseGroupCreateBufferVariables

interface ExpenseGroupCreateResponse {
  expense_group: ExpenseGroup
}

const useExpenseGroupCreateMutation = ({ group }: ExpenseGroupParams) => {
  const { insertItem, replaceItem, deleteItem } = useExpenseMonth()

  const { axios } = useAxios()

  const { mutate: mutationFn, ...mutationData } = useMutation<
    ExpenseGroupCreateResponse,
    unknown,
    ExpenseGroupCreateInputVariables
  >(['expenses-groups', group, 'items'], (values) => axios.post(`/expense-groups/${group}/items`, values), {
    onSuccess: (_, variables) => {
      replaceItem(variables.id, variables)
    },
    onError: (_, variables) => {
      deleteItem(variables)
    }
  })

  const mutate = (input: ExpenseGroupCreateOriginalVariables) => {
    const item: ExpenseGroupCreateInputVariables = {
      id: uuid(),
      group_id: uuid(),
      amount: input.amount,
      description: input.description,
      due_at: input.due_at,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }

    mutationFn(item)

    insertItem(item)
  }

  return { mutate, ...mutationData }
}

export { useExpenseGroupCreateMutation }
