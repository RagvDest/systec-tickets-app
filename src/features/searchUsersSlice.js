import {createSlice} from '@reduxjs/toolkit';

export const searchUsersSlice = createSlice({
    name:"users",
    initialState:{
        users:[]
    },
    reducers:{
        getUsuarios:(state, action)=>{
            let nUsers = action.payload.results;
            if(action.payload.rol === "Empleado"){
                nUsers = action.payload.results.filter((it)=>{
                    return it.username.rol_id.r_rol==="Cliente";
                });
                console.log(nUsers);
            }
            state.users = nUsers;
        },
        addUsuario:(state,action)=>{
            state.users.push(action.payload);
        },
        updateUsuario:(state,action)=>{
            debugger;
            console.log('Usuario_id: '+action.payload.usuario._id +'- Actualizado');
        },
        clearUsers:(state)=>{
            state.users = [];
        }
    }
});
export const {getUsuarios, addUsuario, updateUsuario, clearUsers} = searchUsersSlice.actions;
export const selectUsers = (state) => state.searchUser.users;
export default searchUsersSlice.reducer;