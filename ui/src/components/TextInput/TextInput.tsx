import React from 'react'
import Link from 'next/link'

interface TextInputOwnProps {
  label: string
  helper?: {
    label: string
    url: string
  }
}

export type TextInputProps = React.InputHTMLAttributes<HTMLInputElement> & TextInputOwnProps

const TextInput = React.forwardRef<HTMLInputElement, TextInputProps>(
  ({ label, helper, type = 'text', ...props }, ref) => {
    return (
      <div>
        {Boolean(label) && (
          <div className="flex justify-between items-center mb-[8px]">
            <label className="text-h6 font-semibold mb-[8px]">{label}</label>
            {Boolean(helper) && (
              <Link href={helper.url} passHref>
                <a className="text-h6 text-blue-500 underline cursor-pointer">{helper.label}</a>
              </Link>
            )}
          </div>
        )}

        <input
          {...props}
          type={type}
          ref={ref}
          className="w-full px-16 py-12 bg-neutral-200 rounded mb-24 hover:bg-white hover:outline-none hover:border-[1px] hover:border-primary-500 hover:border-solid hover:shadow-[0_0_0_4px_rgba(138,79,255,0.15)] focus:bg-white focus:bg-white focus:border-[1px] focus:border-primary-500 focus:border-solid focus:shadow-[0_0_0_4px_rgba(138,79,255,0.15)] focus:outline-none duration-200"
        />
      </div>
    )
  }
)

export { TextInput }
