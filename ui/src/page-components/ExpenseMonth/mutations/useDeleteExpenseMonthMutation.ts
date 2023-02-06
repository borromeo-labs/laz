import { useAxios } from '@/contexts/Axios'
import { useMutation } from 'react-query'
import { ExpenseItem } from '@/types/api'

const useDeleteExpenseMonthMutation = () => {
  const { axios } = useAxios()

  const handleRequest = (item: ExpenseItem) => {
    return axios.delete(`expense-items/${item.id}`)
  }

  return useMutation(handleRequest)
}

export { useDeleteExpenseMonthMutation }
