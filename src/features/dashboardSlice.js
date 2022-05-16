import {createSlice} from '@reduxjs/toolkit';

export const dashSlice = createSlice({
    name:"dash",
    initialState:{
        txClientes:[],
        txEstados:[],
        txEquipos:[],
        txActivos:"",
        nUsers:"",
        totalVentas:""
    },
    reducers:{
        getDatos:(state, action)=>{
            debugger;
            return { ...state,
                txClientes:action.payload.txClientes,
                txEstados:action.payload.txEstados,
                txEquipos:action.payload.txEquipos,
                txActivos:action.payload.txActivos,
                nUsers:action.payload.nUsers,
                totalVentas:action.payload.totalVentas
            };
        }
    }
});

export const {getDatos} = dashSlice.actions;

export const selectDash = (state) => state.dash;

export default dashSlice.reducer;