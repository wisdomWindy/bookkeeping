import { createSlice } from "@reduxjs/toolkit";

const personSlice = createSlice({
  name:'person',
  initialState:{
    persons:[]
  },
  reducers:{
    increamentPerson:(state,action)=>{
      return {
        persons: [...state.persons, action.payload]
      }
    }
  }
})
export const {increamentPerson} = personSlice.actions;
export default personSlice.reducer