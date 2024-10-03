import type { Post } from '../../../../types/post/PostTypes.ts'
import CommonButton from '../../../common/button/CommonButton.tsx'
import { GrErase, GrTrash } from 'react-icons/gr'
import { formatCreatedAt } from '../../../../utils/formatCreatetAt.ts'

type ViewPostModalProps = {
  selectedPost: Post
}

const ViewPostModal = ({ selectedPost }: ViewPostModalProps) => {
  const { author, text, url, createdAt } = selectedPost
  const timestamp = formatCreatedAt(createdAt, 'ko-KR', 'Asia/Seoul')

  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="w-full flex items-center justify-between gap-2">
          <h2 className="flex-1 text-center font-bold mb-2">{author} 게시물</h2>
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
              className="resize-none h-3/4 p-2 mb-2 outline-none focus:shadow-2xl"
              value={text}
              disabled
            ></textarea>
            <span className="text-gray-400 font-semibold text-xs">
              {timestamp}
            </span>
            <div className="flex gap-3">
              <CommonButton fontSize="0.85rem" width="90px">
                <GrErase />
                <span className="ml-2">수정</span>
              </CommonButton>
              <CommonButton fontSize="0.85rem" width="90px">
                <GrTrash />
                <span className="ml-2">삭제</span>
              </CommonButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ViewPostModal
