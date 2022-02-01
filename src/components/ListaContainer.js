import { Dialog, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Perfil from './Perfil';
import TarjetaPedido from './TarjetaPedido';
import TarjetaUsuario from './TarjetaUsuario';


const ListaContainer = (props) => {

  const [openPerfil, setOpenPerfil] = React.useState(false);
  const [userSelected, setUserSelected] = React.useState({});
    
  const togglePerfil = (value) => {
    debugger;
    setUserSelected(props.items[value]);
    setOpenPerfil(!openPerfil);
    console.log(props.items[value]);
  };

  const closePerfil = () =>{
    setOpenPerfil(false);
  }

  const Tarjetas = (item,index) =>{
    debugger;
    if(props.tipo==='us')
      return(<TarjetaUsuario info={item.item} key_user={index} togglePerfil={togglePerfil}/>);
    else if(props.tipo==='ped')
      return(<TarjetaPedido/>)
  }

  
  return (
      <React.Fragment>
          <Divider/>
          <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', m:'2%', p:2}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:2}} spacing={3}>
                {props.items.map(
                    (item, index) =>{
                      console.log(index);
                        return (
                        <Grid item xs={12} key={index}>
                            <Tarjetas item={item} index={index}/>
                            
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
