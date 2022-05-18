import { Construction, Person } from '@mui/icons-material'
import { Button, Card, CardContent, Divider, FormControl, Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: absolute;
    margin-top:2vh;
    display: flex;
    height: 80vh;
    justify-content: center;
    align-items: center;

    width: 100%;
`
const ChooseLogin = () => {
  return (
    <Container>
                <Card sx={{maxWidth:'80vw'}} >
                    <CardContent sx={{textAlign:'center', position:'relative'}} >
                        <Grid container >
                            <Grid item container xs={12} md={12} spacing={4}>
                                <Grid item xs={12} md={0}>
                                    <Typography variant="h5" sx={{fontWeight:'bold', p:1}}><i>Iniciar Sesión</i></Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to='/login-cli'>
                                        <Button size='large' sx={{width:'90%'}} variant='contained' startIcon={<Person/>}>Iniciar como cliente</Button>
                                    </Link>
                                    
                                </Grid>
                                <Grid item xs={12}>
                                    <Link to='/login-emp'>
                                    <Button size='large'  sx={{width:'90%'}} variant='outlined' startIcon={<Construction/>}>Iniciar como empleado</Button>
                                    </Link>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
    </Container>
  )
}

export default ChooseLogin