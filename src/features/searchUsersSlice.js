import {createSlice} from '@reduxjs/toolkit';

const initialStateX = {
    userSelected:null,
    users:[]
}

export const searchUsersSlice = createSlice({
    name:"users",
    initialState:initialStateX,
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
        userSelect:(state,action)=>{
            debugger;
            state.userSelected = action.payload;
        },
        clearUsers:(state)=>{
            state.users = [];
        },
        clearUsersState:(state)=>{
            return initialStateX;
        }
    }
});
export const {
    getUsuarios, addUsuario,
    updateUsuario, clearUsers,
    userSelect, clearUsersState
    } = searchUsersSlice.actions;
export const selectUsers = (state) => state.searchUser.users;
export const selectUser = (state) => state.searchUser.userSelected;
export default searchUsersSlice.reducer;