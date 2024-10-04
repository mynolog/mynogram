import type { CSSProperties } from 'react'
import type { Variant } from '../../store/toastStore.ts'
import { toastColor } from '../../store/toastStore.ts'
import { useEffect, useState } from 'react'

type ToastProps = {
  message: string
  variant: Variant
  style?: CSSProperties
}

const Toast = ({ message, variant, style = {} }: ToastProps) => {
  const [isVisible, setIsVisible] = useState(false)
  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => setIsVisible(false), 3000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      style={{ backgroundColor: toastColor[variant], ...style }}
      className={`fixed top-5 right-5 text-lg text-white py-2.5 px-5 rounded-lg shadow-lg transition-transform duration-1000 ease-in-out transform ${isVisible ? 'translate-x-0' : 'translate-x-[200%]'}`}
    >
      <span>{message}</span>
    </div>
  )
}

export default Toast
