import {createSlice} from '@reduxjs/toolkit';

const size=5;

const initialStateX = {
    pedidos:[],
    pedidoSelect:null,
    pedidosGrupo:[]
};

export const pedidoSlice = createSlice({
    name:"ped",
    initialState:initialStateX,
    reducers:{
        createPedido:(state, action)=>{
//            state.pedidos = state.pedidos.push(action.payload);
console.log("Pedido Creado");
        },
        getPedidos:(state, action) => {
            debugger;
            state.pedidos = action.payload;
            state.pedidosGrupo = action.payload.slice(0,5);

        },
        changePedidos:(state,action)=>{
            let newArray = state.pedidos.slice((size*(action.payload-1)),(size*action.payload));
            console.log(size*(action.payload-1));
            state.pedidosGrupo = newArray;
        },
        pedidoSelect:(state,action) => {
            if(action.payload.updated==null)
                state.pedidoSelect = action.payload;
            else{
                return {...state,pedidoSelect:{...state.pedidoSelect,pedido:action.payload.pedido}};
            }
        },
        clearPedidoState:(state) =>{
            return {...state,
                initialStateX
            }
        }
    }
});

export const {createPedido, changePedidos, getPedidos, pedidoSelect, clearPedidoState} = pedidoSlice.actions;

export const selectPedidos = (state) => state.pedido.pedidos;
export const selectPedidosG = (state) => state.pedido.pedidosGrupo;
export const selectPedidoOne = (state) => state.pedido.pedidoSelect;

export default pedidoSlice.reducer;