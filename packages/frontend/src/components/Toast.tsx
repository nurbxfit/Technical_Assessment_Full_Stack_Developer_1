import { useSelector } from "react-redux";
import "./Toast.css";
import { Toast as ToastType } from "../stores/components.slice";
import { storeController } from "../stores";

export default function Toast() {
  const toasts = useSelector((state: { toasts: ToastType[] }) => state.toasts);
  const handleClose = (id: string) => {
    storeController.hideToast(id);
  };

  if (!toasts.length) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type || "info"}`}>
          <p>{toast.message}</p>
          <button onClick={() => handleClose(toast.id)}>X</button>
        </div>
      ))}
    </div>
  );
}
