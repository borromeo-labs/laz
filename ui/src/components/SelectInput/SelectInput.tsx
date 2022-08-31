import React from 'react'
import { IoCaretDownOutline } from 'react-icons/io5'

export interface SelectInputOption<T> {
  value: T
  label: string
}

export interface SelectInputProps<T> {
  options: SelectInputOption<T>[]
  value: T
  onChange: (value: string) => void
}

function SelectInput<T = string>({ options, value, onChange }: SelectInputProps<T>) {
  const handleChange = (evt: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(evt.currentTarget.value)
  }

  return (
    <div className="relative">
      <select
        className="flex items-center pl-16 pr-32 py-8 text-color-700 bg-neutral-200 rounded cursor-pointer appearance-none duration-150"
        value={String(value)}
        onChange={handleChange}>
        {options.map((option) => {
          return <option value={String(option.value)}>{option.label}</option>
        })}
      </select>

      <div className="absolute top-12 right-8 pointer-events-none">
        <IoCaretDownOutline />
      </div>
    </div>
  )
}

export { SelectInput }
