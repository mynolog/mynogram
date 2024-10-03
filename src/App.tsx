import AppRouter from './routes/routes.tsx'
import Toast from './components/toast/Toast.tsx'
import { useTitle as Title } from './hooks/useTitle'
import useToastStore from './store/toastStore.ts'
import Modal from './components/modal/Modal.tsx'
import { useEffect } from 'react'
import { firebaseStorageService } from './service/firebaseStorageService.ts'
import useAllPostsStore from './store/allPostsStore.ts'

function App() {
  const { toasts } = useToastStore()
  const { setStoredPosts } = useAllPostsStore()

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
    <>
      <AppRouter />
      <Title />

      <div className="fixed top-5 right-5">
        {toasts.map(({ id, message, variant }, index) => (
          <Toast
            key={id}
            message={message}
            variant={variant}
            style={{ marginTop: `${index * 60}px` }}
          />
        ))}
      </div>

      <Modal />
    </>
  )
}

export default App
