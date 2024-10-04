import type { Post } from '../../../types/post/PostTypes.ts'
import useAllPostsStore from '../../../store/allPostsStore.ts'
import useModalStore from '../../../store/modalStore.ts'
import usePostStore from '../../../store/postStore.ts'
import { FaGlasses } from 'react-icons/fa6'
import EmptyPostItem from './EmptyPostItem.tsx'

const AllPostsOverview = () => {
  const { storedPosts } = useAllPostsStore()
  const { openModal } = useModalStore()
  const { setSelectedPost } = usePostStore()

  const handleModalOpen = (post: Post) => {
    setSelectedPost(post)
    openModal('view')
  }

  return (
    <main className="max-w-fit flex mx-auto mt-20 pl-[120px]">
      <div className="w-full px-14 py-4">
        <div className="flex items-center justify-center mb-10 gap-4">
          <FaGlasses className="text-4xl" />
          <h2 className="text-4xl">둘러보기</h2>
        </div>
        <div className="w-full">
          {storedPosts.length > 0 ? (
            <ul className="w-full grid grid-cols-3 gap-1 xxl:grid-cols-3 lg:grid-cols-2 sm:grid-cols-1">
              {storedPosts.map((post) => (
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
              ))}
            </ul>
          ) : (
            <EmptyPostItem />
          )}
        </div>
      </div>
    </main>
  )
}

export default AllPostsOverview
