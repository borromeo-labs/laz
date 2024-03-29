import React, { useState, useEffect, useMemo } from 'react'
import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Transition } from '@headlessui/react'
import { useKeyPressEvent } from 'react-use'
import { useNotificationState } from '@/hooks'
import { Badge, Button, Modal } from '@/components'

import { format } from 'date-fns'
import { formatItemDueAt, formatMonth } from '@/utils/api'
import { useExpenseItemCreateMutation } from './mutations'
import { parseExpenseString } from './utils'

const schema = Yup.object({
  amount: Yup.number().positive().integer().required(),
  description: Yup.string().required(),
})

const ExpenseClerk = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [isSuccess, setIsSuccess, isSuccessKey] = useNotificationState(500)

  const { control, handleSubmit, formState, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      input: '',
      amount: 0,
      description: '',
    },
    resolver: resolver(schema),
  })

  const group = useMemo(() => {
    // @TODO: Create `formatMonthDueAt`
    return formatMonth(new Date())
  }, [])

  const dueAt = useMemo(() => {
    // @TODO: Use `formatItemDueAt`
    return formatItemDueAt(new Date())
  }, [])

  const { mutate } = useExpenseItemCreateMutation({ group })

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const onSubmit = (values) => {
    mutate({
      ...values,
      due_at: dueAt,
    })

    setIsSuccess()

    reset()
  }

  const input = useWatch({
    control,
    name: 'input',
  })

  useEffect(() => {
    if (!input.length) return reset()
    const { amount, description } = parseExpenseString(input)
    setValue('amount', amount, { shouldValidate: true })
    setValue('description', description, { shouldValidate: true })
  }, [input])

  useKeyPressEvent('n', null, () => {
    if (document.activeElement.tagName === 'INPUT') return
    handleOpen()
  })

  return (
    <>
      <div className="mr-16">
        <Button onClick={handleOpen}>New Expenses</Button>
      </div>

      <Modal isOpen={isOpen} onClose={handleClose} title="New Expenses for Today">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center rounded border border-neutral-200 bg-white outline-none duration-200 hover:border hover:border-primary-500 hover:bg-white hover:shadow-[0_0_0_4px_rgba(138,79,255,0.15)] hover:outline-none focus:border focus:border-primary-500 focus:bg-white focus:shadow-[0_0_0_4px_rgba(138,79,255,0.15)]">
            <Controller
              control={control}
              name="input"
              render={({ field }) => (
                <input
                  type="text"
                  className="block w-full border-none bg-transparent px-16 py-12 placeholder-neutral-400 outline-0"
                  placeholder="Type something like “1k grab” or “189 Spotify”"
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <div className="flex items-center space-x-8 pr-16">
              <div>
                <Transition
                  key={isSuccessKey}
                  appear={true}
                  show={isSuccess}
                  enter="transition duration-150"
                  enterFrom="transform opacity-0 translate-y-8"
                  enterTo="transform opacity-100 translate-y-0"
                  leave="transition duration-150"
                  leaveFrom="transform opacity-100 translate-y-0"
                  leaveTo="transform opacity-0 -translate-y-8">
                  <Badge>Recorded</Badge>
                </Transition>
              </div>

              <Button type="submit" disabled={!formState.isValid} size="sm">
                Add
              </Button>
            </div>
          </div>

          <div className="h-16"></div>

          <div className="text-h6 text-neutral-500">
            Continuously record expenses for the current day as you please.
          </div>
        </form>
      </Modal>
    </>
  )
}

export { ExpenseClerk }
