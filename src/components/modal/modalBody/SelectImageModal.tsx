import type { ChangeEvent, Dispatch, SetStateAction } from 'react'
import { useRef } from 'react'
import CommonHr from '../../common/hr/CommonHr.tsx'
import { CiImageOn } from 'react-icons/ci'
import CommonButton from '../../common/button/CommonButton.tsx'
import useModalStore from '../../../store/modalStore.ts'

type SelectImageModalProps = {
  setFile: Dispatch<SetStateAction<File | null>>
}

const SelectImageModal = ({ setFile }: SelectImageModalProps) => {
  const imageInputRef = useRef<HTMLInputElement>(null)
  const { openModal } = useModalStore()

  const handleSelectImageClick = () => {
    if (imageInputRef.current) {
      imageInputRef.current.click()
    }
  }

  const handleSelectImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const targetFile = e.currentTarget.files![0]
    setFile(targetFile)
    handleSwitchToCreateMode()
  }

  const handleSwitchToCreateMode = () => {
    openModal('create')
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center gap-2">
        <h2 className="font-bold">새 게시물 만들기</h2>
        <CommonHr />
      </div>
      <div className="w-full flex flex-col justify-center items-center gap-3">
        <CiImageOn className="text-9xl" />
        <p className="text-xl">사진을 선택해주세요.</p>
        <CommonButton fontSize="0.85rem" onClick={handleSelectImageClick}>
          컴퓨터에서 선택
        </CommonButton>
        <input
          type="file"
          accept="image/*"
          ref={imageInputRef}
          onChange={handleSelectImageChange}
          hidden
        />
      </div>
    </div>
  )
}

export default SelectImageModal
