import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ItemType } from "shared";

type Item = ItemType & {
  id: number;
};

const itemsSlice = createSlice({
  name: "items",
  initialState: [] as Item[],
  reducers: {
    addItem(state, action: PayloadAction<Item>) {
      const itemIndex = state.findIndex((item) => item.id == action.payload.id);
      if (itemIndex == -1) {
        state.push(action.payload);
      } else {
        state[itemIndex] = action.payload;
      }
    },
    deleteItem(state, action: PayloadAction<number>) {
      return state.filter((item) => item.id !== action.payload);
    },
    updateItem(
      state,
      action: PayloadAction<{ id: number; changes: ItemType }>
    ) {
      const itemIndex = state.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex !== -1) {
        state[itemIndex] = { ...state[itemIndex], ...action.payload.changes };
      }
    },
  },
});

console.log(itemsSlice.actions);
export default itemsSlice;
