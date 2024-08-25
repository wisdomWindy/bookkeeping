import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios'

const slice = createSlice({
  name:'channel',
  initialState:{
    channelList:[]
  },
  reducers:{
    setChannelList:(state,action)=>{
      state.channelList = action.payload
    }
  }
})

export const {setChannelList} = slice.actions;
export default slice.reducer;

export const fetchChannelList = ()=>{
  return async (dispatch)=>{
    const res = await axios.get('/channels')
    dispatch(setChannelList(res.data.data.channels))
  }
}