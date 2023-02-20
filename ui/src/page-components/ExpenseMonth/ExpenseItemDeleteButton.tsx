import React, { useState } from 'react'
import cx from 'classnames'
import { IoCloseOutline } from 'react-icons/io5'
import { motion } from 'framer-motion'
import * as Popover from '@radix-ui/react-popover'
import { IoArchiveOutline } from 'react-icons/io5'
import { ExpenseItem } from '@/types/api'
import { useDeleteExpenseMonthMutation } from './mutations'
import { useLongPress } from 'react-use'

interface ExpenseItemDeleteButtonProps {
  item: ExpenseItem
}

const HoldToDeleteDurationInSeconds = 1

const ExpenseItemDeleteButton: React.FC<ExpenseItemDeleteButtonProps> = ({ item }) => {
  const { mutate } = useDeleteExpenseMonthMutation()

  const [isOpen, setIsOpen] = useState(false)

  const [isHolding, setIsHolding] = useState(false)

  const { onMouseDown, onMouseUp, ...longPressEvents } = useLongPress(() => mutate(item), {
    delay: HoldToDeleteDurationInSeconds * 1000,
  })

  const handleMouseDown = (e) => {
    onMouseDown(e)
    setIsHolding(true)
  }

  const handleMouseUp = (e) => {
    onMouseUp(e)
    setIsHolding(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
  }

  return (
    <div className="absolute top-0 bottom-0 right-0 flex translate-x-full items-center px-8">
      <div
        className={cx(
          'transition-transform group-focus-within:translate-x-0 group-focus-within:opacity-100 group-hover:translate-x-0 group-hover:opacity-100',
          {
            '-translate-x-4 opacity-0': !isOpen,
            'translate-x-0 opacity-100': isOpen,
          },
        )}>
        <Popover.Root open={isOpen} onOpenChange={handleOpenChange}>
          <Popover.Trigger
            className="box-shadow rounded bg-transparent p-4 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-500"
            title="Delete expense record">
            <IoArchiveOutline />
          </Popover.Trigger>

          <Popover.Portal>
            <Popover.Content
              align="center"
              className="w-[280px] rounded border border-neutral-200 bg-white p-16 drop-shadow-xl">
              <Popover.Close
                className="absolute top-8 right-8 inline-flex h-24 w-24 items-center justify-center rounded-full text-neutral-500 outline-none hover:bg-neutral-200 focus:bg-neutral-200"
                aria-label="Close">
                <IoCloseOutline />
              </Popover.Close>

              <p className="text-h6 leading-none text-neutral-500">Options</p>
              <div className="h-16" />
              <motion.button
                {...longPressEvents}
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                initial="inactive"
                animate={isHolding ? 'active' : 'inactive'}
                className="relative block w-full rounded bg-neutral-200 py-12 px-12">
                <span className="z-10 relative flex items-center font-medium leading-none text-neutral-600">
                  <IoArchiveOutline />
                  <span className="ml-8">{isHolding ? 'Hold to confirm' : 'Delete'}</span>
                </span>

                <div className="z-20 absolute top-0 right-0 bottom-0 left-0">
                  <motion.div
                    variants={{ active: { width: '100%' }, inactive: { width: '0%' } }}
                    transition={{ duration: HoldToDeleteDurationInSeconds }}
                    className="h-full overflow-hidden rounded bg-red-200">
                    <span className="flex h-full w-[206px] items-center py-12 px-12 font-medium leading-none text-red-500">
                      <IoArchiveOutline />
                      <span className="ml-8">Hold to confirm</span>
                    </span>
                  </motion.div>
                </div>
              </motion.button>
              <Popover.Arrow className="border-neutral-200 fill-white" />
            </Popover.Content>
          </Popover.Portal>
        </Popover.Root>
      </div>
    </div>
  )
}

export { ExpenseItemDeleteButton }
