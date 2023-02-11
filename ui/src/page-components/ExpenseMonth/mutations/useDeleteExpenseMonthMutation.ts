import { useAxios } from '@/contexts/Axios'
import { useMutation } from 'react-query'
import { ExpenseItem } from '@/types/api'
import { useExpenseMonth } from '../ExpenseMonthProvider'

const useDeleteExpenseMonthMutation = () => {
  const { axios } = useAxios()

  const { deleteItem } = useExpenseMonth()

  const handleRequest = (item: ExpenseItem) => {
    return axios.delete(`expense-items/${item.id}`)
  }

  // Add error-handling; undo delete and bring back item when error occurs
  const { mutate: mutationFn, ...mutationData } = useMutation(handleRequest)

  const mutate = (item: ExpenseItem) => {
    deleteItem(item)
    mutationFn(item)
  }

  return { mutate, ...mutationData }
}

export { useDeleteExpenseMonthMutation }
