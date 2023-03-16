import {createSlice} from '@reduxjs/toolkit';

const size=5;

const initialStateX = {
    userSelected:null,
    users:[],
    usersGrupo:[],
    trigger:false
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
            state.usersGrupo = nUsers.slice(0,5);
            state.trigger = !state.trigger;
        },
        changeUsuarios:(state,action)=>{
            let newArray = state.users.slice((size*(action.payload-1)),(size*action.payload));
            console.log(size*(action.payload-1));
            state.usersGrupo = newArray;
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
    userSelect, clearUsersState,
    changeUsuarios
    } = searchUsersSlice.actions;
export const selectUsers = (state) => state.searchUser.users;
export const selectUsersG = (state) => state.searchUser.usersGrupo;
export const selectUser = (state) => state.searchUser.userSelected;
export const selectTriggerUs = (state) => state.searchUser.trigger;
export default searchUsersSlice.reducer;