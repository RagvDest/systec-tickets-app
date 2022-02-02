import { Button, Card, CardActions, CardContent, CardHeader, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { equipos } from '../app/utils';
import TextField from '@mui/material/TextField';


const FormTicket = (props) => {
    const dispatch = useDispatch();
    const [equipo,setEquipo] = useState("pc");


    const changeEquipo = (e) =>{
        setEquipo(e.target.value);
    }

    const onSubmit = () =>{
        if(!validar())
            console.log("Error validacion");
        else{
            dispatch();
        }
    }

    const validar = () =>{
        debugger;
        let valido=true;
    
        return valido;
    }
  return (
      <React.Fragment>
          <Card>
                <CardHeader title={props.mode==='u' ? 'Ticket: ': 'Ticket: ###-###-###'} sx={{p:3, px:4, borderBottom:'1px solid',position:'sticky'}}/>
                <CardContent sx={{p:3}}>
                    <Grid container spacing={3}>
                        <Grid item container xs={12} sx={{}}>
                            <Grid item xs={3}>
                                <Typography variant='subtitle1' fontSize={16} marginY='auto'><b>Cliente:</b></Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant='subtitle1' fontSize={16} marginY='auto'>JOSE GARCIA</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{display:'flex'}}>
                            <Grid item xs={3} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Equipo:</b></Typography>
                            </Grid>
                            <Grid item xs={7} sx={{marginBlock:'auto'}}>
                                <Select 
                                    value={equipo}
                                    onChange={changeEquipo}
                                    displayEmpty
                                    label=" "
                                    sx={{ width: '100%' }}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {equipos.map((it)=>{
                                            return (<MenuItem value={it.id}>{it.eq_nombre}</MenuItem>)
                                        })}
                                    </Select>
                            </Grid> 
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{textAlign:'center'}}>
                            <Grid item xs={12} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Detalle:</b></Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBlock:'auto',px:3}}>
                                <TextField
                                    id="outlined-multiline-static"
                                    label=""
                                    multiline
                                    rows={4}
                                    defaultValue=""
                                    sx={{width:'100%'}}
                                    />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{textAlign:'center'}}>
                            <Grid item xs={3} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Total a pagar:</b></Typography>
                            </Grid>
                            <Grid item xs={7} sx={{marginBlock:'auto',px:3}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'>Calculado</Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{justifyContent:'right',px:4, pb:3}}>
                        <Button size="middle" variant='contained' type='button' onClick={onSubmit}>
                            Guardar
                        </Button>
                </CardActions>
            </Card>
      </React.Fragment>
  );
};

export default FormTicket;
