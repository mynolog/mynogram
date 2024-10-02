import { createPortal } from 'react-dom'
import ModalContainer from './modalContainer/ModalContainer.tsx'

const Modal = () => {
  const modalRoot = document.getElementById('modal-root')!

  return createPortal(<ModalContainer />, modalRoot)
}

export default Modal
