import React, { useState, useEffect } from 'react'

import { useForm, Controller, useWatch } from 'react-hook-form'
import { yupResolver as resolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Transition } from '@headlessui/react'
import { useKeyPressEvent } from 'react-use'
import { useNotificationState } from '@/hooks'
import { Modal } from '@/components'

import { parseExpenseString } from './utils'

const schema = Yup.object({
  amount: Yup.number().positive().integer().required(),
  description: Yup.string().required()
})

const ExpenseClerk = () => {
  const [isOpen, setIsOpen] = useState(false)

  const [isSuccess, setIsSuccess, isSuccessKey] = useNotificationState(500)

  const { control, handleSubmit, formState, setValue, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      input: '',
      amount: 0,
      description: ''
    },
    resolver: resolver(schema)
  })

  const handleOpen = () => {
    setIsOpen(true)
  }

  const handleClose = () => {
    setIsOpen(false)
    reset()
  }

  const onSubmit = (values) => {
    setIsSuccess()
    reset()
    console.log(values)
  }

  const input = useWatch({
    control,
    name: 'input'
  })

  useEffect(() => {
    if (!input.length) return reset()
    const { amount, description } = parseExpenseString(input)
    setValue('amount', amount, { shouldValidate: true })
    setValue('description', description, { shouldValidate: true })
  }, [input])

  useKeyPressEvent('n', null, () => {
    handleOpen()
  })

  return (
    <>
      <button
        className="bg-blue-500 text-white font-semibold px-24 py-8 mr-16 rounded hover:bg-blue-700 duration-100 ease-linear"
        onClick={handleOpen}>
        New Expenses
      </button>

      <Modal isOpen={isOpen} onClose={handleClose} title="New Expenses for Today">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center bg-neutral-200 rounded focus-within:ring-2 ring-offset-2 ring-blue-500">
            <Controller
              control={control}
              name="input"
              render={({ field }) => (
                <input
                  type="text"
                  className="block w-full px-16 py-12 placeholder-neutral-500 bg-transparent border-none outline-0"
                  placeholder="Type something like “1000 grab”"
                  ref={field.ref}
                  value={field.value}
                  onChange={field.onChange}
                />
              )}
            />

            <div className="flex items-center space-x-8 pr-16">
              <Transition
                key={isSuccessKey}
                appear={true}
                show={isSuccess}
                enter="transition duration-150"
                enterFrom="opacity-0 translate-y-8"
                enterTo="opacity-100 translate-y-0"
                leave="transition duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 -translate-y-8">
                <span className="inline-block p-8 text-blue-600 text-h6 font-bold leading-none bg-blue-200 rounded">
                  Recorded
                </span>
              </Transition>

              <button
                type="submit"
                disabled={!formState.isValid}
                className="inline-block py-8 px-16 text-white text-h6 font-bold leading-none bg-blue-500 rounded disabled:opacity-50">
                Add
              </button>
            </div>
          </div>

          <div className="h-16"></div>

          <div className="text-h6 text-neutral-500">
            Continuously record expenses for the current day as you please (expand).
          </div>
        </form>
      </Modal>
    </>
  )
}

export { ExpenseClerk }
