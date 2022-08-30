import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { validateTime } from '@mui/lab/internal/pickers/time-utils';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { Fragment, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPed, updatePed } from '../features/actions/pedidoActions';
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import Usuarios from '../pages/Usuarios';
import Recordatorio from './Recordatorio/Recordatorio';

const FormPedido = (props) => {
    const [open,setOpen] = useState(false);
    const [fechaInicial,setFechaInicial] = useState(new Date());
    const [fechaFinal,setFechaFinal] = useState(null);
    const [estado,setEstado] = useState("ABIERTO");
    const [orden,setOrden] = useState("");
    const [idUsuario,setIdUsuario] = useState("");
    const [idPedido,setPedidoId] = useState("");
    const [openRecordatorioModal,setOpenRecordatorioModal] = useState(false);

    const dispatch = useDispatch();
    const [textUser,setTextUser] = useState("");
    let textUsuario;

    useEffect(()=>{
        if(props.mode==='u'){
            setOrden(props.ped.pedido.ped_nro_orden);
            setPedidoId(props.ped.pedido['_id']);
            setEstado(props.ped.pedido.ped_estado);
            setFechaFinal(props.ped.pedido.ped_fc_fin);
            setFechaInicial(props.ped.pedido.ped_fc_registro);
            setTextUser(props.ped.p_nombres);
            setIdUsuario(props.ped.id_usuario);
        }
    },[])

    const onFechaIniChange = (newValue) => {
        setFechaInicial(newValue);
    };

    const onFechaFinChange = (newValue) => {
        setFechaFinal(newValue);
    };

    const changeEstado = (e) =>{
        setEstado(e.target.value);
    }

    const handleCustomerSearch = (values) =>{
        debugger;
        textUsuario = document.getElementById("nombres");
        setIdUsuario(values.username._id);
       // textUsuario.innerText=values.persona.p_nombres+" "+values.persona.p_apellidos;
       setTextUser(values.persona.p_nombres+" "+values.persona.p_apellidos);
        textUsuario.style.color="black";
        toggleModal();

    }

    const toggleModal = () =>{
        setOpen(!open)
    }

    const onSubmit = async () =>{
        debugger;
        if(!validar())
            console.log("Error validacion");
        else{
            if(props.mode=='c'){
                dispatch(addPed(idUsuario,fechaInicial,fechaFinal));
            }
            else if(props.mode=='u'){
                await dispatch(updatePed(idPedido,
                    fechaInicial,fechaFinal,
                    orden,estado));
            }
            props.closePedido();
        }
    }

    const validar = () =>{
        debugger;
        textUsuario = document.getElementById("nombres");
        let valido=true;
        if(props.mode=='c'){
            if(idUsuario===""){
                //textUsuario.innerText = "Cliente requerido";
                setTextUser("Cliente requerido");
                textUsuario.style.color="red";
                valido = false;
            }
        }
        
        return valido;
    }

    const toggleRecordatorioModal = () =>{
        setOpenRecordatorioModal(!openRecordatorioModal);
    }

    const Inputs4Create = () =>{
        return(
            <React.Fragment>
                        <Grid item xs={12} md={6}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker 
                                    label="Fecha de Inicio"
                                    inputFormat="dd/MM/yyyy"
                                    value={fechaInicial}
                                    readOnly
                                    onChange={onFechaIniChange}
                                    renderInput={(params) => <TextField  sx={{width:'100%'}} {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
            </React.Fragment>
        )
    }

  return (
        <React.Fragment>
            <Card sx={{overflow:'auto'}}>
                <CardHeader 
                    title={props.mode==='u' ? 'Actualizar Pedido' : 'Crear Pedido'}
                    sx={{p:3, px:4, borderBottom:'1px solid',position:'sticky'}}
                    action={props.mode=='u' &&
                        <IconButton>
                            <AccessAlarmIcon onClick={toggleRecordatorioModal} color='primary'/>
                        </IconButton>
                    }
                    />
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{}}>
                            <Typography variant='subtitle2' fontSize={16} marginY='auto'>Cliente:</Typography>
                            <Box sx={{display:'flex',margin:1}}>
                                {props.mode=='c' &&<Button variant='contained' onClick={toggleModal}>Seleccionar</Button>}
                                <Typography variant='body2' marginY='auto' marginLeft={2} id="nombres">{textUser}</Typography>
                                <input hidden id='user' defaultValue={idUsuario}></input>
                            </Box>
                        </Grid>
                        {props.mode=='c' && <Inputs4Create/>}
                        <Grid item xs={12} md={6} sx={{textAlign:'center'}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker 
                                    label="Fecha de Entrega"
                                    inputFormat="dd/MM/yyyy"
                                    value={fechaFinal}
                                    minDate={fechaInicial}
                                    onChange={onFechaFinChange}
                                    renderInput={(params) => <TextField id="fecha-fin" helperText="Opcional" sx={{width:'100%'}} {...params} />}
                                />
                            </LocalizationProvider>
                        </Grid>
                        {props.mode!='c' && 
                        <Fragment><Grid item  xs={3} md={2} sx={{marginBlock:'auto'}}>
                            <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Estado:</b></Typography>
                        </Grid>
                        <Grid item xs={9} md={4} sx={{textAlign:'center',marginBlock:'auto'}}>
                        <Select 
                                    value={estado}
                                    onChange={changeEstado}
                                    displayEmpty
                                    label="Estado"
                                    variant='standard'
                                    sx={{ width: '100%' }}
                                    inputProps={{ 'aria-label': 'Without label' }}
                                    >
                                        {['ABIERTO','CERRADO'].map((it)=>{
                                            if(props.mode==='u' && it===estado)
                                                return (<MenuItem value={it} selected>{it}</MenuItem>)
                                            else
                                                return (<MenuItem value={it}>{it}</MenuItem>)
                                        })}
                                    </Select>
                        </Grid></Fragment>}
                    </Grid>
                </CardContent>
                <CardActions sx={{justifyContent:'right',px:4, pb:3}}>
                        <Button size="middle" variant='contained' type='button' onClick={onSubmit}>
                            Guardar
                        </Button>
                </CardActions>
            </Card>
            <Dialog
                  open={open}
                  onClose={toggleModal}
                  fullWidth
                  PaperProps={{sx:{height:'100%'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><DialogTitle>Buscar Cliente</DialogTitle>
                <DialogContent><Usuarios mode='q' modeP='s' selectUser={handleCustomerSearch} /></DialogContent></Dialog>

            <Dialog
                  open={openRecordatorioModal}
                  onClose={toggleRecordatorioModal}
                  fullWidth
                  PaperProps={{sx:{}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><DialogTitle>Recordatorio Personalizado</DialogTitle>
                <DialogContent><Recordatorio pedido={props.ped.pedido} /></DialogContent>
            </Dialog>
        </React.Fragment>
  );
};

export default FormPedido;
