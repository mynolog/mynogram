import type { Post } from '../../../types/post/PostTypes.ts'
import { useEffect, useState } from 'react'
import CommonHr from '../../common/hr/CommonHr.tsx'
import { firebaseStorageService } from '../../../service/firebaseStorageService.ts'
import { BsGrid3X3 } from 'react-icons/bs'
import { FaHashtag } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'
import { useAuthStore } from '../../../store/authStore.ts'
import EmptyPostItem from './EmptyPostItem.tsx'

const MainUserPost = () => {
  const [storedPosts, setStoredPosts] = useState<Post[]>([])
  const { uid } = useAuthStore()

  useEffect(() => {
    const fetchPost = async () => {
      return await firebaseStorageService.findPosts(setStoredPosts)
    }
    const unsubscribe = fetchPost()
    return () => {
      unsubscribe.then((unsub) => {
        if (unsub) unsub()
      })
    }
  }, [])

  return (
    <div className="w-full px-14 py-4">
      <CommonHr />
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
        {storedPosts.length > 0 ? (
          <ul className="w-full grid grid-cols-3 gap-1">
            {storedPosts.filter((post) => post.uid === uid).length > 0 ? (
              storedPosts.map(
                (post) =>
                  post.uid === uid && (
                    <li key={post.id}>
                      <img
                        src={post.url}
                        alt={post.author}
                        className="w-80 h-80 object-cover"
                      />
                    </li>
                  ),
              )
            ) : (
              <EmptyPostItem />
            )}
          </ul>
        ) : (
          <EmptyPostItem />
        )}
      </div>
    </div>
  )
}

export default MainUserPost
