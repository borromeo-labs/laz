import React from 'react'
import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cx from 'classnames'

interface SelectMenuItem {
  icon: React.ReactElement
  label: string
  url?: string
  onClick?: () => void
}

interface SelectMenuProps {
  items: SelectMenuItem[]
  children: React.ReactNode
}

const SelectMenu: React.FC<SelectMenuProps> = ({ children, items }) => {
  const makeClickHandler = (item: SelectMenuItem) => {
    return (evt: React.MouseEvent<HTMLAnchorElement>) => {
      if (!item.onClick) return
      evt.stopPropagation()
      item.onClick()
    }
  }

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
        <Menu.Items className="absolute px-[4px] py-8 right-0 top-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          {items.map((item, i) => (
            <Menu.Item key={i}>
              {({ active }) => (
                <a
                  className={cx(
                    `flex items-center w-[224px] rounded border-neutral-200 p-12 duration-200 cursor-pointer`,
                    {
                      'bg-primary-100': active,
                    },
                  )}
                  href={item.url}
                  onClick={makeClickHandler(item)}>
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
