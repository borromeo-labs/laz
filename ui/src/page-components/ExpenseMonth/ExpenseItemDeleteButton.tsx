import React from 'react'
import cx from 'classnames'
import { Button } from '@/components'
import { Popover } from '@headlessui/react'
import { IoArchiveOutline } from 'react-icons/io5'
import { ExpenseItem } from '@/types/api'
import { useDeleteExpenseMonthMutation } from './mutations'

interface ExpenseItemDeleteButtonProps {
  item: ExpenseItem
}

const ExpenseItemDeleteButton: React.FC<ExpenseItemDeleteButtonProps> = ({ item }) => {
  const { mutate, isLoading } = useDeleteExpenseMonthMutation()

  return (
    <div className="absolute top-0 bottom-0 right-0 flex translate-x-full items-center px-8">
      <div className="-translate-x-4 opacity-0 transition-transform group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100">
        <Popover className="relative">
          <Popover.Button
            className="rounded bg-transparent p-4 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-500"
            title="Delete expense record">
            <IoArchiveOutline />
          </Popover.Button>

          <Popover.Panel className="z-10 absolute top-full w-[240px]  rounded border border-neutral-200 bg-white p-16">
            <p>Are you sure to do this?</p>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  )
}

export { ExpenseItemDeleteButton }
