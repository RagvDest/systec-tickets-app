import React, { useEffect, useState } from 'react'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { DateTimePicker, LocalizationProvider } from '@mui/lab';
import { Box } from '@mui/system';


const Recordatorio = () => {
    const [fecha,setFecha] = useState(new Date());
    
    const handleSubmit = () =>{
        alert('Confirmar fecha: '+fecha);
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
                        renderInput={(params) => <TextField {...params} />}
                        value={fecha}
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