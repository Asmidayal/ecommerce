import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


// fetch all products
// Fetch ALL Products
export const fetchAdminProducts = createAsyncThunk('admin/fetchAdminProducts', async (_, { rejectWithValue }) => {
    try {
       
      const   { data } = await axios.get('/api/v1/admin/products');
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While Fetching the products");
    }
});
// create product
export const createProducts = createAsyncThunk('admin/createProducts', async (productData, { rejectWithValue }) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
       
      const   { data } = await axios.post('/api/v1/admin/product/create', productData,config);
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While Creating the product");
    }
});
const adminSlice = createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        error:null,
        loading:false,
       
},
reducers:{
   
       removeErrors:(state)=>{
            state.error=null;
        },
    
    removeSuccess:(state)=>{
        state.success=false;
    },
},
extraReducers:(builder)=>{
    builder
    .addCase(fetchAdminProducts.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
   .addCase(fetchAdminProducts.fulfilled,(state,action)=>{
        state.loading=false;
        state.products=action.payload.products;
    })
     .addCase(fetchAdminProducts.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Error While Fetching the products";
    })
    // create product
     builder
    .addCase(createProducts.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })
   .addCase(createProducts.fulfilled,(state,action)=>{
        state.loading=false;
        state.products.push(action.payload.product);
        state.success=action.payload.success;
    })
     .addCase(createProducts.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Error While Creating the product";
    })
}
})
export const {removeErrors, removeSuccess} = adminSlice.actions;
export default adminSlice.reducer;