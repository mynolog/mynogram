import { Post } from '../types/post/postTypes.ts'
import { create } from 'zustand'

type AllPostsState = {
  storedPosts: Post[]
  setStoredPosts: (storedPosts: Post[]) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
}

const useAllPostsStore = create<AllPostsState>((set) => ({
  storedPosts: [],
  setStoredPosts: (storedPosts: Post[]) =>
    set({
      storedPosts,
    }),
  isLoading: true,
  setIsLoading: (isLoading: boolean) =>
    set({
      isLoading,
    }),
}))

export default useAllPostsStore
