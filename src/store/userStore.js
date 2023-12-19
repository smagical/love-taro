import {createSlice} from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState:{
        token:null
    },
    reducers:{
        setToken: (state,action)=>{
            state.token = action.payload
        }
    }

})

export default user.reducer;
export const {setToken} = user.actions

export const getUserToken = state=>state.user.token