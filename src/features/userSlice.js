import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null,
        access_token:""
    },
    reducers:{
        login:(state, action)=>{
            debugger;
            return {...state,user:action.payload.user,access_token:action.payload.access_token};            
        },
        logout:(state) => {
            return {...state,user:null};
        },
        clearUser:(state)=>{
            return {...state,user:null,access_token:null};
        },
        logCli:(state,action)=>{
            debugger;
            return {...state,user:action.payload.user,access_token:action.payload.access_token}
        },
        updateCli:(state,action)=>{
            return {...state,user:action.payload.usuario};
        }

    }
});
export const {login, logout,clearUser,logCli} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.access_token;
export default userSlice.reducer;