import React from 'react'
import { Dialog, Transition } from '@headlessui/react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  return (
    <Transition
      show={isOpen}
      enter="transition duration-100 ease-out"
      enterFrom="transform scale-95 opacity-0"
      enterTo="transform scale-100 opacity-100"
      leave="transition duration-75 ease-out"
      leaveFrom="transform scale-100 opacity-100"
      leaveTo="transform scale-95 opacity-0">
      <Dialog onClose={onClose} className="relative z-modal">
        <div className="fixed inset-0 bg-dark-backdrop">
          <div className="max-w-[640px] mx-auto px-24 pt-64">
            <Dialog.Panel className="w-full bg-white rounded">
              <div className="flex items-center justify-apart py-16 px-24 border-b border-neutral-200">
                <Dialog.Title as="h5" className="text-h5 font-bold">
                  {title}
                </Dialog.Title>
              </div>

              <div className="p-24">{children}</div>
            </Dialog.Panel>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export { Modal }
