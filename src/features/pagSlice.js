import {createSlice} from '@reduxjs/toolkit';

export const pagSlice = createSlice({
    name:"pag",
    initialState:{
        pag:"ped",
        toast:""
    },
    reducers:{
        setPagina:(state, action)=>{
            state.pag = action.payload;
        },
        setToast:(state, action)=>{
            return {...state,toast:action.payload};
        }
    }
});

export const {setPagina, setToast} = pagSlice.actions;

export const selectPag = (state) => state.pag.pag;
export const selectToast = (state) => state.pag.toast;

export default pagSlice.reducer;