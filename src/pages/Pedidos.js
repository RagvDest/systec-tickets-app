import { Button, Dialog, Grid } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Busqueda from '../components/Busqueda';
import FormPedido from '../components/FormPedido';
import ListaContainer from '../components/ListaContainer';
import { searchPedidos } from '../features/actions/pedidoActions';
import { selectPedidos } from '../features/pedidoSlice';


const Pedidos = (props) =>{
  const [openModal,setOpenModal] = useState(false);
  const pedidos = useSelector(selectPedidos);
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(searchPedidos("","","","",props.user))
  },[]);

  const toggleModal = ()=>{
    setOpenModal(!openModal);
  };

const closePedido = () =>{
  setOpenModal(false);
  dispatch(searchPedidos("","","","",props.user))
};


    return (
      <React.Fragment > 
      <Grid container sx={{mt:{xs:12,md:7}}}>
          <Grid item xs={12} >
            <Busqueda/>
          </Grid>
          <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
            {props.user.rol!=='Cliente' && <Fragment><Button variant='contained' onClick={toggleModal}>Nuevo</Button>
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
