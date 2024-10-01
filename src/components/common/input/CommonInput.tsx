import { ChangeEvent } from 'react'

type CommonInputProps = {
  label?: string
  required?: boolean
  name: string
  value: string
  type?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

const CommonInput = ({
  label = '',
  required = false,
  name,
  value,
  onChange,
}: CommonInputProps) => {
  return (
    <div className="w-full flex flex-col items-center gap-2">
      <label htmlFor={name} className="w-1/2 text-left font-semibold">
        {label}
      </label>
      <input
        name={name}
        className="mb-1 border border-slate-300 rounded-lg outline-none p-2 w-1/2 focus:border-amber-800 focus:ring-2 focus:ring-blue-500 transition duration-200"
        value={value}
        onChange={onChange}
        required={required}
      />
    </div>
  )
}

export default CommonInput
