import {baseUrl} from "../../shared/baseUrl";
import { setMensaje } from "../appSlice";
import { setToast } from "../pagSlice";
import { getUsuarios, addUsuario, updateUsuario, selectUser, userSelect } from "../searchUsersSlice";
import { updateCli } from "../userSlice";
let access_token = '';

export const searchUsers = (filtro,input,modo) =>(dispatch, getState) => {
    const state = getState();
    access_token = state.user.access_token;
    let rol = state.user.user.rol;

    if(modo==null)
        modo="";

    const op = filtro === 'Username' || filtro === 'Correo' ? 'u' : 'p';
    console.log('Filtro: '+filtro);
    console.log('Input: '+input);
    console.log('Op: '+op);
    
    let query='';
    if(input!=='')
        query = '&input='+input+'&op='+op+'&filtro='+filtro;
    return fetch(baseUrl+'users/all'+'?mode='+modo+query,{
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
            p_apellidos:json.apellidos,
            p_tel:json.telefono
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
            if(response.rol.r_rol==='EMPLEADO')
                await dispatch(setMensaje({mensaje:'Usuario creado. Email de confirmación enviado',tipo:'success'}));
            else
                await dispatch(setMensaje({mensaje:'Cliente creado', tipo:'success'}));
        })
        .catch(async error=>{
            console.log(error);
            await dispatch(setMensaje({mensaje:error.message,tipo:'error'}))
        });
}
export const updateUser = (json,activo,modo) => (dispatch, getState) =>{
    const state = getState();
    access_token = state.user.access_token;

    const body = {
        usuario:{
            u_usuario:json.username,
            u_mail:json.mail,
            u_activo:activo
        },
        persona:{
            p_nombres:json.nombres,
            p_cedula:json.cedula,
            p_apellidos:json.apellidos,
            p_tel:json.telefono
        }
    };
    return fetch(baseUrl+'users/update/'+json.id,{
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
        .then(async response => {
            debugger;
            if(response.usuario['_id'] === state.user.user.username['_id']){
                debugger;
                await dispatch(updateCli(response));
            }else{
                let user = {
                    username: response.usuario,
                    persona: response.persona
                }
                await dispatch(userSelect(user));
            }
            await dispatch(setMensaje({mensaje:'Usuario actualizado',tipo:'success'}));
            
        })
        .catch(error=>{
            console.log(error);
            dispatch(setMensaje({mensaje:"Ocurrió un error al actualizar el usuario.",tipo:'error'}));
        }
        );
}
