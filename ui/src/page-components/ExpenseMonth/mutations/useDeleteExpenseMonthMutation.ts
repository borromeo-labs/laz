import { useAxios } from '@/contexts/Axios'
import { useMutation, useQueryClient } from 'react-query'
import { ExpenseItem } from '@/types/api'
import { useExpenseMonth } from '../ExpenseMonthProvider'

const useDeleteExpenseMonthMutation = () => {
  const { axios } = useAxios()

  const { deleteItem } = useExpenseMonth()

  const client = useQueryClient()

  const handleRequest = async (item: ExpenseItem) => {
    await axios.delete(`expense-items/${item.id}`)
    return item
  }

  const handleSuccess = (item: ExpenseItem) => {
    client.invalidateQueries(['expense-summary', new Date(item.created_at).getFullYear()])
  }

  // Add error-handling; undo delete and bring back item when error occurs
  const { mutate: mutationFn, ...mutationData } = useMutation(handleRequest, {
    onSuccess: handleSuccess,
  })

  const mutate = (item: ExpenseItem) => {
    deleteItem(item)
    mutationFn(item)
  }

  return { mutate, ...mutationData }
}

export { useDeleteExpenseMonthMutation }
