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
//update product
export const updateProduct = createAsyncThunk('admin/updateProduct', async ({ id, formData }, { rejectWithValue }) => {
    try {
          const config = {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }
       
      const   { data } = await axios.put(`/api/v1/admin/product/${id}`, formData,config);
        
        return data;
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While updating the product");
    }
});
// delete product
export const deleteProduct = createAsyncThunk('admin/deleteProduct', async ({ productId}, { rejectWithValue }) => {
    try {
      
       
      const   { data } = await axios.delete(`/api/v1/admin/product/${productId}`);
        
        return {productId};
    } catch (error) {
        return rejectWithValue(error.response?.data || "Error While deleting the product");
    }
})
//Fetch All Users
export const fetchUsers=createAsyncThunk('admin/fetchUsers',async(_,
{rejectWithValue})=>{
    try{

        const {data}=await axios.get(`/api/v1/admin/users`)
        return data;
    }catch(error){
        return rejectWithValue(error.response?.data || "Fetching products Failed")
    }
})
 // Get single user
export const getSingleUser = createAsyncThunk(
  'admin/getSingleUser',
  async (id, { rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/admin/user/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch the user"
      )
    }
    })
  
const adminSlice = createSlice({
    name:'admin',
    initialState:{
        products:[],
        success:false,
        error:null,
        loading:false,
        product:{},
        deleteLoading:false,
        users:[],
        user:{}
       
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
    //update product
       builder
    .addCase(updateProduct.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })

   .addCase(updateProduct.fulfilled,(state,action)=>{
        state.loading=false;
        state.products = action.payload.products;
        state.success=action.payload.success;
    })
     .addCase(updateProduct.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Error While updating the product";
    })
    // delete product
     builder
    .addCase(deleteProduct.pending,(state)=>{
        state.deleteLoading=true;
        state.error=null;
    })

   .addCase(deleteProduct.fulfilled,(state,action)=>{
        state.deleteLoading=false;
        state.products = state.products.filter(
  (product) => product._id !== action.payload.productId
);
   })
     .addCase(deleteProduct.rejected,(state,action)=>{
        state.deleteLoading=false;
        state.error=action.payload?.message || "Error While deleting the product";
    })
    //fetch users
      builder
    .addCase(fetchUsers.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })

   .addCase(fetchUsers.fulfilled,(state,action)=>{
        state.loading=false;
        state.users= action.payload.users;
       
    })
     .addCase(fetchUsers.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to fetch users";
    })
 //fetch single user
      builder
    .addCase(getSingleUser.pending,(state)=>{
        state.loading=true;
        state.error=null;
    })

   .addCase(getSingleUser.fulfilled,(state,action)=>{
        state.loading=false;
        state.user= action.payload.user;
       
    })
     .addCase(getSingleUser.rejected,(state,action)=>{
        state.loading=false;
        state.error=action.payload?.message || "Failed to fetch the user";
    })

  

}

})
export const {removeErrors, removeSuccess} = adminSlice.actions;
export default adminSlice.reducer;