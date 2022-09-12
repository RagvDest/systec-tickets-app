import { Dialog, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { searchUsers } from '../features/actions/searchUsersActions';
import { pedidoSelect } from '../features/pedidoSlice';
import { selectUser, userSelect } from '../features/searchUsersSlice';
import Perfil from './Perfil';
import TarjetaPedido from './TarjetaPedido';
import TarjetaTicket from './TarjetaTicket';
import TarjetaUsuario from './TarjetaUsuario';


const ListaContainer = (props) => {

  const [openPerfil, setOpenPerfil] = React.useState(false);
  // const [userSelected, setUserSelected] = React.useState({});
  
  const userSelected = useSelector(selectUser)

  const dispatch = useDispatch();
  const navigate = useNavigate();
    
  const togglePerfil = (value, modo) => {
    debugger;
    dispatch(userSelect(props.items[value]))
    if(props.mode==='n'){
      setOpenPerfil(!openPerfil);
    }
    else if(modo==='pedq'){
      debugger;
      dispatch(pedidoSelect(value));
      //dispatch(setPagina('pedinfo'));
      navigate(`/pedido-info/${value.pedido['_id']}`)
    }
    else{
        props.selectUser(props.items[value]);
    }
    console.log(props.items[value]);
  };

  const closePerfil = () =>{
    setOpenPerfil(false);
    dispatch(searchUsers("",""));
  }

  const Tarjetas = (items,mode,index) =>{
    if(props.tipo==='us')
      return(<TarjetaUsuario info={items.items} key_user={items.index} togglePerfil={togglePerfil} mode={mode} />);
    else if(props.tipo==='ped')
      return(<TarjetaPedido info={items.items} togglePerfil={togglePerfil} mode="ped"/>)
    else if(props.tipo==='ti')
      return(<TarjetaTicket info={items.items} toggleTicket={props.handleTicket} key={items.index}/>)
  }

  
  return (
      <React.Fragment>
          <Divider/>
          <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', mx:'2%', p:0}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:0.7}} spacing={1}>
              {console.log(props)}
                {props.items.map(
                    (item, index) =>{
                        return (
                        <Grid item xs={12} key={index} className="list-item">
                            <Tarjetas items={item} mode={props.mode} index={index}/>
                        </Grid>
                        )
                    }
                )}
            </Grid>
          </Box>
          <Dialog
                  open={openPerfil}
                  onClose={closePerfil}
                  fullWidth
                  PaperProps={{sx:{height:'100%',maxWidth:'70vw'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Perfil user={userSelected} modo={true} closePerfil={closePerfil}/>
          </Dialog>
        </React.Fragment>
  );
};

export default ListaContainer;
