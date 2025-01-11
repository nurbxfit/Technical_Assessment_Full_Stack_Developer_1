import { configureStore } from "@reduxjs/toolkit";
import itemsSlice from "./items.slice";
import { ItemType } from "shared";

const store = configureStore({
  reducer: {
    items: itemsSlice.reducer,
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
};

export { store, storeController };
