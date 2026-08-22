import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/productSlice';
import userReducer from '../features/user/userSlice';
import cartReducer from'../features/cart/CartSlice';
import orderReducer from '../features/order/orderSlice';
import adminReducer from '../features/admin/adminSlice';
import chatReducer from '../features/chat/chatSlice';

export const store = configureStore({
  reducer: {
    product:productReducer, //all data defined in productSlice will be available to any component using use selector.
    user:userReducer,
    cart:cartReducer,
    order:orderReducer,
    admin:adminReducer,
    chat:chatReducer,
  },
})