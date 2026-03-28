import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios  from 'axios';

//add items to cart
export const addItemsToCart=createAsyncThunk('cart/addItemsToCart',async({id,quantity},{rejectWithValue})=>{
try {
  const{data}=await axios.get(`/api/v1/product/${id}`);
  console.log('add items to cart',data);
  return data;
} catch (error) {
     return rejectWithValue(error.response?.data||"An error occurred");
}

})
const cartSlice=createSlice({
    name:'cart',
    initialState:{
        cartItems:[],
        loading:false,
        error:null,
        success:false,
        message:null
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
        removeMessage:(state)=>{
            state.message=null;
        }
    },
    extraReducers:(builder)=>{
        // add items to cart
            builder.addCase(addItemsToCart.pending,(state)=>{
                      state.loading=true;
                           state.error=null;
                            })
                               builder.addCase(addItemsToCart.fulfilled,(state)=>{
                               const item=action.payload
                               console.log(item);
                            })
                               builder.addCase(addItemsToCart.rejected,(state)=>{
                               state.loading=false;
                               state.error=action.payload?.message||"An error occurred"
                            })
                        }

})
export const {removeErrors,removeMessage}= cartSlice.actions;
export default cartSlice.reducer;