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
        check:(state,action)=>{
            return {...state,user:1};
        }
    }
});
export const {login, logout,clearUser} = userSlice.actions;
export const selectUser = (state) => state.user.user;
export default userSlice.reducer;