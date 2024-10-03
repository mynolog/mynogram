import type { ActiveModalFlag } from '../../../store/modalStore.ts'
import NavItem from './NavItem.tsx'
import { Link } from 'react-router-dom'
import useModalStore from '../../../store/modalStore.ts'

const NavList = () => {
  const { openModal } = useModalStore()

  const handleModalOpen = (modalId: ActiveModalFlag) => () => {
    openModal(modalId)
  }

  return (
    <ul className="w-full flex flex-col gap-2">
      <NavItem iconId="home">
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
      <NavItem iconId="profile">
        <Link
          to="/my-page"
          style={{ display: 'block', width: '100%', height: '100%' }}
        >
          나의 페이지
        </Link>
      </NavItem>
    </ul>
  )
}

export default NavList
