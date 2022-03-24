import {createSlice} from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
    name:"ticket",
    initialState:{
        p_nombres: '',
        tickets:[],
        ticketSelected:null,
        resultado:{
            tipo:null,
            mensajes:[],
            mostrar:false
        },
        historial:[],
        estadoSelected:null
    },
    reducers:{
        createTicket:(state, action)=>{
            debugger;
            if(action.payload==undefined){
                state.resultado.tipo = 'error'
                state.resultado.mensajes = ["Error al guardar registro"];
                state.resultado.mostrar = true;    
            }else{
                console.log(action.payload);
                state.resultado.tipo = 'success'
                state.resultado.mensajes = ["Ticket Guardado!"];
                state.resultado.mostrar = true;
            }
        },
        getTickets:(state, action) => {
            debugger;
            state.tickets = action.payload.tickets;
            state.p_nombres = action.payload.p_nombres;
            state.resultado = {
                tipo:null,
                mensajes:[],
                mostrar:false
            };

        },
        ticketSelect:(state,action) => {
            state.ticketSelected = action.payload;
        },
        updateTicketSlice:(state,action) => {
            debugger;
            if(action.payload==undefined){
                state.resultado.tipo = 'error'
                state.resultado.mensajes = ["Error al guardar registro"];
                state.resultado.mostrar = true;    
            }else{
                console.log(action.payload);
                state.ticketSelected.ticket = action.payload;
                state.resultado.tipo = 'success'
                state.resultado.mensajes = ["Ticket Guardado!"];
                state.resultado.mostrar = true;
            }
        },
        getHistorial:(state,action) =>{
            debugger;
            if(action.payload.ticket!=null){
                state.ticketSelected.ticket = action.payload.ticket;
                state.historial = state.historial.concat(action.payload.estado);
                state.resultado.tipo = 'success'
                state.resultado.mensajes = ["Avance registrado!"];
                state.resultado.mostrar = true;
            }else if(action.payload.comentario!=null){
                state.resultado.tipo = 'info'
                state.resultado.mensajes = ["Comentario añadido!"];
                state.resultado.mostrar = true;
                state.estadoSelected.e_comentarios.push(action.payload.comentario);
            }else{
                state.historial = action.payload.estado;
            }    
        },
        changeEstadoSelected:(state,action)=>{
            state.estadoSelected = action.payload;
        }
    }
});

export const {
    createTicket, getTickets, 
    ticketSelect, updateTicketSlice, 
    getHistorial, changeEstadoSelected} = ticketSlice.actions;

export const selectTickets = (state) => state.ticket.tickets;
export const selectHistorial = (state) => state.ticket.historial;
export const selectEstado = (state) => state.ticket.estadoSelected;
export const selectResult = (state) => state.ticket.resultado;
export const selectTicketOne = (state) => state.ticket.ticketSelected;

export default ticketSlice.reducer;