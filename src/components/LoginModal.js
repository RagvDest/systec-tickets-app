import { Box, Card, CardContent, Divider, FormControl, Input, InputLabel, Link, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import LoginIcon from '@mui/icons-material/Login';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import styled from 'styled-components'
import { useDispatch } from 'react-redux';
import { login } from '../features/userSlice';
import { logicLogin } from '../features/actions/userActions';

const Container = styled.div`
    position: absolute;
    margin-top:10vh;
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;

    width: 100%;
`

const Login = styled.button`
    backGround-color: #112D32;
    border:none;
    width: 15%;
    border-radius: 35%;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover{
        background-color: #225862;
        transform: scale(1.1);
    }
`

const LoginCode = styled.button`
    backGround-color: #112D32;
    border:none;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover{
        background-color: #225862;
        transform: scale(1.1);
    }
`

const LoginModal = () => {

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();


    const onChangeUsuario = (e) => {
        setUsuario(e.target.value);
    }

    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault(); 
        console.log(usuario)
        dispatch(logicLogin({
            username:usuario,
            password:password,
            loggedIn:true
        }))
    }

    const card = (
        <React.Fragment>
            <CardContent>
                <Box component="form" onSubmit={(e) =>{handleSubmit(e)}}>
                    <Typography variant="h5" sx={{fontWeight:'bold', p:2}}>
                        Iniciar Sesión
                    </Typography>
                    <Box sx={{my:3}}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="username">Usuario</InputLabel>
                            <Input id="username" sx={{width:250}} value={usuario} onChange={onChangeUsuario} />
                        </FormControl>
                    </Box>
                    <Box sx={{my:3}}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="pswd">Contraseña</InputLabel>
                            <Input id="pswd" type='password'  sx={{width:250}} value={password} onChange={onChangePassword} />
                        </FormControl>
                    </Box>
                    <Box sx={{flexDirection:'column', display:'flex', alignItems:'center', mb:4}}>
                        <Login>
                            <LoginIcon fontSize="large" sx={{color:'white'}}/>
                        </Login>
                        <Typography variant="caption">
                            <Link href="#" color="inherit">Olvidé mi contraseña</Link>
                        </Typography>
                    </Box>
                    <Divider/>
                </Box>
                <Box sx={{mt:3, mb:2, display:'flex', float:'right'}}>
                    <LoginCode >
                        <Typography variant="caption" component="span" sx={{color:'white', fontSize:10}}>
                        <ArrowForwardIosIcon fontSize='string'/>
                            Tengo un código de registro
                        </Typography>
                    </LoginCode>
                </Box>
            </CardContent>
        </React.Fragment>
    )

  return (
      <Container>
            <Card sx={{width:'60vh', backgroundColor:'rgb(255,255,255,0.8)'}}>
                {card}
            </Card>
      </Container>
    
  );
};

export default LoginModal;
