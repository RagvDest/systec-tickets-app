import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Card, CardContent, CardHeader, Divider, FormControl, Input, InputLabel, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useParams } from 'react-router';
import ImageBg from '../../static/img/loginbg.png';
import Footer from '../Footer';
import InputsPass from './InputsPass';
import RecoverPass from './RecoverPass';

const Container = styled.div`
        position: absolute;
        margin-top:2vh;
        display: flex;
        height: 80vh;
        justify-content: center;
        align-items: center;

        width: 100%;
        `
    const ContainerD = styled.div`
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

const PasswordModal = (props) => {

  return (
    <ContainerD>
          <ImgContainer>
                <Image src={ImageBg}/>
          </ImgContainer>
        <Container>
                <Card sx={{maxWidth:'30rem'}}>
                <CardContent sx={{textAlign:'center',p:3,px:6}}>
                  {props.mode==='c' && <InputsPass mode={props.mode}/>}
                  {props.mode==='u' && <RecoverPass mode={props.mode}/>}
                </CardContent>
                </Card>
                </Container>
              <Footer/>
    </ContainerD>
  )
}

export default PasswordModal