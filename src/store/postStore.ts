import type { Post } from '../types/post/PostTypes.ts'
import { create } from 'zustand'

type PostState = {
  selectedPost: Post | null
  setSelectedPost: (selectedPost: Post) => void
}

const usePostStore = create<PostState>((set) => ({
  selectedPost: null,
  setSelectedPost: (selectedPost: Post | null) =>
    set({
      selectedPost,
    }),
}))

export default usePostStore
