import React, { useEffect, useState } from 'react';
import SideBar from '../components/SideBar';
import {Routes, Route} from "react-router-dom";
import PedidoContainer from './PedidoContainer';
import Pedidos from './Pedidos';
import Usuarios from './Usuarios';
import io from 'socket.io-client';
import Dashboard from './Dashboard';


const Home = (props) => {
  const [socket, setSocket] = useState(null);

  useEffect(async () => {
    const newSocket = io(process.env.REACT_APP_CLIENT_URL);
    await setSocket(newSocket);
    return () => {
      newSocket.close();
    }
  },[setSocket]);
  
  return (
      <Routes>
        <Route path="*" element={<SideBar user={props.user==null ? 1 : 0} socket={socket} setSocket={setSocket}/>}>
          <Route path="users" element={<Usuarios user={props.user}  socket={socket}/>}/>
          <Route path="pedidos" element={<Pedidos user={props.user}/>}/>
          <Route path="pedido-info/:idPedido" element={<PedidoContainer user={props.user} socket={socket} setSocket={setSocket}/>}/>
          <Route index element={<Dashboard user={props.user}/>}/>
        </Route>
      </Routes>
  );
};

export default Home;
