import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    increament: (state, action) => {
      state.count += action.payload
    }
  }
});

export const { increament } = counterSlice.actions;
export default counterSlice.reducer