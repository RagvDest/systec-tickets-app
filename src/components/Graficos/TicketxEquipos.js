import React from 'react'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { Typography } from '@mui/material';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    indexAxis: 'y',
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };


const TicketxEquipos = (props) => {

  const labels = props.txEquipos.map((it)=>{return it.equipo});

  const data = {
    labels,
    datasets: [
      {
        label: '# de tickets',
        data: labels.map((it,index) => {
          let arr = props.txEquipos.map((it)=>{return it.cantidad});
          return arr[index];
        }),
        backgroundColor: 'rgba(27, 55, 181, 0.5)',
      }
    ],
  };
  return (
    <React.Fragment>
      <Typography variant='h6'><b>Tickets por Tipo de Equipo</b></Typography>
        <Bar options={options} data={data} />
    </React.Fragment>
  )
}

export default TicketxEquipos