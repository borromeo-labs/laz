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
          <div className="flex justify-between items-center mb-8">
            <label className="text-h6 font-semibold">{label}</label>
            {Boolean(helper) && (
              <Link href={helper.url} passHref>
                <a className="text-h6 text-primary-500 underline cursor-pointer">{helper.label}</a>
              </Link>
            )}
          </div>
        )}

        <input
          {...props}
          type={type}
          ref={ref}
          className="w-full px-16 py-12 bg-neutral-200 outline-none rounded border border-neutral-200 hover:bg-white hover:outline-none hover:border hover:border-primary-500 hover:shadow-[0_0_0_4px_rgba(138,79,255,0.15)] focus:bg-white focus:border focus:border-primary-500 focus:shadow-[0_0_0_4px_rgba(138,79,255,0.15)] duration-200"
        />
      </div>
    )
  }
)

export { TextInput }
