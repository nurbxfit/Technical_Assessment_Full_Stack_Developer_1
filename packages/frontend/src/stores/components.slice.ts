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

// type Modal = {
//   isVisible: false;
//   modalType: null;
//   modalProps: PropsWithChildren;
// };

export { toastSlice };
