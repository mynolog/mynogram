import { Link } from 'react-router-dom'
import NavList from './NavList.tsx'
import Logo from '../../common/logo/Logo.tsx'
import CommonButton from '../../common/button/CommonButton.tsx'
import { IoMdLogOut } from 'react-icons/io'
import useModalStore, {
  type ActiveModalFlag,
} from '../../../store/modalStore.ts'
import { CSSProperties } from 'react'

type NavProps = {
  style?: CSSProperties
}

const Nav = ({ style = {} }: NavProps) => {
  const { openModal } = useModalStore()
  const handleOpenModal = (modalId: ActiveModalFlag) => () => {
    openModal(modalId)
  }

  return (
    <nav
      className="fixed flex flex-col w-fit h-full border-r-2 border-gray-200 px-2"
      style={{ ...style }}
    >
      <div className="w-full h-24 px-2">
        <Link to="/">
          <Logo width="w-full" height="h-full" fontSize="1.25rem" />
        </Link>
      </div>
      <NavList />
      <div className="absolute bottom-3 left-3 w-full">
        <CommonButton
          width="70%"
          fontSize="0.82rem"
          gap="0.5rem"
          onClick={handleOpenModal('logout')}
        >
          <IoMdLogOut />
          <span>로그아웃</span>
        </CommonButton>
      </div>
    </nav>
  )
}

export default Nav
