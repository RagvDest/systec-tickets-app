import {baseUrl} from "../../shared/baseUrl";
import { setToast } from "../pagSlice";
import { createPedido, getPedidos, pedidoSelect } from "../pedidoSlice";


export const searchPedidos = (filtro,input, orden, estado,user) =>(dispatch) => {
    let query='';
    let body = {
        usuario:user
    }
    debugger;
    if(input!=='')
        query = '?input='+input+'&orden='+orden+'&filtro='+filtro+'&estado='+estado;
    return fetch(baseUrl+'pedido/all'+query,{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
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
export const addPed = (id_usuario,fechaIni,fechaFin) => (dispatch) =>{
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
        .then(response => dispatch(createPedido(response.pedidoCreado)))
        .catch(error=>{dispatch(setToast(error))});
}
export const updatePed = (pedido_id,fechaIni,fechaFin,orden,estado) => (dispatch) =>{
    console.log(pedido_id,fechaIni,fechaFin);
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
        .then(response => {
            debugger;
            dispatch(pedidoSelect({pedido:response.pedido,updated:true}));

        })
        .catch(error=>{console.log('Actualizar Pedido(Cambiar estado general)',error.message)});
}
export const changeEstado = (pedido_id,estado) => (dispatch) =>{
    console.log(pedido_id,estado);
    dispatch();
}
