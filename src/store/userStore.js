import {createSlice} from "@reduxjs/toolkit";

const user = createSlice({
    name:"user",
    initialState:{
        token:null,
        refreshToken:null
    },
    reducers:{
        setToken: (state,action)=>{
            state.token = action.payload
        },
        setRefreshToken: (state,action)=>{
            state.refreshToken = action.payload
        },
        login:(state,action)=>{
            state.token = action.payload.token
            state.refreshToken = action.payload.refreshToken
        },
        logout:(state,action)=>{
            state.token = null
            state.refreshToken = null
        },
    }

})

export default user.reducer;
export const {
    setToken,
    setRefreshToken,
    login,
    logout
}
    = user.actions

export const getUserToken = state=>state.user.token
export const getRefreshToken = state=>state.user.refreshToken