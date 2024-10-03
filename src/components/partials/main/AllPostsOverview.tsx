import type { Post } from '../../../types/post/PostTypes.ts'
import useAllPostsStore from '../../../store/allPostsStore.ts'
import useModalStore from '../../../store/modalStore.ts'
import usePostStore from '../../../store/postStore.ts'

const AllPostsOverview = () => {
  const { storedPosts } = useAllPostsStore()
  const { openModal } = useModalStore()
  const { setSelectedPost } = usePostStore()

  const handleModalOpen = (post: Post) => {
    setSelectedPost(post)
    openModal('view')
  }

  return (
    <main className="w-3/4 ml-72 mr-52 my-12">
      <div className="w-full px-14 py-4">
        <div className="w-full">
          <ul className="w-full grid grid-cols-3 gap-1">
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
        </div>
      </div>
    </main>
  )
}

export default AllPostsOverview
