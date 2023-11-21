import { createSlice } from "@reduxjs/toolkit";

const initialStateX = {
    mensaje:"",
    tipoMensaje:"info",
    trigger:false,
    notifis:[],
    tPendiente:[],
    nuevaNotifi:{},
    redirect:"",
    loading:{
        open:false,
        block:false
    }
};

export const appSlice = createSlice({
    name:"app",
    initialState: initialStateX,
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
            return {...state,tPendiente:action.payload};
        },
        emitNotifi:(state,action)=>{
            return {...state,nuevaNotifi:action.payload.notifi};
        },
        setLoading:(state,action) =>{
            return {...state,loading:action.payload};
        },
        setRedirect:(state,action) =>{
            return {...state,redirect:action.payload};
        },
        clearApp:(state)=>{
            return {...state,
                initialStateX
            }
        }
    }
});

export const {  setMensaje, clear,
                setTrigger, getNotifis,
                getTPendiente, emitNotifi,
                setLoading,
                setRedirect, clearApp} = appSlice.actions;

export const selectApp = (state) => state.app;
export const selectNotifis = (state) => state.app.notifis;
export const selectTPendiente = (state) => state.app.tPendiente;
export const selectNuevaNotifi = (state)=> state.app.nuevaNotifi;
export const selectRedirect = (state) => state.app.redirect;
export const selectLoading = (state) => state.app.loading;

export default appSlice.reducer;