import CommonHr from '../../../common/hr/CommonHr.tsx'
import CommonButton from '../../../common/button/CommonButton.tsx'
import { IoLockClosedOutline } from 'react-icons/io5'
import Logout from '../../../auth/Logout.tsx'
import useModalStore from '../../../../store/modalStore.ts'

const LogoutConfirmModal = () => {
  const { closeModal } = useModalStore()
  const handleModalClose = () => {
    closeModal()
  }
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <h2 className="font-bold">로그아웃 확인</h2>
        <CommonHr />
      </div>
      <div className="w-full flex flex-col justify-center items-center my-5 gap-5">
        <IoLockClosedOutline className="text-5xl" />
        <h3 className="font-semibold text-xl">정말로 로그아웃 하시겠습니까?</h3>
      </div>
      <div className="w-full flex justify-center items-center gap-6">
        <Logout width="100px" fontSize="0.85rem" />
        <CommonButton
          fontSize="0.85rem"
          width="100px"
          bgColor="gray"
          onClick={handleModalClose}
        >
          취소
        </CommonButton>
      </div>
    </div>
  )
}

export default LogoutConfirmModal
