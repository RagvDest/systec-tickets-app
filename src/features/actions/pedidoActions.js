import {baseUrl} from "../../shared/baseUrl";
import { setToast } from "../pagSlice";
import { createPedido, getPedidos, pedidoSelect } from "../pedidoSlice";
import { emitNotifi, setMensaje } from "../appSlice";
import { searchTickets } from "./ticketActions";
let access_token = "";

export const searchPedidos = (filtro,input, orden, estado,user) =>(dispatch, getState) => {
    let query='';
    let body = {
        usuario:user
    }
    const state = getState();
    access_token = state.user.access_token;
    
    if(input!=='')
        query = '?input='+input+'&orden='+orden+'&filtro='+filtro+'&estado='+estado;
    return fetch(baseUrl+'pedido/all'+query,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+access_token
        },
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
        .then(response =>{dispatch(getPedidos(response.results))})
}
export const addPed = (id_usuario,fechaIni,fechaFin) => (dispatch, getState) =>{
    const state = getState();
    access_token = state.user.access_token;
    const body = {
        pedido:{
            ped_fc_registro:fechaIni,
            ped_fc_fin:fechaFin
        },
        id_usuario:id_usuario
    };
    return fetch(baseUrl+'pedido/crear',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+access_token
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
        .then(response => dispatch(createPedido(response.pedidoCreado)))
        .catch(error=>{dispatch(setToast(error))});
}
export const updatePed = (pedido_id,fechaIni,fechaFin,orden,estado,edit) => (dispatch, getState) =>{
    const state = getState();
    access_token = state.user.access_token;
    const body = {
        pedido:{
            ped_fc_registro:fechaIni,
            ped_fc_fin:fechaFin,
            ped_nro_orden:orden,
            ped_estado:estado
        }
    };
    console.log(body);
    return fetch(baseUrl+'pedido/update/'+pedido_id,{
        method:'PATCH',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json',
            'Authorization': 'Bearer '+access_token
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
            await dispatch(pedidoSelect({pedido:response.pedido,updated:true}));
            await dispatch(searchTickets(pedido_id));
            await dispatch(setToast('Actualizado'));
            if(edit==null)
                await dispatch(emitNotifi({notifi:response.notificacion}))
        })
        .catch(error=>{console.log('Actualizar Pedido(Cambiar estado general)',error.message)});
}
export const changeEstado = (pedido_id,estado) => (dispatch) =>{
    console.log(pedido_id,estado);
    dispatch();
}

export const getPedInfo = (idPedido) => (dispatch, getState) =>{
    const state = getState();
    access_token = state.user.access_token;
    return fetch(baseUrl+'pedido/info/'+idPedido,{
        method:'GET',
        credentials:'include',
        headers:{
            'Authorization': 'Bearer '+access_token
        }
        })
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
        .then(response =>{dispatch(pedidoSelect(response))})
        .catch(error=>{dispatch(setToast(error))});
}