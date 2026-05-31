import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


//creating order
export const createOrder = createAsyncThunk('order/createOrder', async(order,{rejectWithValue})=>{
    try{
      const config = {
        headers:{
            'Content-Type':'application/json',
    }
}
    const {data} = await axios.post('/api/v1/new/order', order, config);
    console.log('Order created:', data);
    return data;
    }
    catch(error){
        return rejectWithValue(error.response?.data||"An error occurred");
    }
})
const orderSlice = createSlice({
    name:'order',
    initialState:{
        success:false,
        error:null,
        loading:false,
        orders:[],
        order:{},
    },
    reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
    
    removeSuccess:(state)=>{
        state.success=null;
    },
    },
        extraReducers:(builder)=>[
        builder.addCase(createOrder.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(createOrder.fulfilled,(state,action)=>{
            state.loading=false;
            state.success=action.payload.success;
            state.order=action.payload;
        })
        .addCase(createOrder.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message||"Failed to create order";
        })
    ]
});
export const {removeErrors, removeSuccess} = orderSlice.actions;
export default orderSlice.reducer;