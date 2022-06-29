import { Alert, AlertTitle, Box, Button, Card, CardActions, CardContent, CardHeader, Divider, FormControl, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { selectUser } from '../../features/userSlice';
import { estadosTickets } from '../../app/utils';
import { crearAvance } from '../../features/actions/ticketActions';
import Comentarios from './Comentarios';
import { selectHistorial } from '../../features/ticketSlice';
import { SettingsPowerRounded } from '@mui/icons-material';

const FormAvance = (props) => {
    const userLogin = useSelector(selectUser);
    const [tecnico,setTecnico] = useState("");
    const [estado,setEstado] = useState("");
    const [msj, setMsj] = useState([]);
    const [open, setOpen] = useState(false);
    const [tipoAlert, setTipoAlert] = useState("info");
    const [observacion, setObservacion] = useState("");
    const dispatch = useDispatch();
    const historial = useSelector(selectHistorial);
    
    useEffect(()=>{
    },[historial]);


    useEffect(()=>{
        if(props.mode=='q'){
            setTecnico(props.info.e_usuario);
            setEstado(props.info.e_nombre);
            setObservacion(props.info.e_detalle);
        }else{
            setTecnico(userLogin.persona.p_nombres+" "+userLogin.persona.p_apellidos);
        }
    },[])

    const changeEstado = (e) =>{
        setEstado(e.target.value);
    }
    const changeObservacion = (e) =>{
        setObservacion(e.target.value);
    }

    const onSubmit = async (e) =>{
        if(!validar()){
            setOpen(false);
            setTipoAlert("error");
            setOpen(true);
        }else{
            await dispatch(crearAvance({estado:estado,detalle:observacion,usuario:userLogin,ticket:props.ticket['_id']}));
            props.closeAvance();
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpen(false);
      };

    const validar = () => {
        let mensaje=[];
        let valido = true;
        if(estado == ""){
            mensaje.push("Seleccionar Estado");
            valido = false;
        }
        if(observacion == ""){
            mensaje.push("Ingresar detalle del avance");
            valido = false;
        }

        setMsj(mensaje);
        return valido;
    }

    const ComentariosContainer = () =>{
        if(tecnico==='Sistema')
            return (<React.Fragment/>);
        if(props.mode=='q')
            return (<Comentarios/>)
        return (<React.Fragment/>)
    }


  return (
        <React.Fragment >
            <Snackbar open={open} 
                        autoHideDuration={6000} 
                        onClose={handleClose}
                        anchorOrigin={{vertical: "top",
                        horizontal: "right"}}>
                <Alert onClose={handleClose} severity={tipoAlert} sx={{ width: '100%' }}>
                {msj.map((item,index)=>{
                    return(
                        <AlertTitle key={index}>{item}</AlertTitle>
                    )
                })}            
                </Alert>
            </Snackbar>
            <Card sx={{overflow:'auto'}}>
            <CardHeader title='Avance' sx={{p:2, px:3, borderBottom:'1px solid',position:'sticky'}}/>
            <CardContent sx={{p:3}}>
                <Grid container spacing={3}>
                    <Grid item container xs={12} sx={{}}>
                        <Grid item xs={12} sm={3}>
                            <Typography variant='subtitle1' fontSize={16} marginY='auto'><b>Técnico:</b></Typography>
                        </Grid>
                        <Grid item xs={12} sm={9}>
                            <Typography variant='subtitle1' fontSize={16} marginY='auto'>{tecnico}</Typography>
                        </Grid>
                    </Grid>
                    <Grid item container xs={12} md={12} sx={{display:'flex'}}>
                        <Grid item xs={12} sm={3} sx={{marginBlock:'auto'}}>
                            <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Estado:</b></Typography>
                        </Grid>
                        <Grid item xs={12} sm={9} sx={{marginBlock:'auto'}}>
                            <Select 
                                value={estado}
                                onChange={changeEstado}
                                displayEmpty
                                label=" "
                                variant='standard'
                                sx={{ width: '100%' }}
                                inputProps={{ 'aria-label': 'Without label',readOnly:props.mode=='c' ? false:true }}
                                >
                                    {estadosTickets.map((it)=>{
                                        if(props.ticket.t_estado!='CERRADO'){
                                            if(props.mode==='q' && it.est_nombre===estado)
                                                return (<MenuItem value={it.est_nombre} selected>{it.est_nombre}</MenuItem>)
                                            else
                                                return (<MenuItem value={it.est_nombre}>{it.est_nombre}</MenuItem>)
                                        }else{
                                            if(it.est_nombre===estado)
                                            return (<MenuItem value={it.est_nombre} selected>{it.est_nombre}</MenuItem>)
                                        else if(it.est_nombre==='RE-ABIERTO')
                                            return (<MenuItem value={it.est_nombre}>{it.est_nombre}</MenuItem>)
                                        }
                                        
                                    })}
                                </Select>
                        </Grid> 
                    </Grid>
                    <Grid item container xs={12} md={12} sx={{textAlign:'center'}}>
                        <Grid item xs={12} sx={{marginBlock:'auto'}}>
                            <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Observación:</b></Typography>
                        </Grid>
                        <Grid item xs={12} sx={{marginBlock:'auto',px:3}}>
                            <TextField
                                id="observacion"
                                label=""
                                value={observacion}
                                inputProps={{style:{fontSize:14}}}
                                onChange={changeObservacion}
                                multiline
                                variant={props.mode=='c' ? 'standard':'filled'}
                                rows={3}
                                defaultValue=""
                                InputProps={{readOnly:props.mode=='c' ? false:true}}
                                sx={{width:'100%'}}
                                />
                        </Grid>
                    </Grid>
                    <ComentariosContainer/>
                </Grid>
            </CardContent>
            <CardActions sx={{
                justifyContent:'right',px:4, 
                pb:3, display:props.mode=='q' ? 'none': 'block'}}>
                <Button variant='contained' onClick={onSubmit}>Guardar</Button>
            </CardActions>
        </Card>
      </React.Fragment>
  )
}

export default FormAvance