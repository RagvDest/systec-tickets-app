import React, { useEffect, useState } from 'react';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import styled from 'styled-components'
import ImageBg from '../static/img/loginbg.png';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { selectPag } from '../features/pagSlice';
import ChooseLogin from '../components/Login/ChooseLogin';
import LoginCliente from '../components/Login/LoginCliente';
import { textAlign } from '@mui/system';
import { Alert, AlertTitle, Box, Grid, Snackbar } from '@mui/material';
import {Routes, Route} from "react-router-dom";
import { selectApp, setTrigger } from '../features/appSlice';
import PasswordModal from '../components/Login/PasswordModal';


const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
`

const ImgContainer = styled.div`
    flex: 1;
    height: 100%;
    display: flex;
    justify-content: center;
`
const Image = styled.img`
    width: 100%;
    object-fit: fill;
`

const LogIn = () => {
    

  return (
      <Container>
          <ImgContainer>
                <Image src={ImageBg}/>
          </ImgContainer>
                <Header sx={{zIndex:1}}/>
                <Routes>
                    <Route path='*' element={<ChooseLogin/>}/>
                    <Route path='/login-cli' element={<LoginCliente/>}/>
                    <Route path='/login-emp' element={<LoginModal/>}/>
                </Routes>
              <Footer/>
         
      </Container>    
  );
};

export default LogIn;
