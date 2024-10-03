import { Link } from 'react-router-dom'
import NavList from './NavList.tsx'
import Logo from '../../common/logo/Logo.tsx'
import CommonButton from '../../common/button/CommonButton.tsx'
import { IoMdLogOut } from 'react-icons/io'
import useModalStore, {
  type ActiveModalFlag,
} from '../../../store/modalStore.ts'

const Nav = () => {
  const { openModal } = useModalStore()
  const handleOpenModal = (modalId: ActiveModalFlag) => () => {
    openModal(modalId)
  }

  return (
    <nav className="fixed flex flex-col w-1/6 h-full border-r-2 border-gray-200 px-2">
      <div className="w-full h-24">
        <Link to="/">
          <Logo width="w-full" height="h-full" />
        </Link>
      </div>
      <NavList />
      <div className="absolute bottom-3 left-3 w-full">
        <CommonButton
          width="90%"
          fontSize="0.95rem"
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
