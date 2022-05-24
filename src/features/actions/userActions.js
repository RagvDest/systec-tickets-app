import localStorage from "redux-persist/es/storage";
import {baseUrl} from "../../shared/baseUrl";
import { setMensaje, setRedirect } from "../appSlice";
import { getPedidos } from "../pedidoSlice";
import { logCli, login, logout } from "../userSlice";
let access_token = '';


export const logicLogin = ({username,password}) => (dispatch) =>{
    const loginData ={
        username:username,
        password:password
    };
    console.log(JSON.stringify(localStorage));
    console.log(JSON.stringify(loginData));
    return fetch(baseUrl+'users/logIn',{
        method:'POST',
        body:JSON.stringify(loginData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+access_token
        },
        credentials:'include'})
        .then(response=>{
            return response;
        })
        .then(response => response.json())
        .then(response => {
            debugger;
            if(response.error) throw new Error(response.error);
            dispatch(login({user:response.user,access_token:response.access_token}))
        })
        .catch(error=>{dispatch(setMensaje({mensaje:error.message,tipo:'error'}));});
};

export const logicLogCli = (identificacion,orden) => (dispatch) =>{
    debugger;
    const loginData = {
        identificacion:identificacion,
        orden:orden
    };
    return fetch(baseUrl+'users/log-cli',{
        method:'POST',
        body:JSON.stringify(loginData),
        headers:{
            'Content-Type':'application/json',
            'Authorization':'Bearer '+access_token
        },
        credentials:'include'})
        .then(response=>{
            debugger;
            return response;
            }
        )
        .then(response => response.json())
        .then(async response => {
            debugger;
            if(response.error) throw new Error(response.error);
            if(response.mensaje==null){
                if(response.pedidos.length<1){
                    dispatch(setMensaje({mensaje:'Orden no existe o está inactiva.',tipo:'error'}));
                }else{
                    dispatch(logCli({user:response.user,access_token:response.access_token}))
                    dispatch(getPedidos(response.pedidos));
                }
            }else{
                dispatch(setMensaje({mensaje:response.mensaje, tipo:'error'}));
            }
        })
        .catch(error=>{
            dispatch(setMensaje({mensaje:error.message,tipo:'error'}));
        });

}

export const logicLogout = () => (dispatch) =>{
    return fetch(baseUrl+'users/logout',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+access_token
        },
        credentials:'include'})
        .then(response => {
            if(response.ok)
            return response;
            else{
                let error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(response => dispatch(logout()))
        .catch(error=>{console.log('Log Out',error.message)});
};

export const logicPass = (body) => (dispatch) =>{
    return fetch(baseUrl+'users/pass',{
        method:'POST',
        body:JSON.stringify(body),
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include'})
        .then(response=>{
            if(response.ok)
                return response;
            else{
                let error = new Error('Error '+response.status+': '+response.statusText);
                error.response = response;
                throw error;
            }
        },
        error => {
            let errmess = new Error(error.message);
            throw errmess;
        })
        .then(response => response.json())
        .then(async response => {
            await dispatch(setMensaje({mensaje:response.mensaje,tipo:'success'}));
            await dispatch(setRedirect('/login'));
        })
        .catch(error=>{console.log('generate-pass',error.message)});
}