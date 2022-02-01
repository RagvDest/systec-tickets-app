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

const IconContainer = styled.div`
    margin-block:auto;
`

const TarjetaPedido = (props) => {
    let fcRegistro = new Date(props.info.pedido.ped_fc_registro);

    const fcConvert = (fc) =>{
        if(fc.getMonth()<9)
            return (fc.getDate()+"/"+"0"+parseInt(fc.getMonth())+1+"/"+fc.getFullYear())
        else
            return (fc.getDate()+"/"+fc.getMonth()+1+"/"+fc.getFullYear())
    }
  return (
        <Button sx={{width:'100%'}} onClick={()=>{props.togglePerfil(props.key_user)}} >
        <Card sx={{width:'100%'}} >
            <CardContent >
                <Grid container>
                    <Grid item xs={12} md={3} sx={{textAlign:'center',borderRight:'1px solid black',p:2.2, backgroundColor:'green', marginBlock:'auto'}} >
                        <Typography className='sombreado-blanco'   variant="body1" component="h1" sx={{ flexGrow: 1, mx:2}}>
                            {console.log(props)}
                            <b>{props.info.pedido.ped_estado}</b>
                        </Typography>
                        
                    </Grid>
                    <Grid item container xs={12} md={9} sx={{textAlign:'left'}} spacing={1}>
                        <Grid item xs={12} md={5} container direction="column" spacing={2} sx={{alignContent:'center'}}>
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
                        <Grid item container direction='column' xs={12} md={5} sx={{textAlign:'left',alignContent:'center'}}>
                                <Grid item xs sx={{display:'flex'}}>
                                    <DateRangeIcon className='icon-center-vertically' fontSize='medium' />
                                    <Typography variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto', wordBreak:'break-word'}}>
                                        {fcConvert(fcRegistro)}
                                    </Typography>
                                </Grid>
                                <Grid item xs sx={{display:'flex'}}>
                                    <SportsScore className='icon-center-vertically' fontSize='medium'/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {props.info.pedido.ped_fc_fin}
                                    </Typography>
                                </Grid>
                        </Grid>
                        <Grid item container xs={12} md={2} sx={{textAlign:'center',borderLeft:'1px solid'}} direction='column'>
                            <Grid item xs>
                                # Tickets
                            </Grid>
                            <Grid item xs>
                                2
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
