import { Button, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Box, fontSize } from '@mui/system';
import React from 'react';
import { styled } from '@mui/material/styles';

const BoxData = styled('div')(({theme})=>({
  [theme.breakpoints.up('xs')]:{
    paddingTop:'0.5em',
    paddingBottom:'0.5em',
    paddingLeft:'3vw',
    overflowWrap:'anywhere'
  },
}))

const TarjetaTicket = (props) => {
  return (
    <React.Fragment>
      <Button sx={{width:'100%'}} onClick={()=>{props.toggleTicket(props.info)}} key={props.key}>
        <Box sx={{width:'100%',p:1,boxShadow:'0px 2px 1px -1px rgb(0 0 0 / 20%), 0px 1px 1px 0px rgb(0 0 0 / 14%), 0px 1px 3px 0px rgb(0 0 0 / 12%)'}}>
        <Grid container sx={{width:'100%'}} spacing={1}>
          <Grid item container sm={12} md={5} spacing={1}>
            <Grid item xs={12} sm={6}>
              <Card sx={{backgroundColor:'yellow', boxShadow:'none',border:'1px solid #2B7A72'}}>
                  <Box sx={{fontSize:16,p:2.4}}>
                    DIAGNOSTICO
                  </Box>
                  
              </Card>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Card sx={{backgroundColor:'#DEF2F1', boxShadow:'none',border:'1px solid #2B7A72'}}>
                <Box sx={{fontSize:16,p:0.60}}>
                  # TICKET<br/> {props.info.t_num}
                </Box>
              </Card>
            </Grid>
          </Grid>
          <Grid item sm={12} md={7}>
            <Card sx={{backgroundColor:'#DEF2F1', boxShadow:'none',border:'1px solid #2B7A72'}}>
              <Grid container>
                <Grid item xs={6} sx={{width:'100%'}}>
                    <BoxData sx={{textAlign:'initial',display:'flex'}}>
                      Equipo:<br/> {props.info.t_tipo_equipo}
                    </BoxData>
                </Grid>
                <Grid item xs={6} sx={{width:'100%',borderLeft:'1px solid black'}}>
                    <BoxData sx={{textAlign:'initial'}}>
                      {props.info.t_detalle.substring(0,50)}...
                    </BoxData>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
        </Box>
          
      </Button>
      </React.Fragment>
  );
};

export default TarjetaTicket;
