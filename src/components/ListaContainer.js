import { Dialog, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPagina } from '../features/pagSlice';
import { pedidoSelect } from '../features/pedidoSlice';
import Perfil from './Perfil';
import TarjetaPedido from './TarjetaPedido';
import TarjetaTicket from './TarjetaTicket';
import TarjetaUsuario from './TarjetaUsuario';


const ListaContainer = (props) => {

  const [openPerfil, setOpenPerfil] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState({});
  const dispatch = useDispatch();
    
  const togglePerfil = (value, modo) => {
    debugger;
    setUserSelected(props.items[value]);
    if(props.mode==='n')
      setOpenPerfil(!openPerfil);
    else if(modo==='pedq'){
      debugger;
      dispatch(pedidoSelect(value));
      dispatch(setPagina('pedinfo'));
    }
    else{
        props.selectUser(props.items[value]);
    }
    console.log(props.items[value]);
  };

  const closePerfil = () =>{
    setOpenPerfil(false);
  }

  const Tarjetas = (items,mode) =>{
    if(props.tipo==='us')
      return(<TarjetaUsuario info={items.items} key_user={items.index} togglePerfil={togglePerfil} mode={mode}/>);
    else if(props.tipo==='ped')
      return(<TarjetaPedido info={items.items} togglePerfil={togglePerfil} mode="ped"/>)
    else if(props.tipo==='ti')
      return(<TarjetaTicket info={items.items} toggleTicket={props.handleTicket} key={items.index}/>)
  }

  
  return (
      <React.Fragment>
          <Divider/>
          <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', m:'2%', p:2}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:2}} spacing={3}>
              {console.log(props)}
                {props.items.map(
                    (item, index) =>{
                        return (
                        <Grid item xs={12} key={index}>
                            <Tarjetas items={item} index={index} mode={props.mode}/>
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
                  <Perfil user={userSelected}/>
          </Dialog>
        </React.Fragment>
  );
};

export default ListaContainer;
