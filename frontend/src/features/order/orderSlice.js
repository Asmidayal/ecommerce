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
//get order details
export const getOrderDetails = createAsyncThunk('order/getOrderDetails', async(orderID, {rejectWithValue})=>{
    try{
    const {data} = await axios.get(`/api/v1/order/${orderID}`);
    return data;
    
}
     catch(error){
        return rejectWithValue(error.response?.data||"failed to fetch order");
    }
});
// charts fetching revenue by month
export const getRevenueByMonth = createAsyncThunk('order/getRevenueByMonth', async(_, {rejectWithValue})=>{
    try{
        const {data} = await axios.get('/api/v1/admin/revenue');
        return data;
    } catch(error){
        return rejectWithValue(error.response?.data||"failed to fetch revenue data");
    }
});
const orderSlice = createSlice({
    name:'order',
    initialState:{
        success:false,
        error:null,
        loading:false,
        orders:[],
        order:{},
        revenueLoading:false,
        
        revenueData:[],
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
        }),
        // get order details
            builder.addCase(getOrderDetails.pending,(state)=>{
            state.loading=true;
            state.error=null;
        })
        .addCase(getOrderDetails.fulfilled,(state,action)=>{
            state.loading=false;
            state.order=action.payload.order;
            state.success=action.payload.success;
        })
        .addCase(getOrderDetails.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload?.message||"Failed to fetch order";
        }),
        // get revenue by month
        builder.addCase(getRevenueByMonth.pending,(state)=>{
            state.revenueLoading=true;
            state.error=null;
        })
        .addCase(getRevenueByMonth.fulfilled,(state,action)=>{
            state.revenueLoading=false;
            state.revenueData=action.payload;
        })
        .addCase(getRevenueByMonth.rejected,(state,action)=>{
            state.revenueLoading=false;
            state.revenueError=action.payload?.message||"Failed to fetch revenue data";
        })
    ]
});
export const {removeErrors, removeSuccess} = orderSlice.actions;
export default orderSlice.reducer;