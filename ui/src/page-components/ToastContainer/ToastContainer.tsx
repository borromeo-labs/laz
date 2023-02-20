import React from 'react'
import cx from 'classnames'
import * as Toast from '@radix-ui/react-toast'
import { useToast } from '@/contexts/Toast'
import { IoClose } from 'react-icons/io5'

const ToastContainer = () => {
  const { toasts, dismiss } = useToast()

  const active = toasts[0]

  return (
    <Toast.Provider swipeDirection="right">
      <Toast.Root
        className={cx([
          'data-[state=open]:animate-in data-[state=open]:slide-in-from-top-full',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full',
          'data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)]',
          'data-[swipe=cancel]:translate-x-0 data-[swipe=cancel]:duration-300',
          'data-[swipe=end]:animate-out data-[swipe=end]:fade-out',
          'flex items-center justify-between rounded-md bg-neutral-700 p-16 text-neutral-300',
        ])}
        open={Boolean(active)}
        onOpenChange={() => dismiss(active.id)}
        // duration={active?.duration}
        duration={500000000}
        key={active?.id}>
        <Toast.Description asChild>
          <p className="text-h6 animate-in fade-in-80">{active?.text}</p>
        </Toast.Description>

        <Toast.Action className="[grid-area:_action]" asChild altText="Goto schedule to undo">
          <button className="flex h-24 w-24 items-center justify-center text-neutral-500">
            <IoClose />
          </button>
        </Toast.Action>
      </Toast.Root>
      <Toast.Viewport className="fixed bottom-0 right-0 z-[2147483647] m-0 flex w-[390px] max-w-[100vw] list-none flex-col gap-[10px] p-[var(--viewport-padding)] outline-none [--viewport-padding:_25px]" />
    </Toast.Provider>
  )
}

export { ToastContainer }
