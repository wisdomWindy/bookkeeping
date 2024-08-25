import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'
const billStore = createSlice({
  name:'billStore',
  initialState:{
    billList:[]
  },
  reducers:{
    setBillList:(state,action)=>{
      state.billList = action.payload
    }
  }
})
export const { setBillList } = billStore.actions;
export default billStore.reducer;

export function fetchBillList(){
  return async (dispatch)=>{
    const res = await axios.get('/bills/billList')
    dispatch(setBillList(res.data))
  }
}