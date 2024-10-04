import type { ActiveModalFlag } from '../../../store/modalStore.ts'
import NavItem from './NavItem.tsx'
import { Link, useNavigate } from 'react-router-dom'
import useModalStore from '../../../store/modalStore.ts'
import useAuthStore from '../../../store/authStore.ts'

const NavList = () => {
  const { openModal } = useModalStore()
  const { userProfile } = useAuthStore()
  const navigate = useNavigate()

  const handleModalOpen = (modalId: ActiveModalFlag) => () => {
    openModal(modalId)
  }

  const handleHomeLinkClick = () => {
    navigate('/')
  }
  const handleMyPageLinkClick = () => {
    navigate('/my-page')
  }

  return (
    <ul className="w-full flex flex-col justify-center gap-2 text-sm">
      <NavItem iconId="home" onClick={handleHomeLinkClick}>
        <Link
          to="/"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          홈
        </Link>
      </NavItem>
      <NavItem iconId="search">
        <Link to="/">검색</Link>
      </NavItem>
      <NavItem iconId="explore">
        <Link to="/">탐색 홈</Link>
      </NavItem>
      <NavItem iconId="reels">
        <Link to="/">릴스</Link>
      </NavItem>
      <NavItem iconId="message">
        <Link to="/">메시지</Link>
      </NavItem>
      <NavItem iconId="notification">
        <Link to="/">알림</Link>
      </NavItem>
      <NavItem iconId="upload" onClick={handleModalOpen('select')}>
        <Link
          to="/"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          만들기
        </Link>
      </NavItem>
      {/*<NavItem iconId="profile" onClick={handleMyPageLinkClick}>*/}
      {/*  <Link*/}
      {/*    to="/my-page"*/}
      {/*    style={{ display: 'block', width: '100%', height: '100%' }}*/}
      {/*  >*/}
      {/*    나의 페이지*/}
      {/*  </Link>*/}
      {/*</NavItem>*/}

      <li className="flex items-center gap-3 p-2 rounded-lg hover:bg-slate-100 cursor-pointer transition-colors duration-300">
        <Link
          to="/my-page"
          style={{
            display: 'flex',
            width: '100%',
            height: '100%',
          }}
        >
          <img
            src={userProfile?.avatarUrl || ''}
            alt={userProfile?.name || ''}
            className="w-6 h-6 object-cover object-center rounded-full mr-3"
          />
          <span className="flex items-center font-semibold">나의 페이지</span>
        </Link>
      </li>
    </ul>
  )
}

export default NavList
