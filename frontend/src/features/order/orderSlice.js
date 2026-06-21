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
// get user orders
export const getAllOrders = createAsyncThunk('order/getAllOrders', async(_, {rejectWithValue})=>{
    try{
    const {data} = await axios.get('/api/v1/orders/user');
    return data;
}
     catch(error){
        return rejectWithValue(error.response?.data||"failed to fetch order");
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
        }),
        // get user orders
         builder.addCase(getAllOrders.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getAllOrders.fulfilled,(state,action)=>{
            state.loading=false;
            state.orders=action.payload.orders;
            state.success=action.payload.success;
        })
        .addCase(getAllOrders.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message||"Failed to fetch order";
        })
    ]
});
export const {removeErrors, removeSuccess} = orderSlice.actions;
export default orderSlice.reducer;