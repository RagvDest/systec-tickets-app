import {baseUrl} from "../../shared/baseUrl";
import { emitNotifi } from "../appSlice";
import { createPedido, getPedidos } from "../pedidoSlice";
import { createTicket, errorTicket, getHistorial, getTickets, ticketSelect, updateTicketSlice } from "../ticketSlice";
import { updatePed } from "./pedidoActions";

export const crearAvance = (json) => (dispatch) =>{
    let body = {
        estado:{
            e_nombre:json.estado,
            e_detalle:json.detalle,
            e_usuario:json.usuario.persona.p_nombres+" "+json.usuario.persona.p_apellidos,
            user_id:json.usuario.username
        },
        id_ticket:json.ticket
    };
    return fetch(baseUrl+"estado/crear",{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'})
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                let error = new Error('Error '+response.status+': '+response.statusText);
                console.log(response);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        }).then(response => response.json())
        .then( async response => {
            await dispatch(getHistorial(response));
            await dispatch(emitNotifi({notifi:response.notificacion}))
        })
        .catch(error=>{console.log('Crear Avance',error.message)});
}

export const getAvances = (id_ticket) => (dispatch) =>{
    debugger;
    return fetch(baseUrl+'estado/all/'+id_ticket,{
        method:'GET',
        credentials:'include'})
    .then(response => {
        if(response.ok){
            return response;
        }
        else {
            let error = new Error('Error '+response.status+': '+response.statusText);
            console.log(response);
            error.response = response;
            throw error;
        }
    },
    error => {
        let errmess = new Error(error.message);
        throw errmess;
    }).then(response => response.json())
    .then(response => dispatch(getHistorial(response)))
    .catch(error=>{console.log('Get Historial',error.message)});
}

export const searchTickets = (idPedido) =>(dispatch) => {
    return fetch(baseUrl+'ticket/all/'+idPedido,{
        method:'GET',
        credentials:'include'})
        .then(response=>{
            if(response.ok){
                return response;
            }
            else{
                let error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        }).then(response => response.json())
        .then(response =>{dispatch(getTickets(response.results))})
}
export const addTicket = (id_pedido,detalle,total,abono,tipoEquipo,check) => (dispatch) =>{
    debugger;
    const body = {
        ticket:{
            t_detalle:detalle,
            t_total:total,
            t_abono:abono,
            t_tipo_equipo:tipoEquipo,
            t_re_abierto:check
        },
        id_pedido:id_pedido
    };
    return fetch(baseUrl+'ticket/crear',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'})
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                let error = new Error('Error '+response.status+': '+response.statusText);
                console.log(response.message);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        }).then(response => response.json())
        .then(async response => {
            await dispatch(createTicket(response.ticketCreado));
            await dispatch(emitNotifi({notifi:response.notificacion}))
        })
        .catch(async error=>{
            debugger;
            await dispatch(errorTicket(error.message));

        });
}


export const updateTicket = (id_ticket,detalle,total,abono,tipoEquipo) => (dispatch) =>{
    debugger;
    const body = {
        ticket:{
            t_detalle:detalle,
            t_total:total,
            t_abono:abono,
            t_tipo_equipo:tipoEquipo
        }
    };
    return fetch(baseUrl+'ticket/update/'+id_ticket,{
        method:'PATCH',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'})
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                let error = new Error('Error '+response.status+': '+response.statusText);
                console.log(response);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        }).then(response => response.json())
        .then(async response => {
            await dispatch(updateTicketSlice(response.ticket))
            await dispatch(emitNotifi({notifi:response.notificacion}))
        })
        .catch(error=>{console.log('Crear Ticket',error.message)});
}

export const addComentario = (id_estado, comentario, usuario, id_user) => (dispatch) =>{
    debugger;
    const body = {
        comentario:{
            c_detalle:comentario,
            c_usuario:usuario,
            user_id:id_user
        }
    };
    return fetch(baseUrl+'estado/update/'+id_estado,{
        method:'PATCH',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'})
        .then(response => {
            if(response.ok){
                return response;
            }
            else {
                let error = new Error('Error '+response.status+': '+response.statusText);
                console.log(response);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        }).then(response => response.json())
        .then(async response => {
            await dispatch(getHistorial(response));
            await dispatch(emitNotifi({notifi:response.notificacion}))
            })
        .catch(error=>{console.log('Add Comentario',error.message)});
}