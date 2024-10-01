import { Outlet } from 'react-router-dom'
import Nav from '../partials/nav/Nav.tsx'

const Layout = () => {
  return (
    <div className="w-full h-screen flex">
      <Nav />
      <main className="w-full ml-72 mr-20">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
