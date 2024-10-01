import { Link } from 'react-router-dom'
import NavList from './NavList.tsx'
import Logo from '../../common/logo/Logo.tsx'
import Logout from '../../auth/Logout.tsx'

const Nav = () => {
  return (
    <nav className="fixed flex flex-col w-1/6 h-full border-r-2 border-gray-200 px-2">
      <div className="w-full h-24">
        <Link to="/">
          <Logo width="w-full" height="h-full" />
        </Link>
      </div>
      <NavList />
      <Logout />
    </nav>
  )
}

export default Nav
