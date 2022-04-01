import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel from '../components/Panel';
import SideBar from '../components/SideBar';
import { logicLogout } from '../features/actions/userActions';
import {Routes, Route, useRoutes, BrowserRouter} from "react-router-dom";
import BuscarUsuario from '../components/BuscarUsuario';
import Usuarios from './Usuarios';
import io from 'socket.io-client';
import { selectUser } from '../features/userSlice';
import { Alert, AlertTitle, Snackbar } from '@mui/material';

const Home = (props) => {
  const dispatch = useDispatch();
  const [socket, setSocket] = useState(null);

  const handleLogOut = (e) => {
    dispatch(logicLogout());
  }

  useEffect(async () => {
    const newSocket = io(`http://${window.location.hostname}:3000`);
    await setSocket(newSocket);
   


    return () => {
      newSocket.close();
    }
  },[setSocket])
  
  return (
    <React.Fragment>
        <SideBar user={props.user==null ? 1 : 0} socket={socket}/>
    </React.Fragment>
  );
};

export default Home;
