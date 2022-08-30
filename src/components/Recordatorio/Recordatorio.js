import React, { useEffect, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { Box } from '@mui/system';
import { useDispatch } from 'react-redux';
import { updatePed } from '../../features/actions/pedidoActions';


const Recordatorio = (props) => {
    const date = new Date()
    const dateAux = new Date().setDate(date.getDate()+1);

    const [fecha,setFecha] = useState(new Date(dateAux));
    const [open,setOpen] = useState(false);
    const dispatch = useDispatch();

    
    
    const handleSubmit = async () =>{
        alert('Confirmar fecha: '+fecha);
        await dispatch(
            updatePed(
                props.pedido['_id'],
                props.pedido.ped_fc_registro,
                props.pedido.ped_fc_fin,
                props.pedido.ped_nro_orden,
                props.pedido.ped_estado,
                null,
                fecha
                ));

    }

  return (
    <React.Fragment >
        <Grid container>
            <Grid item xs={12}>
                <Box sx={{pb:1}}>
                    <Typography variant='caption' >Seleccione la fecha y hora en la que desea ser notificado sobre este pedido:</Typography>
                </Box>
            <Grid/>
            <Grid item sx={{textAlign:'center'}}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateTimePicker
                        label="Seleccionar"
                        inputFormat="dd/MM/yyyy"
                        renderInput={(params) => <TextField {...params} />}
                        value={fecha}
                        minDate={new Date(dateAux)}
                        onChange={(newValue) => {
                            setFecha(newValue);
                        }}
                        />
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} sx={{textAlign:'right'}}>
                <Button variant='outlined' onClick={handleSubmit}>Confirmar</Button>
            </Grid>
            </Grid>
        </Grid>

    </React.Fragment>
  )
}

export default Recordatorio