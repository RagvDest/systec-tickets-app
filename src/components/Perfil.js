import { Button, Card, CardContent, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import EditIcon from '@mui/icons-material/Edit';

const PedidosLista = (props) => {
    return(
        <Box className='rectangle-radius' sx={{maxHeight:'200vh', overflow:'auto', m:'2%', p:2}}>
            <Grid container className='rectangle-radius' sx={{px:3, py:2}} spacing={3}>
                {props.items.map(
                    (pedido, index) =>{
                        return (
                        <React.Fragment key={index}>
                        <Grid item xs={12}>
                            {/* <TarjetaPedidos info={usuario}/> */}
                        </Grid>
                        </React.Fragment>
                        )
                    }
                )}
            </Grid>
          </Box>
    )
}

const Perfil = (props) => {
  return (
        <React.Fragment>
            <Box className="">
                <Card>
                    <CardContent>
                        <Grid container direction="column">
                            <Grid item container sx={{px:5,pt:4,pb:2, backgroundColor:'#DEF2F1'}}>
                                <Grid item xs={12} md={11}>
                                    <Typography variant='h2' component='h1'>
                                        {/*this.props.userSelected.usuario.u_usuario*/}
                                        JuanPerez
                                    </Typography>
                                    <Typography variant='caption' component='span'>
                                        Juan Perez Solorzano
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={1}>
                                    <Button color="inherit"><EditIcon/></Button>
                                </Grid>
                            </Grid>
                            <Divider/>
                            <Grid item spacing={3} container sx={{p:2}}>
                                <Grid item sx={12} md={6}>
                                    <Typography variant='h6' component='span'>Identificación: 13521651235</Typography>
                                </Grid>
                                <Grid item sx={12} md={6}>
                                    <Typography variant='h6' component='span'>Estado: ACTIVO</Typography>
                                </Grid>
                                <Grid item sx={12} md={12}>
                                    <Divider textAlign="left"><b>Contactos</b></Divider>
                                </Grid>
                                <Grid item sx={12} md={12}>
                                    <TableContainer component={Paper}>
                                        <Table aria-label="simple table">
                                            <TableBody>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        Correo
                                                    </TableCell>
                                                    <TableCell align="right">juanperez@hotmail.com</TableCell>
                                                </TableRow>
                                                <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell component="th" scope="row">
                                                        Celular
                                                    </TableCell>
                                                    <TableCell align="right">0983542165</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item sx={12}>
                                    <Divider textAlign="left"><b>Ultimos Pedidos</b></Divider>
                                </Grid>
                                <Grid item sx={12} md={12}>
                                    <PedidosLista items={[]}/>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                </Card>
            </Box>
        </React.Fragment>
  );
};

export default Perfil;
