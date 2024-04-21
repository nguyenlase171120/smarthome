import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { StaffItemTypes } from "../types";

export const staffSlice = createSlice({
  name: "staffs",
  initialState: {
    account: {
      accountId: "",
      phoneNumber: "",
      roleName: "",
      fullName: "",
      email: "",
      avatar: null,
      isLead: true,
      status: "",
      createAt: "",
    },
  },
  reducers: {
    selectChatWithStaff: (state, action: PayloadAction<StaffItemTypes>) => {
      state.account = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { selectChatWithStaff } = staffSlice.actions;

export default staffSlice.reducer;
