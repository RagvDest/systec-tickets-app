import {createSlice} from '@reduxjs/toolkit';

export const searchUsersSlice = createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        getUsuarios:(state, action)=>{
            state.users = action.payload;
            console.log(state.users);
        },
        addUsuario:(state,action)=>{
            state.users.push(action.payload);
        }
    }
});

export const {getUsuarios, addUsuario} = searchUsersSlice.actions;


export const selectUsers = (state) => state.searchUser.users;

export default searchUsersSlice.reducer;