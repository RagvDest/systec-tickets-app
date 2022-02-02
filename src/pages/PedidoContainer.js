import React, { useState } from 'react';
import { Button, Dialog, Grid } from '@mui/material';
import PedidoInfo from '../components/PedidoInfo';
import { Box } from '@mui/system';
import ListaContainer from '../components/ListaContainer';
import FormTicket from '../components/FormTicket';



const PedidoContainer = (props) => {
  const [openModal,setOpenModal] = useState(false);

  const toggleModal = () =>{
    debugger;
    setOpenModal(!openModal);
  }

  return (
            <Grid container>
                <Grid item xs={12}>
                    <PedidoInfo/>
                </Grid>
                <Grid item xs={12} sx={{textAlign:'center',py:3}}>
                    <Button variant='contained' onClick={toggleModal}>Nuevo Ticket</Button>
                    <Dialog
                      open={openModal}
                      onClose={toggleModal}
                      fullWidth
                      PaperProps={{sx:{height:'100%'}}}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    ><FormTicket mode='c'/></Dialog>
                </Grid>
                <Grid item xs={12}>
                    <ListaContainer items={[1]} tipo="ti" mode="ti" />
                </Grid>
            </Grid>
  );
};

export default PedidoContainer;
