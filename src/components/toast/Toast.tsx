import type { CSSProperties } from 'react'
import type { Variant } from '../../store/toastStore.ts'
import { toastColor } from '../../store/toastStore.ts'

type ToastProps = {
  message: string
  variant: Variant
  style?: CSSProperties
}

const Toast = ({ message, variant, style = {} }: ToastProps) => {
  return (
    <div
      style={{ backgroundColor: toastColor[variant], ...style }}
      className="z-[999] fixed top-5 right-5 text-lg text-white py-2.5 px-5 rounded-lg shadow-lg transition duration-500 ease-in opacity-100"
    >
      <span>{message}</span>
    </div>
  )
}

export default Toast
