import { create } from 'zustand'

export type Variant = 'success' | 'update' | 'delete' | 'warning'

export type Toast = {
  id: number
  message: string
  variant: Variant
}

type ToastState = {
  toasts: Toast[]
  addToast: (message: string, variant: Variant) => void
}

type ToastColor = {
  success: string
  update: string
  delete: string
  warning: string
}

export const toastColor: ToastColor = {
  success: '#28a745',
  update: '#007bff',
  delete: '#dc3545',
  warning: '#ffc107',
}

const useToastStore = create<ToastState>((set) => ({
  toasts: [],
  addToast: (message, variant) => {
    const id = Date.now()
    set((state) => ({
      toasts: [...state.toasts, { id, message, variant }],
    }))

    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((toast) => toast.id !== id),
      }))
    }, 5000)
  },
}))

export default useToastStore
