import {createSlice} from '@reduxjs/toolkit';

export const pedidoSlice = createSlice({
    name:"ped",
    initialState:{
        pedidos:[]
    },
    reducers:{
        createPedido:(state, action)=>{
            state.pedidos = state.pedidos.push(action.payload);
        },
        getPedidos:(state, action) => {
            debugger;
            state.pedidos = action.payload;

        }
    }
});

export const {createPedido, getPedidos} = pedidoSlice.actions;

export const selectPedidos = (state) => state.pedido.pedidos;

export default pedidoSlice.reducer;