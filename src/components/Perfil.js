import { Button, Card, CardContent, Dialog, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import FormUsuario from './FormUsuario';
import { connect } from 'react-redux';
import { actions } from 'react-redux-form';
import { updateUser } from '../features/actions/searchUsersActions';
import { MapsHomeWork } from '@mui/icons-material';

const mapStateToProps = state => {
    return {
        users:state.searchUser.users
    };
  };

const mapDispatchToProps = (dispatch) =>({
    updateUsuario:(usuario)=> dispatch(updateUser(usuario)),
    resetForm:() => { dispatch(actions.reset('userInfo'))}
})

const PedidosLista = (props) => {


    return(
        <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', m:'2%', p:2}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:2}} spacing={3}>
                {props.items.map(
                    (pedido, index) =>{
                        return (
                        <React.Fragment key={index}>
                        <Grid item xs={12}>
                            {/* <TarjetaPedidos info={usuario}/> */}
                        </Grid>
                        </React.Fragment>
                        )
                    }
                )}
            </Grid>
          </Box>
    )
}

const Perfil = (props) => {
    const [openModal,setOpenModal] = useState(false);


    const toggleUpdate = () =>{
        setOpenModal(!openModal);
    }
    const closeForm = () =>{
        setOpenModal(false);
        window.location.reload(true);
    }
    
  return (
        <React.Fragment>
            <Box className="">
                <Card>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid item container sx={{px:5,pt:4,pb:2, backgroundColor:'#DEF2F1'}}>
                                <Grid item xs={12} md={11}>
                                    <Typography variant='h2' component='h1'>
                                        {props.user.username.u_usuario}
                                    </Typography>
                                    <Typography variant='caption' component='span'>
                                        {props.user.persona.p_nombres} {props.user.persona.p_apellidos}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <Button color="inherit" onClick={toggleUpdate}><EditIcon/></Button>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Grid item spacing={3} container sx={{p:2}}>
                                <Grid item xs={12} md={6} sx={{width:'100%'}}>
                                    <Typography variant='h6' component='span'>Identificación: {props.user.persona.p_cedula}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{width:'100%'}}>
                                    <Typography variant='h6' component='span'>Estado: {props.user.username.u_activo ? 'ACTIVO' : 'INACTIVO'}</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} sx={{width:'100%'}}>
                                    <Divider textAlign="left"><b>Contactos</b></Divider>
                                </Grid>
                                <Grid item xs={12} md={12} sx={{width:'100%'}}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        Correo
                                                    </TableCell>
                                                    <TableCell align="right">{props.user.username.u_mail}</TableCell>
                                                </TableRow>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        Celular
                                                    </TableCell>
                                                    <TableCell align="right">{props.user.persona.p_tel == undefined ? 'No Aplica' : props.user.persona.p_tel}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider textAlign="left"><b>Ultimos Pedidos</b></Divider>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <PedidosLista items={[]}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                </Card>
            </Box>
            <Dialog
                  open={openModal}
                  onClose={toggleUpdate}
                  fullWidth
                  PaperProps={{sx:{height:'100%'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><FormUsuario   resetForm={props.resetForm} mode='u' 
                                updateUser={props.updateUsuario} userSelected={props.user}
                                closeForm={closeForm} /></Dialog>
        </React.Fragment>
  );
};

export default connect(mapStateToProps,mapDispatchToProps)(Perfil);
