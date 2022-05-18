import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
    name:"user",
    initialState:{
        user:null
    },
    reducers:{
        login:(state, action)=>{
            return {...state,user:action.payload};            
        },
        logout:(state) => {
            return {...state,user:null};
        },
        clearUser:(state)=>{
            state.user=null;
        },
        logCli:(state,action)=>{
            debugger;
            return {...state,user:action.payload.user}
        },

    }
});
export const {login, logout,clearUser,logCli} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;