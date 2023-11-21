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
        timeout:6000,
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
        .then(response =>{dispatch(getPedidos(response.results))
        }).catch(async error=>{
            debugger;
            let err = await error.response.text();
            dispatch(setMensaje({mensaje:err,tipo:'error'}));
        });
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
        timeout:6000,
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
        .then(async (response) => {
            debugger;
            await dispatch(createPedido(response.pedidoCreado));
            await dispatch(setMensaje({mensaje:'Pedido guardado!',tipo:'success'}))
        })
        .catch(async error=>{
            debugger;
            
            let res = await error.response;
            let err = res==null ? error.message : res.text();
            await dispatch(setMensaje({mensaje:err,tipo:'error'}));
        });
}
export const updatePed = (pedido_id,fechaIni,fechaFin,orden,estado,edit,fcNoti) => (dispatch, getState) =>{
    const state = getState();
    access_token = state.user.access_token;
    const body = {
        pedido:{
            ped_fc_registro:fechaIni,
            ped_fc_fin:fechaFin,
            ped_nro_orden:orden,
            ped_estado:estado,
            ped_fc_noti:fcNoti
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
            await dispatch(setMensaje({mensaje:'Pedido guardado!',tipo:'success'}))
            if(edit==null)
                await dispatch(emitNotifi({notifi:response.notificacion}))
        })
        .catch(async error=>{
            let err = await error.response.text();
            dispatch(setMensaje({mensaje:err,tipo:'error'}));
        });
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
        .catch(async error=>{
            let err = await error.response.text();
            dispatch(setMensaje({mensaje:err,tipo:'error'}));
        });
}