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
          className="w-full px-16 py-12 border-[1px] border-solid border-slate-200 rounded"
        />
      </div>
    )
  }
)

export { TextInput }
