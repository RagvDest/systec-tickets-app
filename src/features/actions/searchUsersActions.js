import {baseUrl} from "../../shared/baseUrl";
import { getUsuarios } from "../searchUsersSlice";

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
}