import { useSelector } from "react-redux";
import { Toast as ToastType } from "../stores/components.slice";
import { storeController } from "../stores";

export default function Toast() {
  const toasts = useSelector((state: { toasts: ToastType[] }) => state.toasts);
  const handleClose = (id: string) => {
    storeController.hideToast(id);
  };

  if (!toasts.length) return null;

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col space-y-2">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex justify-between items-center p-4 rounded-lg shadow-lg text-white ${
            toast.type === "success"
              ? "bg-green-500"
              : toast.type === "warning"
              ? "bg-yellow-500"
              : toast.type === "error"
              ? "bg-red-500"
              : "bg-blue-500"
          }`}
        >
          <p>{toast.message}</p>
          <button
            className="ml-4 text-lg font-semibold text-white hover:text-gray-200"
            onClick={() => handleClose(toast.id)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
  );
}
