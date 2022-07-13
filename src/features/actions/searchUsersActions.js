import {baseUrl} from "../../shared/baseUrl";
import { setMensaje } from "../appSlice";
import { setToast } from "../pagSlice";
import { getUsuarios, addUsuario, updateUsuario } from "../searchUsersSlice";
let access_token = '';

export const searchUsers = (filtro,input) =>(dispatch, getState) => {
    const state = getState();
    access_token = state.user.access_token;
    let rol = state.user.user.rol;

    const op = filtro === 'Username' || filtro === 'Correo' ? 'u' : 'p';
    console.log('Filtro: '+filtro);
    console.log('Input: '+input);
    console.log('Op: '+op);
    
    let query='';
    if(input!=='')
        query = '?input='+input+'&op='+op+'&filtro='+filtro;
    return fetch(baseUrl+'users/all'+query,{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+access_token
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
        .then(response =>{dispatch(getUsuarios({results:response.results,rol:rol}))})
        .catch(error=>{dispatch(setToast(error.message))});
}
export const addUser = (json,rol) => (dispatch, getState) =>{
    const state = getState();
    debugger;
    access_token = state.user.access_token;

    const body = {
        usuario:{
            u_usuario:json.username,
            u_mail:json.mail
        },
        persona:{
            p_nombres:json.nombres,
            p_cedula:json.cedula,
            p_apellidos:json.apellidos
        },
        rol:rol
    };
    console.log(body);
    return fetch(baseUrl+'users/crear',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+access_token
        },
        credentials:'include'})
        .then( async response => {
            if(response.ok){
                return response;
            }
            else {
                let errorMess = await response.text();
                let error = new Error(errorMess);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        }).then(response => response.json())
        .then(async response => {
            await dispatch(addUsuario({username:response.usuario,persona:response.persona,rol:response.rol.r_rol}))
            await dispatch(setMensaje({mensaje:'Usuario creado. Email de confirmación enviado',tipo:'success'}));
        })
        .catch(async error=>{
            console.log(error);
            await dispatch(setMensaje({mensaje:error.message,tipo:'error'}))
        });
}
export const updateUser = ({username,nombres,apellidos,cedula,mail,id}) => (dispatch, getState) =>{
    const state = getState();
    access_token = state.user.access_token;

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
    return fetch(baseUrl+'users/update/'+id,{
        method:'PATCH',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+access_token
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
            dispatch(setMensaje({mensaje:'Usuario actualizado',tipo:'success'}));
        })
        .catch(error=>{
            dispatch(setMensaje({mensaje:"Ocurrió un error al actualizar el usuario.",tipo:'error'}));
            console.log('Actualizar Usuario',error.message)}
            );
}
