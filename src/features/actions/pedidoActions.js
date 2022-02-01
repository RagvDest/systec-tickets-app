import {baseUrl} from "../../shared/baseUrl";
import { createPedido, getPedidos } from "../pedidoSlice";


export const searchPedidos = (filtro,input, orden, estado) =>(dispatch) => {
    console.log('Filtro: '+filtro);
    console.log('Input: '+input);
    debugger;
    let query='';
    if(input!=='')
        query = '?input='+input+'&orden='+orden+'&filtro='+filtro+'&estado='+estado;
    return fetch(baseUrl+'pedido/all'+query,{
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
        .then(response =>{dispatch(getPedidos(response.results))})
}

export const addPed = (id_usuario,fechaIni,fechaFin) => (dispatch) =>{
    debugger;
    const body = {
        pedido:{
            ped_fc_registro:fechaIni,
            ped_fc_fin:fechaFin
        },
        id_usuario:id_usuario
    };
    console.log(body);
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
        .catch(error=>{console.log('Crear Pedido',error.message)});
}
/*
export const updateUser = ({username,nombres,apellidos,cedula,mail,id}) => (dispatch) =>{
    debugger;
    const body = {
        usuario:{
            u_usuario:username,
            u_mail:mail
        },
        persona:{
            p_nombres:nombres,
            p_cedula:cedula,
            p_apellidos:apellidos
        }
    };
    console.log(body);
    return fetch(baseUrl+'users/update/'+id,{
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
        .then(response => dispatch(updateUsuario({usuario:response.usuario,persona:response.persona,rol:response.rol.r_rol})))
        .catch(error=>{console.log('Actualizar Usuario',error.message)});
}
*/