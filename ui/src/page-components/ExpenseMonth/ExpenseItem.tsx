import React, { useState } from 'react'
import cx from 'classnames'
import { AxiosResponse } from 'axios'
import { useMutation } from 'react-query'
import { useDebouncedCallback } from 'use-debounce'
import { useAxios } from '@/contexts/Axios'
import { useExpenseMonth } from './ExpenseMonthProvider'
import { ExpenseItem } from '@/types/api'
import { useForm, FormProvider, Controller, RefCallBack } from 'react-hook-form'
import { formatItemDueAt } from '@/utils/api'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

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

  const handleUpdateItemSuccess = (response: AxiosResponse<UpdateExpenseItemResponse>) => {
    updateItem(item.id, response.data.expense_item)
  }

  const { mutateAsync } = useMutation<AxiosResponse<UpdateExpenseItemResponse>, null, ExpenseItemFormValues>(
    ['expense-items', item.id],
    (values) => {
      return axios.put(`expense-items/${item.id}`, {
        ...values,
        due_at: formatItemDueAt(item.due_at),
      })
    },
    { onSuccess: handleUpdateItemSuccess },
  )

  const handleChange = (field, value) => {
    const values = getValues()
    mutateAsync({ ...values, [field]: value })
  }

  return (
    <FormProvider {...form}>
      <div className="flex group" key={item.id}>
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
          'group-last:rounded-br-[8px] group-last:border-b-0 px-16 py-8 border-b border-neutral-200 focus:outline-none focus:ring-2 focus:ring-blue-500 ring-inset',
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
