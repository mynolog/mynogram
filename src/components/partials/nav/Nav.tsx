import { Link } from 'react-router-dom'
import NavList from './NavList.tsx'
import { CSSProperties } from 'react'

const fontStyle: CSSProperties = {
  fontFamily: "'Edu AU VIC WA NT Guides cursive', cursive",
  fontOpticalSizing: 'auto',
  fontWeight: '800',
  fontStyle: 'normal',
}

const Nav = () => {
  return (
    <nav className="flex flex-col w-1/6 h-full border-r-2 border-gray-200 px-2">
      <div className="w-full h-24">
        <Link to="/">
          <span
            style={fontStyle}
            className="w-full h-full flex items-center text-3xl active:text-gray-500"
          >
            Mynogram
          </span>
        </Link>
      </div>
      <NavList />
    </nav>
  )
}

export default Nav
