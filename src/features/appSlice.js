import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
    name:"app",
    initialState:{
        mensaje:"",
        tipoMensaje:"info",
        trigger:false,
        notifis:[],
        tPendiente:[],
        nuevaNotifi:{},
        redirect:""
    },
    reducers:{
        setMensaje:(state, action)=>{
            return {...state,mensaje:action.payload.mensaje,tipoMensaje:action.payload.tipo,trigger:true}
        },
        clear:(state)=>{
            return {...state,mensaje:"",tipoMensaje:"info",trigger:false}
        },
        setTrigger:(state,action)=>{
            return {...state,trigger:action.payload};
        },
        getNotifis:(state,action)=>{
            return {...state,notifis:action.payload};
        },
        getTPendiente:(state,action) => {
            debugger;           
            return {...state,tPendiente:action.payload};
        },
        emitNotifi:(state,action)=>{
            debugger;
            return {...state,nuevaNotifi:action.payload.notifi};
        },
        setRedirect:(state,action) =>{
            return {...state,redirect:action.payload};
        }
    }
});

export const {  setMensaje, setClear,
                setTrigger, getNotifis,
                getTPendiente, emitNotifi,
                setRedirect} = appSlice.actions;

export const selectApp = (state) => state.app;
export const selectNotifis = (state) => state.app.notifis;
export const selectTPendiente = (state) => state.app.tPendiente;
export const selectNuevaNotifi = (state)=> state.app.nuevaNotifi;
export const selectRedirect = (state) => state.app.redirect;

export default appSlice.reducer;