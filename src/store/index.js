import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './modules/counter'
import personReducer from './modules/person'
import channelReducer from './modules/channel'

export default configureStore({
  reducer:{
    counter:counterReducer,
    person:personReducer,
    channel:channelReducer
  }
})