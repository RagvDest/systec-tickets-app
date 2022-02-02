import {createSlice} from '@reduxjs/toolkit';

export const pagSlice = createSlice({
    name:"pag",
    initialState:{
        pag:"ped"
    },
    reducers:{
        setPagina:(state, action)=>{
            state.pag = action.payload;
        }
    }
});

export const {setPagina} = pagSlice.actions;

export const selectPag = (state) => state.pag.pag;

export default pagSlice.reducer;