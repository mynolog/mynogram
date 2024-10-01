import AppRouter from './routes/routes.tsx'
import Toast from './components/toast/Toast.tsx'
import useToastStore from './store/toastStore.ts'

function App() {
  const { toasts } = useToastStore()

  return (
    <>
      <AppRouter />
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
    </>
  )
}

export default App
