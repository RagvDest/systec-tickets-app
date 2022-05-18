import { Card, CardContent, CardHeader, Divider, FormControl, Grid, Input, InputLabel, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React, { useState } from 'react'
import styled from 'styled-components'
import LoginIcon from '@mui/icons-material/Login';
import { useDispatch } from 'react-redux';
import { logicLogCli } from '../../features/actions/userActions';


const Image = styled.img`
    width: 100%;
    object-fit: fill;
`

const Container = styled.div`
    position: absolute;
    margin-top:2vh;
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;

    width: 100%;
`

const Login = styled.button`
    backGround-color: #112D32;
    border:none;
    width: 20%;
    border-radius: 35%;
    cursor: pointer;
    margin-bottom: 15px;

    &:hover{
        background-color: #225862;
        transform: scale(1.1);
    }
`

const LoginCliente = (props) => {
  const [identificacion,setIdentificacion] = useState("");
  const [orden,setOrden] = useState("");
  const dispatch = useDispatch();

  const handleSubmit = async (e) =>{
    debugger;
    e.preventDefault();
    await dispatch(logicLogCli(identificacion,orden));
  };
  const onChangeOrden = (e) =>{
    setOrden(e.target.value);
  };
  const onChangeIdentificacion = (e) =>{
    setIdentificacion(e.target.value);
  }
  return (
    <React.Fragment>
      <Container>
        <Card>
          <CardContent sx={{textAlign:'center',p:3,px:6}}>
                <Box component="form" onSubmit={(e) =>{handleSubmit(e)}}>
                    <Typography variant="h5" sx={{fontWeight:'bold', p:2}}>
                        Iniciar Sesión
                    </Typography>
                    <Box sx={{my:3}}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="identificacion">Identificación</InputLabel>
                            <Input id="identificacion" sx={{width:250}} value={identificacion} onChange={onChangeIdentificacion} />
                        </FormControl>
                    </Box>
                    <Box sx={{my:3}}>
                        <FormControl variant="standard">
                            <InputLabel htmlFor="orden">Nro. Orden</InputLabel>
                            <Input id="orden" sx={{width:250}} value={orden} onChange={onChangeOrden} />
                        </FormControl>
                    </Box>
                    <Box sx={{flexDirection:'column', display:'flex', alignItems:'center', mb:4}}>
                        <Login>
                            <LoginIcon fontSize="large" sx={{color:'white'}}/>
                        </Login>
                    </Box>
                    <Divider/>
                </Box>
          </CardContent>
        </Card>
      </Container>
    </React.Fragment>
  )
}

export default LoginCliente