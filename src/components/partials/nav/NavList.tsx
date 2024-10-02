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
        <Link to="/">홈</Link>
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
        <button>만들기</button>
      </NavItem>
      <NavItem iconId="profile">
        <Link to="/">프로필</Link>
      </NavItem>
    </ul>
  )
}

export default NavList
