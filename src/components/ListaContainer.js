import { Divider, Grid } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import TarjetaUsuario from './TarjetaUsuario';


const ListaContainer = (props) => {
  console.log(props);
  return (
      <React.Fragment>
          <Divider/>
          <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', m:'2%', p:2}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:2}} spacing={3}>
                {props.items.map(
                    (usuario, index) =>{
                      console.log(usuario);
                        return (
                        <React.Fragment key={index}>
                        <Grid item xs={12}>
                            <TarjetaUsuario info={usuario}/>
                        </Grid>
                        </React.Fragment>
                        )
                    }
                )}
            </Grid>
          </Box>

        </React.Fragment>
  );
};

export default ListaContainer;
