import { PropsWithChildren } from "react";
import { storeController } from "../stores";
import { useSelector } from "react-redux";
import { Modal as ModalType } from "../stores/components.slice";

export default function Modal({ children }: PropsWithChildren) {
  const modal = useSelector((state: { modal: ModalType }) => state.modal);
  function onClose() {
    storeController.closeModal();
  }
  if (!modal.isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative bg-white rounded-lg shadow-lg max-w-lg w-full">
        <button
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 bg-gray-200 hover:bg-gray-300 rounded-full w-8 h-8 flex items-center justify-center shadow-md transition-transform transform hover:scale-105"
          onClick={onClose}
          aria-label="Close modal"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div>{children}</div>
      </div>
    </div>
  );
}
