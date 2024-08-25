import { configureStore } from '@reduxjs/toolkit'
import billReducer from './modules/billStore'

export default configureStore({
  reducer: {
    billStore: billReducer,
  },
});