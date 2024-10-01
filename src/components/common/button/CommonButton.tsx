import type { ReactNode, MouseEvent } from 'react'

export type CommonButtonProps = {
  children: ReactNode
  bgColor?: string
  textColor?: string
  fontSize?: string
  width?: string
  gap?: string
  type?: 'button' | 'submit' | 'reset'
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
  onClick = () => {},
}: CommonButtonProps) => {
  return (
    <button
      style={{
        backgroundColor: bgColor,
        color: textColor,
        fontSize,
        width,
        gap,
      }}
      className="p-3 border-none outline-none rounded-xl flex items-center justify-center"
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  )
}

export default CommonButton
