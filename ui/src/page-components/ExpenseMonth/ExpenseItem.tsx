import React, { useState } from 'react'
import cx from 'classnames'
import { useMutation } from 'react-query'
import { useDebounce, useUpdateEffect } from 'react-use'
import { useAxios } from '@/contexts/Axios'
import { ExpenseItem } from '@/types/api'
import { useForm, FormProvider, Controller, RefCallBack } from 'react-hook-form'
import { formatItemDueAt } from '@/utils/api'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

// @TODO: Feels like we don't need this at all
const schema = Yup.object({
  amount: Yup.number().positive().integer(),
  description: Yup.string().max(255),
})

type ExpenseItemFormValues = Yup.InferType<typeof schema>

interface ExpenseItemProps {
  item: ExpenseItem
}

const ExpenseItem: React.FC<ExpenseItemProps> = ({ item }) => {
  const { control, watch, ...form } = useForm<ExpenseItemFormValues>({
    mode: 'onChange',
    defaultValues: {
      amount: item.amount,
      description: item.description,
    },
    resolver: resolver(schema),
  })

  const { axios } = useAxios()

  const handleUpdateItemSuccess = () => {
    // @TODO: Update ExpenseMonthProvider & DateGroup total
  }

  const { mutate } = useMutation(
    ['expense-items', item.id],
    (values: ExpenseItemFormValues) => {
      return axios.put(`expense-items/${item.id}`, {
        ...values,
        due_at: formatItemDueAt(item.due_at),
      })
    },
    { onSuccess: handleUpdateItemSuccess },
  )

  const [amount, description] = watch(['amount', 'description'])

  useUpdateEffect(() => {
    mutate({ amount, description })
  }, [amount, description])

  return (
    <FormProvider control={control} watch={watch} {...form}>
      <div className="flex group" key={item.id}>
        <Controller
          name="amount"
          control={control}
          render={({ field }) => (
            <ExpenseDebouncedInput
              {...field}
              value={String(field.value)}
              onChange={(value) => field.onChange(Number(value))}
              width={160}
              placeholder={String(item.amount)}
            />
          )}
        />

        <Controller
          name="description"
          control={control}
          render={({ field }) => <ExpenseDebouncedInput {...field} placeholder={item.description} />}
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

    const handleInput = (evt: React.ChangeEvent<HTMLInputElement>) => {
      console.log('changing input')
      setInternalValue(evt.target.value)
    }

    useDebounce(
      () => {
        console.log('debounce')
        onChange(internalValue ?? '')
      },
      500,
      [internalValue],
    )

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
