import React from 'react';
import { useDispatch } from 'react-redux';
import Panel from '../components/Panel';
import SideBar from '../components/SideBar';
import { logicLogout } from '../features/actions/userActions';
import {Routes, Route, useRoutes, BrowserRouter} from "react-router-dom";
import BuscarUsuario from '../components/BuscarUsuario';
import Usuarios from './Usuarios';

const Routs = () => {
  const routes = useRoutes([
    {path:"/", element:<Panel/>},
    {path:"/users", element:<Usuarios/>}
  ])
  return routes;
}

const Home = (props) => {
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    dispatch(logicLogout());
  }

  
  return (
      <BrowserRouter>
            <SideBar user={props.user}/>
      </BrowserRouter>
  );
};

export default Home;
