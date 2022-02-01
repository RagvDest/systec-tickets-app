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
    setUserSelected(props.items[value]);
    if(props.mode==='n')
      setOpenPerfil(!openPerfil);
    else{
        props.selectUser(props.items[value]);
    }
    console.log(props.items[value]);
  };

  const closePerfil = () =>{
    setOpenPerfil(false);
  }

  const Tarjetas = (items,mode) =>{
    debugger;
    if(props.tipo==='us')
      return(<TarjetaUsuario info={items.items} key_user={items.index} togglePerfil={togglePerfil} mode={mode}/>);
    else if(props.tipo==='ped')
      return(<TarjetaPedido info={items.items}/>)
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
