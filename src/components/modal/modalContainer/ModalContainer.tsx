import { useState } from 'react'
import useModalStore from '../../../store/modalStore.ts'
import SelectImageModal from '../modalBody/post/SelectImageModal.tsx'
import CreatePostModal from '../modalBody/post/CreatePostModal.tsx'
import EditPostModal from '../modalBody/post/EditPostModal.tsx'
import DeletePostModal from '../modalBody/post/DeletePostModal.tsx'
import CommonButton from '../../common/button/CommonButton.tsx'
import { IoClose } from 'react-icons/io5'
import LogoutConfirmModal from '../modalBody/auth/LogoutConfirmModal.tsx'
import ViewPostModal from '../modalBody/post/ViewPostModal.tsx'
import usePostStore from '../../../store/postStore.ts'

const ModalContainer = () => {
  const [file, setFile] = useState<File | null>(null)
  const { activeModal, closeModal } = useModalStore()
  const { selectedPost } = usePostStore()

  if (!activeModal) {
    return null
  }

  const renderModal = () => {
    switch (activeModal) {
      case 'select':
        return <SelectImageModal setFile={setFile} />
      case 'create':
        return <CreatePostModal file={file} setFile={setFile} />
      case 'edit':
        return <EditPostModal />
      case 'delete':
        return <DeletePostModal />
      case 'view':
        if (!selectedPost) {
          console.error('게시물이 존재하지 않음: 관리자에게 문의 필요')
          return null
        }
        return <ViewPostModal selectedPost={selectedPost} />
      case 'logout':
        return <LogoutConfirmModal />
      default:
        console.error('정의되지 않은 모달 타입: 관리자에게 문의 필요')
        return null
    }
  }

  const handleModalClose = () => {
    closeModal()
  }

  return (
    <div
      className={`flex items-center justify-center fixed top-0 h-full right-0 left-0 z-50 bg-gray-800 bg-opacity-40 rounded-lg`}
    >
      <div className="relative w-full h-full flex justify-center items-center">
        <div
          className={`bg-white rounded-xl shadow-md p-3 max-w-[670px] w-full flex flex-col justify-center`}
        >
          {renderModal()}
        </div>
        <div className="absolute top-3 right-3">
          <CommonButton bgColor="#3d3d3d" onClick={handleModalClose}>
            <IoClose className="text-2xl" />
          </CommonButton>
        </div>
      </div>
    </div>
  )
}

export default ModalContainer
