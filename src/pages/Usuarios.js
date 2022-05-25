import { Button, Container, Dialog, Grid} from '@mui/material';
import React from 'react';
import BuscarUsuario from '../components/BuscarUsuario';
import ListaContainer from '../components/ListaContainer';
import { connect } from 'react-redux';
import { searchUsers, addUser } from '../features/actions/searchUsersActions';
import FormUsuario from '../components/FormUsuario';
import { actions } from 'react-redux-form';

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

  handleNotificacion = () =>{
    debugger;
    this.props.socket.emit('notificacion','61ee40368094d681eb1f6fdc');
  }

  render(){

    

    return (
        <Container > 
          <Grid container>
              <Grid item xs={12}>
                <BuscarUsuario mode={this.props.mode}/>
                <Button onClick={this.handleNotificacion}>Notificacion</Button>
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
                ><FormUsuario addUser={this.props.addUsuario} closeModal={this.toggleModal} resetForm={this.props.resetForm} mode='c'/></Dialog>
              </Grid>
              <Grid item xs={12}>
                <ListaContainer items={this.props.users} tipo='us' mode={this.props.mode==='q' ? 'q' : 'n'} selectUser={this.props.selectUser}/>
              </Grid>
          </Grid>
        </Container>
    );
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(Usuarios);
