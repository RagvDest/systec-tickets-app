import { DatePicker, LocalizationProvider } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { validateTime } from '@mui/lab/internal/pickers/time-utils';
import { Box, Button, Card, CardActions, CardContent, CardHeader, Dialog, DialogContent, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPed } from '../features/actions/pedidoActions';
import Usuarios from '../pages/Usuarios';

const FormPedido = (props) => {
    const [open,setOpen] = useState(false);
    const [fechaInicial,setFechaInicial] = useState(new Date());
    const [fechaFinal,setFechaFinal] = useState(null);
    const [idUsuario,setIdUsuario] = useState("");
    const dispatch = useDispatch();
    let textUsuario;

    const onFechaIniChange = (newValue) => {
        setFechaInicial(newValue);
    };

    const onFechaFinChange = (newValue) => {
        setFechaFinal(newValue);
    };

    const handleCustomerSearch = (values) =>{
        debugger;
        textUsuario = document.getElementById("nombres");
        setIdUsuario(values.username._id);
        textUsuario.innerText=values.persona.p_nombres+" "+values.persona.p_apellidos;
        textUsuario.style.color="black";
        toggleModal();

    }

    const toggleModal = () =>{
        setOpen(!open)
    }

    const onSubmit = () =>{
        if(!validar())
            console.log("Error validacion");
        else{
            dispatch(addPed(idUsuario,fechaInicial,fechaFinal));
            props.closePedido();
        }
    }

    const validar = () =>{
        debugger;
        textUsuario = document.getElementById("nombres");
        let valido=true;
        if(idUsuario===""){
            textUsuario.innerText = "Cliente requerido";
            textUsuario.style.color="red";
            valido = false;
        }
        return valido;
    }

  return (
        <React.Fragment>
            <Card>
                <CardHeader title={props.mode==='u' ? 'Actualizar Pedido' : 'Crear Pedido'} sx={{p:3, px:4, borderBottom:'1px solid',position:'sticky'}}/>
                <CardContent>
                    <Grid container spacing={3}>
                        <Grid item xs={12} sx={{}}>
                            <Typography variant='subtitle2' fontSize={16} marginY='auto'>Cliente:</Typography>
                            <Box sx={{display:'flex',margin:1}}>
                                <Button variant='contained' onClick={toggleModal}>Seleccionar</Button>
                                <Typography variant='body2' marginY='auto' marginLeft={2} id="nombres"></Typography>
                                <input hidden id='user' defaultValue={idUsuario}></input>
                            </Box>
                        </Grid>
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
                <DialogContent><Usuarios mode='q' selectUser={handleCustomerSearch} /></DialogContent></Dialog>
        </React.Fragment>
  );
};

export default FormPedido;
