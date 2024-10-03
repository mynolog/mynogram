import { type ChangeEvent, useRef, useState } from 'react'
import type { Post } from '../../../../types/post/PostTypes.ts'
import CommonButton from '../../../common/button/CommonButton.tsx'
import { GrErase, GrTrash } from 'react-icons/gr'
import { AiOutlineRollback } from 'react-icons/ai'
import { TbShare3 } from 'react-icons/tb'
import { formatCreatedAt } from '../../../../utils/formatCreatetAt.ts'
import useAuthStore from '../../../../store/authStore.ts'
import { firebaseStorageService } from '../../../../service/firebaseStorageService.ts'
import useToastStore from '../../../../store/toastStore.ts'
import useModalStore from '../../../../store/modalStore.ts'

type ViewPostModalProps = {
  selectedPost: Post
}

const ViewPostModal = ({ selectedPost }: ViewPostModalProps) => {
  const { uid } = useAuthStore()
  const {
    author,
    text,
    url,
    createdAt,
    uid: selectedUid,
    id,
    updatedAt,
  } = selectedPost
  const timestamp = formatCreatedAt(createdAt, 'ko-KR', 'Asia/Seoul')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const newTextAreaRef = useRef<HTMLTextAreaElement>(null)
  const [newText, setNewText] = useState(text)
  const [isPostEditMode, setIsPostEditMode] = useState<boolean>(false)
  const { addToast } = useToastStore()
  const { closeModal } = useModalStore()

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setNewText(e.target.value)
  }

  const handleSwitchToEditMode = () => {
    if (textAreaRef.current && newTextAreaRef.current) {
      setIsPostEditMode(true)
      textAreaRef.current.hidden = true
      newTextAreaRef.current.hidden = false
      newTextAreaRef.current.focus()
    }
  }

  const handleSwitchToViewMode = () => {
    if (textAreaRef.current && newTextAreaRef.current) {
      setIsPostEditMode(false)
      textAreaRef.current.hidden = false
      newTextAreaRef.current.hidden = true
    }
  }

  const handlePostUpdateClick = async () => {
    const result = await firebaseStorageService.updatePost(newText, id!)
    if (!result) {
      addToast('🚫 게시물 수정 실패: 다시 시도해주세요.', 'warning')
    }
    setNewText(text)
    closeModal()
    addToast('📝 게시물이 수정되었습니다.', 'update')
  }

  const handlePostDeleteClick = async () => {
    const result = await firebaseStorageService.deletePost(id!)
    if (!result) {
      addToast('🚫 게시물 삭제 실패: 다시 시도해주세요.', 'warning')
    }
    setNewText(text)
    closeModal()
    addToast('🗑 게시물이 삭제되었습니다.️', 'delete')
  }

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-between gap-2">
          <h2 className="flex-1 text-center font-bold mb-2">
            {author}님의 게시물
          </h2>
        </div>
        <div className="w-full h-96 flex gap-3">
          <div className="w-2/3">
            <img
              src={url}
              alt="미리보기"
              className="w-full h-full object-cover rounded-bl-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">{author}</p>

            <textarea
              className="resize-none h-3/4 p-2 mb-2 outline-none focus:shadow-xl rounded-lg"
              value={newText}
              onChange={handleTextChange}
              ref={newTextAreaRef}
              hidden
            ></textarea>

            <textarea
              className="resize-none h-3/4 p-2 mb-2 outline-none focus:shadow-xl rounded-lg"
              value={text}
              disabled
              ref={textAreaRef}
            ></textarea>

            <span className="text-gray-400 font-semibold text-xs flex gap-1">
              <span>{timestamp}</span>
              {updatedAt !== 0 && (
                <span className="text-gray-400 font-semibold text-xs">
                  (수정됨)
                </span>
              )}
            </span>

            {selectedUid === uid && (
              <div className="flex gap-3">
                {isPostEditMode ? (
                  <>
                    <CommonButton
                      fontSize="0.85rem"
                      width="90px"
                      onClick={handlePostUpdateClick}
                    >
                      <TbShare3 />
                      <span className="ml-2">공유</span>
                    </CommonButton>
                    <CommonButton
                      fontSize="0.85rem"
                      width="90px"
                      onClick={handleSwitchToViewMode}
                    >
                      <AiOutlineRollback />
                      <span className="ml-2">취소</span>
                    </CommonButton>
                  </>
                ) : (
                  <>
                    <CommonButton
                      fontSize="0.85rem"
                      width="90px"
                      onClick={handleSwitchToEditMode}
                    >
                      <GrErase />
                      <span className="ml-2">수정</span>
                    </CommonButton>
                    <CommonButton
                      fontSize="0.85rem"
                      width="90px"
                      onClick={handlePostDeleteClick}
                    >
                      <GrTrash />
                      <span className="ml-2">삭제</span>
                    </CommonButton>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPostModal
