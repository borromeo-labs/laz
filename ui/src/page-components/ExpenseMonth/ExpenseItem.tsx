import React, { useState } from 'react'
import cx from 'classnames'
import { useMutation, useQueryClient } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'
import { useAxios } from '@/contexts/Axios'
import { useExpenseMonth } from './ExpenseMonthProvider'
import { ExpenseItem } from '@/types/api'
import { useForm, FormProvider, Controller, RefCallBack } from 'react-hook-form'
import { formatItemDueAt } from '@/utils/api'
import * as Yup from 'yup'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import { ExpenseItemDeleteButton } from './ExpenseItemDeleteButton'

const schema = Yup.object({
  amount: Yup.number().positive().integer(),
  description: Yup.string().max(255),
})

type ExpenseItemFormValues = Yup.InferType<typeof schema>

interface ExpenseItemProps {
  item: ExpenseItem
}

interface UpdateExpenseItemResponse {
  expense_item: ExpenseItem
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item }) => {
  const { updateItem } = useExpenseMonth()

  const form = useForm<ExpenseItemFormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: item.amount,
      description: item.description,
    },
    resolver: resolver(schema),
  })

  const { control, getValues } = form

  const { axios } = useAxios()

  const client = useQueryClient()

  const handleMutation = (values: ExpenseItemFormValues) => {
    return axios.put<UpdateExpenseItemResponse>(`expense-items/${item.id}`, {
      ...values,
      due_at: formatItemDueAt(item.due_at),
    })
  }

  const handleSuccess = () => {
    client.invalidateQueries(['expense-summary', new Date(item.created_at).getFullYear()])
  }

  // @TODO: Optimistic error handling
  // https://linear.app/borromeo-labs/issue/BOR-72/undo-expense-item-updates-and-show-toast-when-error-occurs
  const { mutateAsync } = useMutation(['expense-items', item.id], handleMutation, { onSuccess: handleSuccess })

  const handleChange = (field, value) => {
    const values = getValues()
    updateItem(item.id, { ...item, [field]: value })
    mutateAsync({ ...values, [field]: value })
  }

  return (
    <FormProvider {...form}>
      <div className="group relative flex " key={item.id}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <ExpenseDebouncedInput
              {...field}
              value={String(field.value)}
              onChange={(value) => {
                const amount = Number(value)
                field.onChange(amount)
                handleChange(field.name, amount)
              }}
              width={160}
              placeholder={String(item.amount)}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => (
            <ExpenseDebouncedInput
              {...field}
              onChange={(value) => {
                field.onChange(value)
                handleChange(field.name, value)
              }}
              placeholder={item.description}
            />
          )}
        />

        <ExpenseItemDeleteButton item={item} />
      </div>
    </FormProvider>
  )
}

interface ExpenseDebouncedInputProps {
  value?: string
  placeholder?: string
  name?: string
  onBlur?: (evt: React.FocusEvent) => void
  width?: number
  onChange: (value: string) => void
}

const ExpenseDebouncedInput: React.FC<ExpenseDebouncedInputProps> = React.forwardRef(
  ({ value, name, placeholder, width, onChange }, ref: RefCallBack) => {
    const [internalValue, setInternalValue] = useState(value)

    const debouncedOnChange = useDebouncedCallback((value: string) => onChange(value), 500)

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      const input = evt.target.value ?? ''
      setInternalValue(input)
      debouncedOnChange(input)
    }

    return (
      <input
        ref={ref}
        value={internalValue}
        onChange={handleInput}
        placeholder={placeholder}
        name={name}
        className={cx(
          'focus:ring-blue-500 border-r border-b border-neutral-200 px-16 py-8 ring-inset last:border-r-0 focus:outline-none focus:ring-2 group-last:rounded-br-[8px] group-last:border-b-0',
          {
            'w-full': width == null,
          },
        )}
        style={width ? { width } : {}}
      />
    )
  },
)

export { ExpenseItem }
