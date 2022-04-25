import { Button, Dialog, Grid } from '@mui/material';
import React, { Component, Fragment, useEffect, useState } from 'react';
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

  const [mensaje,setMensaje] = useState([]);
  const [tipoAlert,setTipoAlert] = useState("info");
  const [open,setOpen] =useState(false);


  useEffect(()=>{
    debugger;
    dispatch(searchPedidos("","","","",props.user))
  },[]);

  const toggleModal = ()=>{
    setOpenModal(!openModal);
  };

const closePedido = () =>{
  setOpenModal(false);
  dispatch(searchPedidos("","","","",props.user))
  //toast();
};

const toast = async () =>{
    setOpen(true);
  console.log(mensaje);
}

    return (
      <React.Fragment > 
        
      <Grid container>
          <Grid item xs={12}>
            <Busqueda/>
          </Grid>
          <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
            {props.user.rol!='Cliente' && <Fragment><Button variant='contained' onClick={toggleModal}>Nuevo</Button>
            <Dialog
              open={openModal}
              onClose={toggleModal}
              fullWidth
              PaperProps={{sx:{}}}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            ><FormPedido mode='c' closePedido={closePedido}/></Dialog></Fragment>}
          </Grid>
          <Grid item xs={12}>
            <ListaContainer items={pedidos} tipo='ped' mode="ped"/>
          </Grid>
      </Grid>
    </React.Fragment>
    );
};

export default Pedidos;
