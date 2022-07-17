import { Menu, Transition } from '@headlessui/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import cx from 'classnames'

function SelectMenu({ children, items }) {
  return (
    <Menu
      as="div"
      className="relative flex justify-center items-center w-48 h-48 rounded hover:bg-neutral-200 duration-150">
      <Menu.Button>{children}</Menu.Button>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95">
        <Menu.Items className="absolute right-0 top-48 mt-8 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item) => (
            <Menu.Item>
              {({ active }) => (
                <a
                  className={`flex items-center w-[224px] border-neutral-200 p-12 duration-200 ${
                    active && 'bg-primary-100'
                  }`}
                  href={item.url}>
                  {item.icon}
                  {item.label}
                </a>
              )}
            </Menu.Item>
          ))}
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export { SelectMenu }
