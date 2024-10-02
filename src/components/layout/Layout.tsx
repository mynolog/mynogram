import { Outlet } from 'react-router-dom'
import Nav from '../partials/nav/Nav.tsx'
import Footer from '../partials/footer/Footer.tsx'

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

export default Layout
