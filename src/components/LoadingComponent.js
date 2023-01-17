import { Backdrop, CircularProgress } from '@mui/material';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {ThreeDots} from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectLoading, setLoading } from '../features/appSlice';


export const Loading = (props) =>{

    const [openLocal, setOpenLocal] = useState(false);

    const loading = useSelector(selectLoading)
    const dispatch = useDispatch();

    useEffect(()=>{
        async function fetchData(){
            debugger;
           await setOpenLocal(loading.loading);
           console.log(openLocal)
        };
        fetchData();
        
    },[loading])

    const handleClose = async () =>{
        debugger;
        if(!loading.block){
            setOpenLocal(false);
            //await dispatch(setLoading({loading:false,block:false}));
            dispatch(setLoading(false));
        }
    };

    return(
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={openLocal}
          onClick={handleClose}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
    );
};
