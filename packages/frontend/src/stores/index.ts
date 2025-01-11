import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./items.slice";
import { ItemType } from "shared";
import { Toast, toastSlice } from "./components.slice";

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
    toasts: toastSlice.reducer,
  },
});

console.log("store:", store);

const storeController = {
  addItem(item: ItemType & { id: number }) {
    store.dispatch(itemsSlice.actions.addItem(item));
  },
  deleteItem(id: number) {
    store.dispatch(itemsSlice.actions.deleteItem(id));
  },
  updateItem(id: number, changes: ItemType) {
    store.dispatch(itemsSlice.actions.updateItem({ id, changes }));
  },
  showToast(toast: Partial<Toast>) {
    const toastId =
      toast.id ?? `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`; // generate random id string
    store.dispatch(
      toastSlice.actions.showToast({
        id: toastId,
        message: toast.message ?? "",
        type: toast.type ?? "info",
      })
    );
  },
  hideToast(id: string) {
    store.dispatch(toastSlice.actions.hideToast(id));
  },
};

export { store, storeController };
