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
        },
        updateUsuario:(state,action)=>{
            debugger;
            console.log('Usuario_id: '+action.payload.usuario._id +'- Actualizado');
        }
    }
});
export const {getUsuarios, addUsuario, updateUsuario} = searchUsersSlice.actions;
export const selectUsers = (state) => state.searchUser.users;
export default searchUsersSlice.reducer;