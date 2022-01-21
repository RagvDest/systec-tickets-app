import { Box, Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SideBar from '../components/SideBar';
import { logicLogout } from '../features/actions/userActions';

const Home = (props) => {
  const dispatch = useDispatch();
  const handleLogOut = (e) => {
    dispatch(logicLogout());
  }
  return (
        <React.Fragment>
            <SideBar user={props.user}/>
              <Button color="primary" onClick={(e)=>handleLogOut(e)}>LogOut</Button>
        </React.Fragment>
  );
};

export default Home;
