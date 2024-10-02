import type { ReactNode, MouseEvent } from 'react'

export type CommonButtonProps = {
  children: ReactNode
  bgColor?: string
  textColor?: string
  fontSize?: string
  width?: string
  gap?: string
  type?: 'button' | 'submit' | 'reset'
  padding?: string
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void
}

const CommonButton = ({
  children,
  bgColor = '#111827',
  textColor = '#fff',
  fontSize = '1.25rem',
  width = '',
  gap = '',
  type = 'button',
  padding = '0.75rem',
  onClick,
}: CommonButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize,
        width,
        gap,
        padding,
      }}
      className="border-none outline-none rounded-xl flex items-center justify-center"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default CommonButton
