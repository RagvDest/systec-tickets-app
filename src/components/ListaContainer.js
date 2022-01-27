import { Dialog, Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Perfil from './Perfil';
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

  
  return (
      <React.Fragment>
          <Divider/>
          <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', m:'2%', p:2}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:2}} spacing={3}>
                {props.items.map(
                    (usuario, index) =>{
                      console.log(index);
                        return (
                        <Grid item xs={12} key={index}>
                            <TarjetaUsuario info={usuario} key_user={index} togglePerfil={togglePerfil}/>
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
                ><Perfil user={userSelected}/></Dialog>
        </React.Fragment>
  );
};

export default ListaContainer;
