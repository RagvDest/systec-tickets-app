import { Button, Dialog, Divider, Grid, Modal } from '@mui/material';
import React, { useEffect, useState } from 'react';
import BuscarUsuario from '../components/BuscarUsuario';
import ListaContainer from '../components/ListaContainer';
import {styled} from '@mui/material/styles';
import { connect, useDispatch, useSelector } from 'react-redux';
import { searchUsers, addUser } from '../features/actions/searchUsersActions';
import FormUsuario from '../components/FormUsuario';
import { actions } from 'react-redux-form';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const mapStateToProps = state => {
  return {
      user:state.user.user,
      users:state.searchUser.users
  };
};

const mapDispatchToProps = (dispatch) =>({
  addUsuario:(usuario)=> dispatch(addUser(usuario)),
  getUsers:()=>{dispatch(searchUsers("",""))},
  resetForm:() => { dispatch(actions.reset('userInfo'))}
})

class Usuarios extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
        toast:{
          open:false,
          mensaje:''
        },
        openModal:false
    }

    this.toggleModal = this.toggleModal.bind(this);
    this.props.getUsers();

  }

  toggleModal(){
    this.setState({
      openModal:!this.state.openModal
    })
  };

  render(){

    

    return (
        <React.Fragment > 
          <Grid container>
              <Grid item xs={12}>
                <BuscarUsuario/>
              </Grid>
              <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
                <Button variant='contained' onClick={this.toggleModal}>Nuevo</Button>
                <Dialog
                  open={this.state.openModal}
                  onClose={this.toggleModal}
                  fullWidth
                  PaperProps={{sx:{height:'100%'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><FormUsuario addUser={this.props.addUsuario} resetForm={this.props.resetForm} mode='c'/></Dialog>
              </Grid>
              <Grid item xs={12}>
                <ListaContainer items={this.props.users} tipo='us' />
              </Grid>
          </Grid>
        </React.Fragment>
    );
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Usuarios);
