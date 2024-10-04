import type { Post } from '../../../types/post/postTypes.ts'
import Divider from '../../common/divider/Divider.tsx'
import { BsGrid3X3 } from 'react-icons/bs'
import { FaHashtag } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'
import useAuthStore from '../../../store/authStore.ts'
import EmptyPostItem from './EmptyPostItem.tsx'
import useModalStore from '../../../store/modalStore.ts'
import usePostStore from '../../../store/postStore.ts'
import useAllPostsStore from '../../../store/allPostsStore.ts'

const UserPost = () => {
  const { storedPosts } = useAllPostsStore()
  const { uid } = useAuthStore()
  const { openModal } = useModalStore()
  const { setSelectedPost } = usePostStore()

  const handleModalOpen = (post: Post) => {
    setSelectedPost(post)
    openModal('view')
  }

  return (
    <div className="w-full px-14 py-4">
      <Divider />
      <div className="w-full h-16 flex items-center justify-center gap-20 text-sm">
        <div className="flex h-full justify-center items-center gap-2 border-t-2 border-slate-600 pb-1 px-2">
          <BsGrid3X3 />
          <span className="font-bold">게시물</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaRegStar />
          <span>저장됨</span>
        </div>
        <div className="flex justify-center items-center gap-2">
          <FaHashtag />
          <span>태그됨</span>
        </div>
      </div>
      <div className="w-full">
        <ul className="w-full grid grid-cols-3 gap-1 xxl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
          {storedPosts.filter((post) => post.uid === uid).length > 0 ? (
            storedPosts.map(
              (post) =>
                post.uid === uid && (
                  <li
                    key={post.id}
                    onClick={() => handleModalOpen(post)}
                    className="cursor-pointer"
                  >
                    <img
                      src={post.url}
                      alt={post.author}
                      className="w-80 h-80 object-cover"
                    />
                  </li>
                ),
            )
          ) : (
            <li className="col-span-3">
              <EmptyPostItem />
            </li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default UserPost
