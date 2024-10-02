import type { Post } from '../../../types/post/PostTypes.ts'
import { useState, useEffect } from 'react'
import CommonHr from '../../common/hr/CommonHr.tsx'
import { firebaseStorageService } from '../../../service/firebaseStorageService.ts'
import { BsGrid3X3 } from 'react-icons/bs'
import { FaHashtag } from 'react-icons/fa6'
import { FaRegStar } from 'react-icons/fa'
import { useAuthStore } from '../../../store/authStore.ts'

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
    <div className="w-full px-14 py-10">
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
        <ul className="w-full flex gap-1">
          {storedPosts.length > 0
            ? storedPosts.map(
                (post, index) =>
                  post.uid === uid && (
                    <li key={post.author + index}>
                      <img
                        src={post.url}
                        alt={post.author}
                        className="w-64 h-64 object-cover"
                      />
                    </li>
                  ),
              )
            : null}
        </ul>
      </div>
    </div>
  )
}

export default MainUserPost
