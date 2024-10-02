import { useEffect, useState } from 'react'
import CommonHr from '../../common/hr/CommonHr.tsx'
import { useAuthStore } from '../../../store/authStore.ts'
import CommonButton from '../../common/button/CommonButton.tsx'
import { TbShare3 } from 'react-icons/tb'

type CreatePostModalProps = {
  file: File | null
}

const CreatePostModal = ({ file }: CreatePostModalProps) => {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const { userProfile } = useAuthStore()

  useEffect(() => {
    const getBlobUrlFromFileObject = () => {
      if (file) {
        const blob = URL.createObjectURL(file)
        setBlobUrl(blob)
      }
    }
    getBlobUrlFromFileObject()
  }, [file])

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-between">
          <h2 className="flex-1 text-center">새 게시물 만들기</h2>
          <div className="ml-auto"></div>
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
            ></textarea>
            <CommonButton fontSize="1rem">
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
