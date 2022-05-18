import { baseUrl } from "../../shared/baseUrl";
import { setToast } from "../pagSlice";
import {getNotifis, getTPendiente} from "../appSlice";

export const searchNotifis = () =>(dispatch) => {
        return fetch(baseUrl+'noti/all',{
        method:'GET',
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

export const searchTrabajosPendientes = () =>(dispatch) => {
    debugger;
    return fetch(baseUrl+'pedido/tpendiente',{
    method:'GET',
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
    .then(response =>{dispatch(getTPendiente(response))})
    .catch(error=>{dispatch(setToast(error))});
}