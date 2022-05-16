import { baseUrl } from "../../shared/baseUrl";
import { setToast } from "../pagSlice";
import {getDatos} from "../dashboardSlice";

export const searchDatos = () =>(dispatch) => {
        return fetch(baseUrl+'dashboard',{
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
        .then(response =>{dispatch(getDatos(response))})
        .catch(error=>{dispatch(setToast(error))});
}