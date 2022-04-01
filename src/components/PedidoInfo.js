import { Box, Button, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import {styled as styled1} from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectTickets } from '../features/ticketSlice';
import { fcConvert } from '../app/utils';
import EditIcon from '@mui/icons-material/Edit';
import { searchTickets } from '../features/actions/ticketActions';


const DrawerHeader = styled1('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const PedidoInfo = (props) => {
    let pedidoInfo = props.pedidoSelect;
    const tickets = useSelector(selectTickets);

    const dispatch = useDispatch();

    useEffect(()=>{
        debugger;
        dispatch(searchTickets(pedidoInfo.pedido._id))
      },[]);

  return (
      <Box sx={{px:2, pt:3}}>
          <DrawerHeader/>
          <Grid container>
              <Grid item container sx={{px:2, pt:2, backgroundColor:'#FBFBFB'}}>
                <Grid item xs={12} md={6} lg={5} container direction='column' sx={{marginBlock:'auto'}}>
                    <Grid item container>
                        <Grid item xs={3}>
                            <Typography variant='subtitle1' fontSize={18}><b>Cliente:</b></Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='subtitle1' fontSize={18}>{pedidoInfo.p_nombres}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item xs={4} sm={3}>
                            <Typography variant='subtitle1' fontSize={18}><b>Contacto:</b></Typography>
                        </Grid>
                        <Grid item xs={8} sm={9} >
                            <Typography variant='subtitle1' fontSize={18}>{pedidoInfo.p_tel==null ? "NO APLICA" : pedidoInfo.p_tel}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={6} lg={4} container direction='column' sx={{marginBlock:'auto'}}>
                    <Grid item container>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' fontSize={18}><b>Fecha Registro:</b></Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1' fontSize={18}>{fcConvert(new Date(pedidoInfo.pedido.ped_fc_registro))}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container>
                        <Grid item xs={5}>
                            <Typography variant='subtitle1' fontSize={18}><b>Fecha Fin:</b></Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography variant='subtitle1' fontSize={18}>{pedidoInfo.pedido.ped_fc_fin==null ? "NO APLICA" : fcConvert(new Date(pedidoInfo.pedido.ped_fc_registro))}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={12} lg={3} container direction='column' >
                    <Grid item container  >
                        <Grid item xs={6} sx={{mt: 0.9}}>
                            Nro. Orden: 156132
                        </Grid>
                        {props.user.rol!='Cliente' && <Grid item xs={6} >
                            <Box sx={{display:'flex',justifyContent:'center'}}>
                                <Button><EditIcon color='action' fontSize="large"/></Button>
                            </Box>
                        </Grid>}
                    </Grid>
                    <Grid item container sx={{textAlign:'center'}}>
                        <Grid item xs={3}>
                            <Typography variant='subtitle1' fontSize={18}><b>Estado:</b></Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <Typography variant='subtitle1' fontSize={18}>{pedidoInfo.pedido.ped_estado}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
              </Grid>
          </Grid>
      </Box>
  );
};

export default PedidoInfo;
