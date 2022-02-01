import { Button, Dialog, Grid } from '@mui/material';
import React, { Component, useEffect, useState } from 'react';
import { connect, useDispatch, useSelector } from 'react-redux';
import Busqueda from '../components/Busqueda';
import FormPedido from '../components/FormPedido';
import ListaContainer from '../components/ListaContainer';
import { addPed, searchPedidos } from '../features/actions/pedidoActions';
import { selectPedidos } from '../features/pedidoSlice';


const Pedidos = (props) =>{
  const [openModal,setOpenModal] = useState(false);
  const pedidos = useSelector(selectPedidos);
  const dispatch = useDispatch();

  useEffect(()=>{
    debugger;
    dispatch(searchPedidos("","","","",""))
  },[]);

  const toggleModal = ()=>{
    setOpenModal(!openModal);
};
    return (
      <React.Fragment > 
      <Grid container>
          <Grid item xs={12}>
            <Busqueda/>
          </Grid>
          <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
            <Button variant='contained' onClick={toggleModal}>Nuevo</Button>
            <Dialog
              open={openModal}
              onClose={toggleModal}
              fullWidth
              PaperProps={{sx:{height:'100%'}}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            ><FormPedido mode='c'/></Dialog>
          </Grid>
          <Grid item xs={12}>
            <ListaContainer items={pedidos} tipo='ped' />
          </Grid>
      </Grid>
    </React.Fragment>
    );
};

export default Pedidos;
