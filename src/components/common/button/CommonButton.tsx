import type { ReactNode } from 'react'

export type CommonButtonProps = {
  children: ReactNode
  bgColor?: string
  textColor?: string
  fontSize?: string
  width?: string
  gap?: string
  onClick?: () => void
}

const CommonButton = ({
  children,
  bgColor = '#111827',
  textColor = '#fff',
  fontSize = '1.25rem',
  width = '',
  gap = '',
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
    >
      {children}
    </button>
  )
}

export default CommonButton
