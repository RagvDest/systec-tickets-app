import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name:"app",
    initialState:{
        mensaje:"",
        tipoMensaje:"info",
        trigger:false,
        notifis:[]
    },
    reducers:{
        setMensaje:(state, action)=>{
            debugger;
            return {...state,mensaje:action.payload.mensaje,tipoMensaje:action.payload.tipo,trigger:!state.trigger}
        },
        clear:(state)=>{
            return {...state,mensaje:"",tipoMensaje:"info"}
        },
        setTrigger:(state,action)=>{
            return {...state,trigger:action.payload};
        },
        getNotifis:(state,action)=>{
            return {...state,notifis:action.payload};
        }
    }
});

export const {setMensaje, setClear, setTrigger, getNotifis} = appSlice.actions;

export const selectApp = (state) => state.app;
export const selectNotifis = (state) => state.app.notifis;

export default appSlice.reducer;