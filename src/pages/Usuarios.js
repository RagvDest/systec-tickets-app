import { Button, Divider, Grid, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BuscarUsuario from '../components/BuscarUsuario';
import ListaContainer from '../components/ListaContainer';
import {styled} from '@mui/material/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { searchUsers } from '../features/actions/searchUsersActions';
import { selectUsers } from '../features/searchUsersSlice';
import FormUsuario from '../components/FormUsuario';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));



const Usuarios = (props) => {
  const dispatch = useDispatch();
  const items = useSelector(selectUsers);

  useEffect(()=>
    dispatch(searchUsers('','')),[]
  )

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
      <React.Fragment > 
        <Grid container>
            <Grid item xs={12}>
              <BuscarUsuario/>
            </Grid>
            <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
              <Button variant='contained' onClick={handleOpen}>Nuevo</Button>
              <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              ><FormUsuario/></Modal>
            </Grid>
            <Grid item xs={12}>
              <ListaContainer items={items}/>
            </Grid>
        </Grid>
      </React.Fragment>
  );
};

export default Usuarios;
