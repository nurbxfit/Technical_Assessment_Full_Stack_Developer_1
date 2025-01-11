import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Toast = {
  id: string;
  cooldown?: number;
  message: string;
  type: "info" | "error" | "warning" | "success";
};
const toastSlice = createSlice({
  name: "toast",
  initialState: [] as Toast[],
  reducers: {
    showToast(state, action: PayloadAction<Toast>) {
      const toastIndex = state.findIndex(
        (toast) => toast.id == action.payload.id
      );
      if (toastIndex == -1) {
        state.push(action.payload);
      } else {
        state[toastIndex] = action.payload;
      }
    },
    hideToast(state, action: PayloadAction<string>) {
      return state.filter((item) => item.id !== action.payload); // contain the id;
    },
  },
});

export type Modal = {
  isOpen: boolean;
  content?: React.ReactNode;
};

const modalSlice = createSlice({
  name: "modal",
  initialState: { isOpen: false, content: undefined } as Modal,
  reducers: {
    open(state, action: PayloadAction<React.ReactNode>) {
      state.isOpen = true;
      state.content = action.payload;
    },
    close(state) {
      state.isOpen = false;
      state.content = undefined;
    },
  },
});

export { toastSlice, modalSlice };
