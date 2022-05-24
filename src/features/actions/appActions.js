import { baseUrl } from "../../shared/baseUrl";
import { setToast } from "../pagSlice";
import {getNotifis, getTPendiente} from "../appSlice";
import getStorage from "redux-persist/lib/storage/getStorage";


let access_token = "";


export const searchNotifis = () =>(dispatch, getState) => {
    const state = getState();
    access_token = state.user.access_token;
        return fetch(baseUrl+'noti/all',{
        method:'GET',
        headers:{
            'Authorization':'Bearer '+access_token
        },
        credentials:'include'
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
        .then(response =>{dispatch(getNotifis(response))})
        .catch(error=>{dispatch(setToast(error))});
}

export const searchTrabajosPendientes = () =>(dispatch, getState) => {
    const state = getState();
    access_token = state.user.access_token;
    return fetch(baseUrl+'pedido/tpendiente',{
    method:'GET',
    headers:{
        'Authorization':'Bearer '+access_token
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
    .then(response =>{dispatch(getTPendiente(response))})
    .catch(error=>{dispatch(setToast(error))});
}