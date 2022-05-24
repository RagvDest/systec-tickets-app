import { Button, Card, CardActions, CardContent, CardHeader, Dialog, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import NumbersIcon from '@mui/icons-material/Numbers';
import MailIcon from '@mui/icons-material/Mail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import styled from 'styled-components'

const IconContainer = styled.div`
    margin-block:auto;
`


const TarjetaUsuario = (props) => {
  return (
      <Button sx={{width:'100%'}} onClick={()=>{props.togglePerfil(props.key_user)}} >
        <Card sx={{width:'100%'}} >
            <CardContent >
                <Grid container>
                    <Grid item xs={12} md={3} sx={{textAlign:'center', marginBlock:'auto'}} >
                        <AccountCircleIcon fontSize='large'/>
                        <Typography   variant="body1" component="h1" sx={{ flexGrow: 1, mx:2}}>
                            {props.info.username.u_usuario}
                        </Typography>
                    </Grid>
                    <Grid item container xs={12} md={9} sx={{textAlign:'left'}} spacing={1}>
                        <Grid item xs={12} md={6} container direction="column"  spacing={2} sx={{}}>
                                <Grid item xs sx={{display:'flex'}}>
                                    <StarOutlineIcon className='icon-center-vertically' fontSize='medium'/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {props.info.persona.p_nombres+' '+props.info.persona.p_apellidos}
                                    </Typography>
                                </Grid>
                                <Grid item xs sx={{display:'flex'}} >
                                    <NumbersIcon className='icon-center-vertically' fontSize='medium' sx={{marginBlock:'auto'}}/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {props.info.persona.p_cedula}
                                    </Typography>
                                </Grid>
                        </Grid>
                    <Grid item container xs={12} md={6} sx={{textAlign:'left'}}>
                        <Grid item xs container direction="column" spacing={2} sx={{}}>
                                <Grid item xs sx={{display:'flex'}}>
                                    <MailIcon className='icon-center-vertically' fontSize='medium' />
                                    <Typography variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto', wordBreak:'break-word'}}>
                                        {props.info.username.u_mail}
                                    </Typography>
                                </Grid>
                                <Grid item xs sx={{display:'flex'}}>
                                    <LocalPhoneIcon className='icon-center-vertically' fontSize='medium'/>
                                    <Typography   variant="body1" component="span" sx={{ flexGrow: 1, mx:2, marginBlock:'auto'}}>
                                        {
                                         props.info.persona.p_tel == undefined ? 'No aplica' : props.info.persona.p_tel}
                                    </Typography>
                                </Grid>
                        </Grid>
                    </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
        </Button>
  );
};

export default TarjetaUsuario;