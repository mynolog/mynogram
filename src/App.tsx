import AppRouter from './routes/routes.tsx'
import Toast from './components/toast/Toast.tsx'
import { useTitle as Title } from './hooks/useTitle'
import useToastStore from './store/toastStore.ts'
import useModalStore from './store/modalStore.ts'
import Modal from './components/modal/Modal.tsx'
import SelectImageModal from './components/modal/modalBody/SelectImageModal.tsx'
import ModalContainer from './components/modal/modalContainer/ModalContainer.tsx'

function App() {
  const { toasts } = useToastStore()

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

      {/*<Modal>*/}
      {/*  <SelectImageModal />*/}
      {/*</Modal>*/}
      <Modal>
        <ModalContainer />
      </Modal>
    </>
  )
}

export default App
