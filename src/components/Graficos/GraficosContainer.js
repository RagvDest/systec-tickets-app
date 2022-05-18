import { Grid, Typography } from '@mui/material'
import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import {
  CategoryScale,
  LinearScale,
  BarElement,
  Title
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Doughnut } from 'react-chartjs-2';
import TicketxEstado from './TicketxEstado';
import TicketXCliente from './TicketxCliente';
import TicketxEquipos from './TicketxEquipos';


//
ChartJS.register(ArcElement, Tooltip, Legend);

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);




const GraficosContainer = (props) => {

  
  return (
    <React.Fragment>
      <Grid item container xs={12} sm={12} md={6}>
        <Grid item xs={12}  sx={{textAlign:'center'}}>
          <TicketXCliente txClientes={props.datos.txClientes}/>
        </Grid>
      </Grid>

      <Grid item container xs={12} sm={12} md={6}>
        <Grid item xs={12} sx={{textAlign:'center'}}>
            <TicketxEquipos txEquipos={props.datos.txEquipos}/> 
        </Grid>
      </Grid>
      
      <Grid item container xs={12} sm={12}>
        <Grid item xs={1} sm={3} md={4} lg={4}/>
        <Grid item xs={10} sm={6} md={4} lg={4} sx={{textAlign:'center'}}>
            <TicketxEstado txEstados={props.datos.txEstados}/> 
        </Grid>
        <Grid item xs={1} sm={3} md={4} lg={4}/>
      </Grid>

    </React.Fragment>
    
  )
}

export default GraficosContainer