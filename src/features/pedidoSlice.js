import {createSlice} from '@reduxjs/toolkit';

export const pedidoSlice = createSlice({
    name:"ped",
    initialState:{
        pedidos:[],
        pedidoSelect:null
    },
    reducers:{
        createPedido:(state, action)=>{
//            state.pedidos = state.pedidos.push(action.payload);
console.log("Pedido Creado");
        },
        getPedidos:(state, action) => {
            debugger;
            state.pedidos = action.payload;

        },
        pedidoSelect:(state,action) => {
            debugger;
            state.pedidoSelect = action.payload;
        },
        clearPedidoState:(state) =>{
            state.pedidos = [];
            state.pedidoSelect = null;
        }
    }
});

export const {createPedido, getPedidos, pedidoSelect, clearPedidoState} = pedidoSlice.actions;

export const selectPedidos = (state) => state.pedido.pedidos;
export const selectPedidoOne = (state) => state.pedido.pedidoSelect;

export default pedidoSlice.reducer;