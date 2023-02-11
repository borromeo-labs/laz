import React, { useState } from 'react'
import cx from 'classnames'
import { motion } from 'framer-motion'
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

  // Framer motion hold click

  const [isHovered, setIsHovered] = useState(false)

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

            <div className="h-8" />

            <motion.button
              whileHover="hover"
              onHoverStart={() => setIsHovered(true)}
              onHoverEnd={() => setIsHovered(false)}
              className="relative block w-full rounded bg-neutral-200 py-12 px-12">
              <span className="z-10 relative flex items-center leading-none text-neutral-600">
                <IoArchiveOutline />
                <span className="ml-8">{isHovered ? 'Hold to confirm' : 'Delete'}</span>
              </span>

              <div className="z-20 absolute top-0 right-0 bottom-0 left-0">
                <motion.div
                  initial={{ width: '0%' }}
                  variants={{ hover: { width: '100%' } }}
                  transition={{ duration: 1 }}
                  className="h-full overflow-hidden rounded bg-red-200">
                  <span className="flex h-full w-[206px] items-center py-12 px-12 leading-none text-red-500">
                    <IoArchiveOutline />
                    <span className="ml-8">Hold to confirm</span>
                  </span>
                </motion.div>
              </div>
            </motion.button>
          </Popover.Panel>
        </Popover>
      </div>
    </div>
  )
}

export { ExpenseItemDeleteButton }
