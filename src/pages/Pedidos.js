import { Button, Dialog, Grid } from '@mui/material';
import React from 'react';
import Busqueda from '../components/Busqueda';
import ListaContainer from '../components/ListaContainer';

const Pedidos = () => {
  return (
    <React.Fragment > 
    <Grid container>
        <Grid item xs={12}>
          <Busqueda/>
        </Grid>
        <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
          <Button variant='contained'>Nuevo</Button>
          <Dialog
            open={false}
            onClose={()=>{}}
            fullWidth
            PaperProps={{sx:{height:'100%'}}}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >Ola</Dialog>
        </Grid>
        <Grid item xs={12}>
          <ListaContainer items={[2]} tipo='ped' />
        </Grid>
    </Grid>
  </React.Fragment>
  );
};

export default Pedidos;
