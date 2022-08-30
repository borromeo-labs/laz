import React from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  action?: React.ReactNode
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, action, children }) => {
  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog onClose={onClose}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-100"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0">
          <div className="fixed inset-0 bg-black/50 z-modal-backdrop" aria-hidden="true" />
        </Transition.Child>

        <div className="fixed inset-0 z-modal-content">
          <div className="max-w-[640px] mx-auto px-24 pt-64">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-150"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-100"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full bg-white rounded">
                <div className="flex items-center justify-between py-16 px-24 w-full border-b border-neutral-200">
                  <Dialog.Title as="h5" className="text-h5 font-bold">
                    {title}
                  </Dialog.Title>

                  {action}
                </div>

                <div className="p-24">{children}</div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export { Modal }
