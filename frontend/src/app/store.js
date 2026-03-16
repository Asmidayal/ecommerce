import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/productSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
  reducer: {
    product:productReducer, //all data defined in productSlice will be available to any component using use selector.
    user:userReducer,
  },
})