import { format } from 'date-fns'

export const formatItemDueAt = (date: Date | string): string => {
  return format(new Date(date), 'yyyy-MM-dd')
}
