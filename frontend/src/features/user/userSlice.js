import {createSlice,createAsyncThunk} from '@reduxjs/toolkit';
import axios  from 'axios';

// register API
export const register=createAsyncThunk('user/register',async(userData,{rejectWithValue})=>{
try {
    const config={
        headers:{
            'Content-type':'multipart/form-data'
        }
    }
    const{data}= await axios.post('/api/v1/register',userData,config)
    console.log('Registration data',data);
    return data;
} catch (error) {
     return rejectWithValue(error.response?.data||"An error occurred");
}

})
export const login=createAsyncThunk('user/login',async({email,password},{rejectWithValue})=>{
  try {
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    const{data}= await axios.post('/api/v1/login',{email,password},config)
    console.log('Login data',data);
    return data;
} catch (error) {
     return rejectWithValue(error.response?.data||"An error occurred,Login failed");
}  

})
export const loadUser=createAsyncThunk('user/loadUser',async(_,{rejectWithValue})=>{
 try{
const {data}=await axios.get('/api/v1/profile');
return data;
 }
  catch (error) {
     return rejectWithValue(error.response?.data||"An error occurred,Load user failed");
}  
})
export const logout=createAsyncThunk('user/logout',async(_,{rejectWithValue})=>{
 try{
const {data}=await axios.post('/api/v1/logout',{withCredentials:true});
return data;
 }
  catch (error) {
     return rejectWithValue(error.response?.data||"logout failed");
}  
})
export const updateProfile=createAsyncThunk('user/updateProfile',async(userData,{rejectWithValue})=>{
 try{
     const config={
        headers:{
            'Content-type':'multipart/form-data'
        }
    }
const {data}=await axios.put('/api/v1/profile/update',userData,config);
return data;
 }
  catch (error) {
     return rejectWithValue(error.response?.data||{message:'profile update failed'});
}  
})

const userSlice= createSlice({
    name:'user',
    initialState:{
    user:null,
    loading:false,
    error:null,
    success:false,
    isAuthenticated:false,
},
 reducers:{
        removeErrors:(state)=>{
            state.error=null;
        },
    
    removeSuccess:(state)=>{
        state.success=null;
    },
},
     // registration cases
    extraReducers:(builder)=>{
        builder.addCase(register.pending,(state)=>{
                  state.loading=true;
                       state.error=null;
                        })
        .addCase(register.fulfilled,(state,action)=>{
            state.loading=false;
                       state.error=null;
                       state.success=action.payload.success;
                       state.user=action.payload?.user || null;
                       state.isAuthenticated=Boolean(action.payload?.user)
     } )
      .addCase(register.rejected,(state,action)=>{
         state.loading=false;
                       state.error=action.payload?.message||"An error occurred"
                       state.user=null;
                       state.isAuthenticated=false
      })
      //login cases
        builder.addCase(login.pending,(state)=>{
                  state.loading=true;
                       state.error=null;
                        })
        .addCase(login.fulfilled,(state,action)=>{
            state.loading=false;
                       state.error=null;
                       state.success=action.payload.success;
                       state.user=action.payload?.user || null;
                       state.isAuthenticated=Boolean(action.payload?.user)
     } )
      .addCase(login.rejected,(state,action)=>{
         state.loading=false;
                       state.error=action.payload?.message||"An error occurred,Login failed"
                       state.user=null;
                       state.isAuthenticated=false
      })  
        //loading user
       builder.addCase(loadUser.pending,(state)=>{
                  state.loading=true;
                       state.error=null;
                        })
        .addCase(loadUser.fulfilled,(state,action)=>{
            state.loading=false;
                       state.error=null;
                       //state.success=action.payload.success;
                       state.user=action.payload?.user || null;
                       state.isAuthenticated=Boolean(action.payload?.user)
     } )
      .addCase(loadUser.rejected,(state,action)=>{
         state.loading=false;
                       state.error=action.payload?.message||"An error occurred,Load user failed"
                       state.user=null;
                       state.isAuthenticated=false
      })  
     //logut cases     
 builder.addCase(logout.pending,(state)=>{
                  state.loading=true;
                       state.error=null;
                        })
        .addCase(logout.fulfilled,(state,action)=>{
            state.loading=false;
                       state.error=null;
                       //state.success=action.payload.success;
                       state.user= null;
                       state.isAuthenticated=false
     } )
      .addCase(logout.rejected,(state,action)=>{
         state.loading=false;
                       state.error=action.payload?.message||"logout failed"
                       state.user=null;
                       state.isAuthenticated=false
      })  
       
          
    }

})
export const {removeErrors,removeSuccess}= userSlice.actions;
export default userSlice.reducer;