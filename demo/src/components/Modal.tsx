import { XMarkIcon } from '@heroicons/react/24/solid'
import { useEffect, useRef } from 'react'

export interface ModalProps {
  children?: React.ReactNode,
  close: () => void,
}

export const Modal = ({ children, close }: ModalProps) => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const escClosesModal = (e: KeyboardEvent) => {
      if (e.key == 'Escape') close();
    }
    window.addEventListener('keydown', escClosesModal);
    return () => {
      window.removeEventListener('keydown', escClosesModal);
    }
  }, [])

  const handleClose = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === bgRef.current) close();
  }

  return (
    <div
      ref={bgRef}
      onClick={handleClose}
      className="modal-wrapper fixed h-full w-full z-99 flex items-center justify-center"
    >
      <div className="relative rounded-md min-h-1/3 min-w-1/2 bg-black border-2 border-primary text-primary text-center">
        <XMarkIcon className="absolute cursor-pointer right-2 top-2 text-primary" height={16} onClick={close} />
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  )
}
