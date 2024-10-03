import { Outlet } from 'react-router-dom'
import Nav from '../partials/nav/Nav.tsx'
import Footer from '../partials/footer/Footer.tsx'

const Layout = () => {
  return (
    <div className="w-full h-screen flex flex-col">
      <div className="w-full h-screen flex flex-col">
        <Nav />
        <Outlet />
        <Footer />
      </div>
    </div>
  )
}

export default Layout
