import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useEffect, useState } from 'react'
import CommonHr from '../../common/hr/CommonHr.tsx'
import { useAuthStore } from '../../../store/authStore.ts'
import CommonButton from '../../common/button/CommonButton.tsx'
import { TbShare3 } from 'react-icons/tb'
import modalStore from '../../../store/modalStore.ts'
import { IoIosArrowBack } from 'react-icons/io'
import { firebaseStorageService } from '../../../service/firebaseStorageService.ts'
import useToastStore from '../../../store/toastStore.ts'

type CreatePostModalProps = {
  file: File | null
  setFile: Dispatch<SetStateAction<File | null>>
}

const CreatePostModal = ({ file, setFile }: CreatePostModalProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [text, setText] = useState('')
  const { userProfile, uid } = useAuthStore()
  const { openModal, closeModal } = modalStore()
  const { addToast } = useToastStore()

  useEffect(() => {
    const getBlobUrlFromFileObject = () => {
      if (file) {
        const blob = URL.createObjectURL(file)
        setBlobUrl(blob)
      }
    }
    getBlobUrlFromFileObject()
  }, [file])

  const handleSwitchToSelectMode = () => {
    setBlobUrl(null)
    setFile(null)
    setText('')
    openModal('select')
  }

  const handlePostShareClick = async () => {
    // TODO: 조건 분리하여 각각 분기 처리
    if (file && uid && userProfile) {
      const newPost = {
        uid,
        text,
        author: userProfile.id,
      }
      const result = await firebaseStorageService.uploadFile(file, newPost)
      if (!result) {
        addToast('🚫 이미지 업로드 실패: 다시 시도해주세요.', 'warning')
      }
      setFile(null)
      setBlobUrl(null)
      setText('')
      addToast('✅ 이미지 업로드 완료', 'success')
      closeModal()
    }
  }

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value)
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-between gap-2">
          <CommonButton
            fontSize="1rem"
            width="40px"
            padding="4px 2px"
            bgColor="#ffff"
            onClick={handleSwitchToSelectMode}
          >
            <IoIosArrowBack className="text-black text-2xl mb-1" />
          </CommonButton>
          <h2 className="flex-1 text-center font-bold mb-2">
            새 게시물 만들기
          </h2>
        </div>
        <CommonHr />
        <div className="w-full h-96 flex gap-3">
          <div className="w-2/3">
            {blobUrl && (
              <img
                src={blobUrl}
                alt="미리보기"
                className="w-full h-full object-cover rounded-bl-lg"
              />
            )}
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">{userProfile?.id}</p>
            <textarea
              className="resize-none h-3/4 p-2 mb-2 outline-none focus:shadow-2xl"
              placeholder="생각을 적어보세요.."
              value={text}
              onChange={handleTextChange}
            ></textarea>
            <CommonButton fontSize="1rem" onClick={handlePostShareClick}>
              <TbShare3 />
              <span className="ml-2">공유하기</span>
            </CommonButton>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreatePostModal
