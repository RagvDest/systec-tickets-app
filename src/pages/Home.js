import React from 'react';
import { useDispatch } from 'react-redux';
import Panel from '../components/Panel';
import SideBar from '../components/SideBar';
import { logicLogout } from '../features/actions/userActions';
import {Routes, Route, useRoutes, BrowserRouter} from "react-router-dom";
import BuscarUsuario from '../components/BuscarUsuario';
import Usuarios from './Usuarios';

const Home = (props) => {
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    dispatch(logicLogout());
  }

  
  return (
        <SideBar user={props.user}/>
  );
};

export default Home;
