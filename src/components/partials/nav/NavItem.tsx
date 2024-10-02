import type { ReactNode } from 'react'
import type { IconKeys } from '../../../types/icon/iconTypes.ts'
import { icons } from './Icons.tsx'

type NavItemProps = {
  children: ReactNode
  iconId: IconKeys
  onClick?: () => void
}

const NavItem = ({ children, iconId, onClick }: NavItemProps) => {
  const icon = icons[iconId]
  return (
    <li
      onClick={onClick}
      className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors duration-300"
    >
      <span className="text-3xl">{icon}</span>
      {children}
    </li>
  )
}

export default NavItem
