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
    },
  }
})
export const { setBillList } = billStore.actions;
export default billStore.reducer;

export function fetchBillList(){
  return async (dispatch)=>{
    const res = await axios.get('http://localhost:5000/bills/billList')
    dispatch(setBillList(res.data))
  }
}

export function addPayBill(){
  return async ()=>{
     await axios.post("http://localhost:5000/bills/addBill");
  }
}