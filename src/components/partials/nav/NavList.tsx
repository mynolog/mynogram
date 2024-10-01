import type { IconKeys } from '../../../types/icon/iconTypes.ts'
import { useState } from 'react'
import navData from './nav.json'
import NavItem from './NavItem.tsx'
import { Link } from 'react-router-dom'

const NavList = () => {
  const [navItems, _] = useState(Object.freeze(navData.nav))
  return (
    <ul className="w-full flex flex-col gap-2">
      {navItems.length > 0 &&
        navItems.map((item) => (
          <NavItem key={item.id + item.title} iconId={item.id as IconKeys}>
            <Link to={item.to}>{item.title}</Link>
          </NavItem>
        ))}
    </ul>
  )
}

export default NavList
