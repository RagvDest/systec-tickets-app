
import React, { Component, useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation, useNavigate} from 'react-router';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { addUsuario, getUsuarios } from '../features/searchUsersSlice';
import { Alert, AlertTitle, Box, Grid, Snackbar } from '@mui/material';
import Home from '../pages/Home';
import {connect, useDispatch, useSelector} from 'react-redux';
import LogIn from '../pages/LogIn';
import PasswordModal from './Login/PasswordModal';
import { selectApp, setTrigger } from '../features/appSlice';



const mapStateToProps = state => {
    return {
        user:state.user.user
    };
};

function RequireAuth({ children, redirectTo, user }) {
    debugger;
    let isAuthenticated = user!=null;
    return isAuthenticated ? children[0] : children[1];
}

const Main = (props) =>{
    const [mensaje,setMensaje] = useState("");
    const [tipoAlert,setTipoAlert] = useState("info");
    const [openToast,setOpenToast] = useState(false);
    const dispatch = useDispatch();

    const appItems = useSelector(selectApp);

    useEffect(()=>{
        async function fetchData(){
            if(appItems.trigger) await handleToast();
        }
        fetchData();
    },[appItems.trigger===true])

    const handleToast = () =>{
        setOpenToast(false);
        setMensaje(appItems.mensaje);
        setTipoAlert(appItems.tipoMensaje);
        setOpenToast(true);
        dispatch(setTrigger(false));
    }



    const handleClose = () =>{
        setMensaje();
        setOpenToast(false);
      }

      return(
      <div>
          <TransitionGroup>
                    <CSSTransition key='1234' classNames="page" timeout={300}>
                        <Routes>
                            <Route path='login' element={<LogIn/>}/>
                            <Route path='generate-pass/:idUser/:hashPassword' element={<PasswordModal mode='c' />}/>
                            <Route path='recover-pass' element={<PasswordModal mode='u' />}/>
                            
                            <Route path='*' element={
                                <RequireAuth redirectTo="" user={props.user}>
                                    <Home user={props.user}/>
                                    <LogIn/>
                                </RequireAuth>
                            }/>
                            
                        </Routes>
                    </CSSTransition>
            </TransitionGroup>
            <Snackbar open={openToast} 
                    autoHideDuration={6000} 
                    onClose={handleClose}
                    anchorOrigin={{vertical: "top",
                    horizontal: "right"}}>
                <Alert onClose={handleClose} severity={tipoAlert} sx={{ width: '100%' }}>
                        <AlertTitle>{mensaje}</AlertTitle>
                </Alert>
            </Snackbar>   
      </div>
      )
}

export default connect(mapStateToProps)(Main);
