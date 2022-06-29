import { Button, Card, CardActions, CardContent, CardHeader, Dialog, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import NumbersIcon from '@mui/icons-material/Numbers';
import DateRangeIcon from '@mui/icons-material/DateRange';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import styled from 'styled-components'
import { Box } from '@mui/system';
import { DateRangeOutlined, SportsScore } from '@mui/icons-material';
import { fcConvert } from '../app/utils';

const IconContainer = styled.div`
    margin-block:auto;
`

const TarjetaPedido = (props) => {
    let fcRegistro = new Date(props.info.pedido.ped_fc_registro);
    let fcFin = new Date(props.info.pedido.ped_fc_fin);
    
    const GridEstado = () =>{
        let value=props.info.pedido.ped_estado;
        let colorEstado = 'inherent';
        if(value=="ABIERTO")
            colorEstado = '#8FCCF9'
        if(value=='CERRADO')
            colorEstado = '#E0e0e0'
        value=<b>{value}</b>;

        return(
            <Grid item xs={12} md={3} sx={{textAlign:'center',p:2.2, backgroundColor:colorEstado, marginBlock:'auto'}} >
                <Typography className='sombreado-blanco'   variant="body1" component="h1" sx={{ flexGrow: 1, mx:2}}>
                    {value}
                </Typography>
            </Grid>
        )
    }
  return (
        <Button sx={{width:'100%'}} onClick={()=>{props.togglePerfil(props.info,"pedq")}} >
        <Card sx={{width:'100%'}} >
            <CardContent >
                <Grid container>
                    <GridEstado/>
                    <Grid xs={0} md={1} sx={{borderLeft:'1px solid black'}}/>
                    <Grid item container xs={12} md={8} sx={{textAlign:'left'}} spacing={1}>
                        <Grid item container direction='column' xs={12} md={6} sx={{textAlign:'left'}}>
                                <Grid item xs sx={{display:'flex'}}>
                                    <StarOutlineIcon className='icon-center-vertically' fontSize='medium'/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {props.info.p_nombres}
                                    </Typography>
                                </Grid>
                                <Grid item xs sx={{display:'flex'}} >
                                    <NumbersIcon className='icon-center-vertically' fontSize='medium' sx={{marginBlock:'auto'}}/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {props.info.p_cedula}
                                    </Typography>
                                </Grid>
                        </Grid>
                        <Grid item container direction='column' xs={12} md={6} sx={{textAlign:'left',alignContent:'center'}}>
                                <Grid item xs sx={{display:'flex'}}>
                                    <DateRangeIcon className='icon-center-vertically' fontSize='medium' />
                                    <Typography variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto', wordBreak:'break-word'}}>
                                        {fcConvert(fcRegistro)}
                                    </Typography>
                                </Grid>
                                <Grid item xs sx={{display:'flex'}}>
                                    <SportsScore className='icon-center-vertically' fontSize='medium'/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {props.info.pedido.ped_fc_fin == null ? "NO APLICA" : fcConvert(fcFin)}
                                    </Typography>
                                </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    </Button>
  );
};

export default TarjetaPedido;
