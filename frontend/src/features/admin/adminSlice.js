import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';


// fetch all products


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
}
})
export const {removeErrors, removeSuccess} = adminSlice.actions;
export default adminSlice.reducer;