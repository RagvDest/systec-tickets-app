import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Panel from '../components/Panel';
import SideBar from '../components/SideBar';
import { logicLogout } from '../features/actions/userActions';
import {Routes, Route, useRoutes, BrowserRouter} from "react-router-dom";
import PedidoContainer from './PedidoContainer';
import Pedidos from './Pedidos';
import Usuarios from './Usuarios';
import io from 'socket.io-client';
import { selectUser } from '../features/userSlice';
import { Alert, AlertTitle, Snackbar } from '@mui/material';
import Dashboard from './Dashboard';
import PasswordModal from '../components/Login/PasswordModal';

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
  },[setSocket]);
  
  return (
    <React.Fragment>
      <Routes>
        <Route path="*" element={<SideBar user={props.user==null ? 1 : 0} socket={socket} setSocket={setSocket}/>}>
          <Route path="users" element={<Usuarios user={props.user}  socket={socket}/>}/>
          <Route path="pedidos" element={<Pedidos user={props.user}/>}/>
          <Route path="pedido-info/:idPedido" element={<PedidoContainer user={props.user} socket={socket} setSocket={setSocket}/>}/>
          <Route index element={<Dashboard user={props.user}/>}/>
        </Route>
      </Routes>
    </React.Fragment>
  );
};

export default Home;
