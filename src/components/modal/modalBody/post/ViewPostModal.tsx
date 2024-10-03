import { type ChangeEvent, useRef, useState } from 'react'
import type { Post } from '../../../../types/post/PostTypes.ts'
import CommonButton from '../../../common/button/CommonButton.tsx'
import { GrErase, GrTrash } from 'react-icons/gr'
import { AiOutlineRollback } from 'react-icons/ai'
import { TbShare3 } from 'react-icons/tb'
import { formatCreatedAt } from '../../../../utils/formatCreatetAt.ts'
import useAuthStore from '../../../../store/authStore.ts'

type ViewPostModalProps = {
  selectedPost: Post
}

const ViewPostModal = ({ selectedPost }: ViewPostModalProps) => {
  const { uid } = useAuthStore()
  const { author, text, url, createdAt, uid: selectedUid } = selectedPost
  const timestamp = formatCreatedAt(createdAt, 'ko-KR', 'Asia/Seoul')
  const textAreaRef = useRef<HTMLTextAreaElement>(null)
  const newTextAreaRef = useRef<HTMLTextAreaElement>(null)
  const [newText, setNewText] = useState(text)
  const [isPostEditMode, setIsPostEditMode] = useState<boolean>(false)

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

            <span className="text-gray-400 font-semibold text-xs">
              {timestamp}
            </span>

            {selectedUid === uid && (
              <div className="flex gap-3">
                {isPostEditMode ? (
                  <>
                    <CommonButton
                      fontSize="0.85rem"
                      width="90px"
                      onClick={handleSwitchToEditMode}
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
                    <CommonButton fontSize="0.85rem" width="90px">
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
