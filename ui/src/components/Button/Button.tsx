import React, { ButtonHTMLAttributes } from 'react'
import cx from 'classnames'

interface ButtonProps {
  size?: 'sm' | 'md'
  type?: 'submit' | 'button'
  disabled?: boolean
  children: React.ReactNode
  onClick?: (evt: React.MouseEvent<HTMLButtonElement>) => void
}

const Button: React.FC<ButtonProps> = ({ size = 'md', type = 'button', disabled = false, children, onClick }) => {
  return (
    <button
      className={cx(
        'w-fit inline-block bg-blue-500 text-white font-semibold leading-none rounded duration-100 ease-linear enabled:hover:bg-blue-700 disabled:opacity-50',
        {
          'px-16 py-8 text-h6': size === 'sm',
          'px-24 py-16 text-h5': size === 'md'
        }
      )}
      onClick={onClick}
      type={type}
      disabled={disabled}>
      {children}
    </button>
  )
}

export { Button }
