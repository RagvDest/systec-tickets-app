import {baseUrl} from "../../shared/baseUrl";
import { setMensaje } from "../appSlice";
import { getPedidos } from "../pedidoSlice";
import { logCli, login, logout } from "../userSlice";

export const logicLogin = ({username,password}) => (dispatch) =>{
    const loginData ={
        username:username,
        password:password
    };
    console.log(JSON.stringify(loginData));
    return fetch(baseUrl+'users/logIn',{
        method:'POST',
        body:JSON.stringify(loginData),
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
        .then(response => dispatch(login({username:response.usuario,rol:response.rol,persona:response.persona})))
        .catch(error=>{console.log('Log In',error.message)});
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
            'Content-Type':'application/json'
        },
        credentials:'include'})
        .then(response=>{
            debugger;
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
            debugger;
            if(response.mensaje==null){
                if(response.pedidos.length<1){
                    dispatch(setMensaje({mensaje:'Orden no existe o está inactiva.',tipo:'error'}));
                }else{
                    dispatch(logCli({user:response.user}))
                    //dispatch(getPedidos(response.pedidos));
                }
            }else{
                dispatch(setMensaje({mensaje:response.mensaje, tipo:'error'}));
            }
        })
        .catch(error=>{console.log('Log In Cli',error.message)});

}

export const logicLogout = () => (dispatch) =>{
    return fetch(baseUrl+'users/logout',{
        method:'GET',
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