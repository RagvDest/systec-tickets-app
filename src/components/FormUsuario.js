import { Button, Card, CardActions, CardContent, CardHeader, Divider, Grid, InputLabel, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';

const FormUsuario = () => {

    const [newUser,setNewUser] = useState({
        u_username:"",
        u_mail:""
    });
    const [newPerson,setNewPerson] = useState({
        p_nombres:"",
        p_apellidos:"",
        p_cedula:""
    });

    const [rol,setRol] = useState("");


    const handleUserChange = (e) => {
        setNewUser(prevValues => ({
            ...prevValues,
            [e.target.name]:e.target.value
        }));
    }

    const handlePersonChange = (e) => {
        setNewPerson(prevValues => ({
            ...prevValues,
            [e.target.name]:e.target.value
        }));
    }

    const handleSubmit = (e) =>{
        let info = {
            usuario:newUser,
            persona:newPerson
        };
        console.log(info);
    }

  return (
      <React.Fragment>
          <Box className="modal-simple">
          <Card>
              <CardHeader title="Crear Usuario" subheader="Formulario para crear usuario" sx={{p:3, px:4, borderBottom:'1px solid',position:'sticky'}}/>
              <CardContent>
                  <Grid container direction="column" spacing={2} sx={{px:3,py:1}}>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{py:1}}htmlFor='username'>Usuario</InputLabel>
                                <TextField  sx={{width:'100%'}} id='username' name="u_username" value={newUser.u_username} onChange={handleUserChange}/>
                            </Grid>
                            <Grid item xs={0} md={6}/>
                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{py:1}}htmlFor='nombres'>Nombres</InputLabel>
                                <TextField sx={{width:'100%'}} id='nombres' name="p_nombres" value={newPerson.p_nombres} onChange={handlePersonChange}/>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{py:1}}htmlFor='apellidos'>Apellidos</InputLabel>
                                <TextField  sx={{width:'100%'}} id='apellidos' name="p_apellidos" value={newPerson.p_apellidos} onChange={handlePersonChange}/>
                            </Grid>
                            <Grid item xs={12}><Divider/></Grid>
                        </Grid>
                        <Grid item container spacing={3}>
                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{py:1}}htmlFor='cedula'>Cedula</InputLabel>
                                <TextField  sx={{width:'100%'}} id='cedula' name="p_cedula" value={newPerson.u_username} onChange={handlePersonChange} helperText="Ingrese el número de identificación"/>
                            </Grid>
                            <Grid item xs={0} md={6}/>
                            <Grid item xs={12} md={12}>
                                <Divider textAlign="left">Contacto</Divider>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InputLabel sx={{py:1}}htmlFor='mail'>Correo</InputLabel>
                                <TextField  sx={{width:'100%'}} id='mail' name="u_mail" value={newUser.p_apellidos} onChange={handleUserChange}/>
                            </Grid>
                        </Grid>
                  </Grid>
              </CardContent>
              <CardActions sx={{justifyContent:'right',px:4, pb:3}}>
                <Button size="middle" variant='contained' onClick={handleSubmit}>
                      Guardar
                </Button>
              </CardActions>
          </Card>
          </Box>
      </React.Fragment>
  )
};

export default FormUsuario;
