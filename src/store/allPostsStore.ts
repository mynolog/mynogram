import { Post } from '../types/post/PostTypes.ts'
import { create } from 'zustand'

type AllPostsState = {
  storedPosts: Post[]
  setStoredPosts: (storedPosts: Post[]) => void
}

const useAllPostsStore = create<AllPostsState>((set) => ({
  storedPosts: [],
  setStoredPosts: (storedPosts: Post[]) =>
    set({
      storedPosts,
    }),
}))

export default useAllPostsStore
