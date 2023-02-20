import React, { useContext, useState, useRef } from 'react'

interface ToastItem {
  id: number
  text: string
  duration: number
}

interface ToastOptions {
  duration: number
}

interface ToastContextValue {
  toasts: ToastItem[]
  toast: (text: string, opts?: ToastOptions) => void
  dismiss: (id: number) => void
}

// React context
const ToastContext = React.createContext<ToastContextValue>(null)

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const idRef = useRef<number>(0)

  const toast = async (text: string, opts?: ToastOptions) => {
    const item: ToastItem = {
      id: idRef.current++,
      text,
      duration: opts?.duration ?? 5000,
    }

    setToasts((toasts) => [...toasts, item])
  }

  const dismiss = (id: number) => {
    setToasts((toasts) => {
      return toasts.filter((toast) => toast.id !== id)
    })
  }

  return <ToastContext.Provider value={{ toast, dismiss, toasts }}>{children}</ToastContext.Provider>
}

const useToast = () => {
  const context = useContext(ToastContext)

  if (context == undefined) {
    throw new Error('`useToast` must be used within a `ToastProvider`')
  }

  return context
}

export { ToastProvider, useToast }
