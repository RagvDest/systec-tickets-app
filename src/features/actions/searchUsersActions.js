import {baseUrl} from "../../shared/baseUrl";
import { setMensaje } from "../appSlice";
import { setToast } from "../pagSlice";
import { getUsuarios, addUsuario, updateUsuario } from "../searchUsersSlice";

export const searchUsers = (filtro,input) =>(dispatch) => {
    const op = filtro === 'Username' || filtro === 'Correo' ? 'u' : 'p';
    console.log('Filtro: '+filtro);
    console.log('Input: '+input);
    console.log('Op: '+op);
    
    let query='';
    if(input!=='')
        query = '?input='+input+'&op='+op+'&filtro='+filtro;
    return fetch(baseUrl+'users/all'+query,{
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
        .then(response =>{dispatch(getUsuarios(response.results))})
        .catch(error=>{dispatch(setToast(error.message))});
}
export const addUser = ({username,nombres,apellidos,cedula,mail,rol}) => (dispatch) =>{
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
        },
        rol:rol
    };
    console.log(body);
    return fetch(baseUrl+'users/crear',{
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
        .then(async response => {
            await dispatch(addUsuario({username:response.usuario,persona:response.persona,rol:response.rol.r_rol}))
            await dispatch(setMensaje({mensaje:'Usuario creado. Email de confirmación enviado',tipo:'success'}));
        })
        .catch(error=>{console.log('Crear Usuario',error.message)});
}
export const updateUser = ({username,nombres,apellidos,cedula,mail,id}) => (dispatch) =>{
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
