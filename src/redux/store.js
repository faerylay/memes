import { configureStore } from '@reduxjs/toolkit';
import memesReducer from '../features/memesEditor/memesSlice'

export default configureStore({
  reducer: {
    memes: memesReducer,
  }
})
