import {createSlice} from '@reduxjs/toolkit';

export const ticketSlice = createSlice({
    name:"ticket",
    initialState:{
        tickets:[],
        ticketSelect:null
    },
    reducers:{
        createTicket:(state, action)=>{
            state.tickets = state.tickets.push(action.payload);
        },
        getTickets:(state, action) => {
            state.tickets = action.payload;

        },
        ticketSelect:(state,action) => {
            debugger;
            state.ticketSelect = action.payload;
        }
    }
});

export const {createTicket, getTickets, ticketSelect} = ticketSlice.actions;

export const selectTickets = (state) => state.ticket.tickets;
export const selectTicketOne = (state) => state.ticket.ticketSelect;

export default ticketSlice.reducer;