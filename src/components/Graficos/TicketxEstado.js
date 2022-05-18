import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

import { Doughnut } from 'react-chartjs-2';
import { Typography } from '@mui/material';

export const exampleDataDona = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  ChartJS.register(ArcElement, Tooltip, Legend);

const TicketxEstado = (props) => {

  const exampleDataDona = {
    labels: props.txEstados.map((it)=>{return it.estado}),
    datasets: [
      {
        data: props.txEstados.map((it)=>{return it.cantidad}),
        backgroundColor: [
          'rgba(255, 105, 97, 0.7)',
          'rgba(255, 180, 128, 0.7)',
          'rgba(248, 243, 141, 0.7)',
          'rgba(66, 214, 164, 0.7)',
          'rgba(8, 202, 209, 0.7)',
          'rgba(89, 173, 246, 0.7)',
          'rgba(157, 148, 255, 0.7)',
          'rgba(199, 128, 232, 0.7)'
        ],
        borderColor: [
          'rgba(255, 105, 97, 1)',
          'rgba(255, 180, 128, 1)',
          'rgba(248, 243, 141, 1)',
          'rgba(66, 214, 164, 1)',
          'rgba(8, 202, 209, 1)',
          'rgba(89, 173, 246, 1)',
          'rgba(157, 148, 255, 1)',
          'rgba(199, 128, 232, 1)'
        ],
        borderWidth: 2,
      },
    ],
  };

  return (
    <React.Fragment>
      <Typography variant='h6'><b>Tickets por estado</b></Typography>
        {props.txEstados.length>0 && <Doughnut data={exampleDataDona}/>}
        {props.txEstados.length==0 && <Typography variant='h6' sx={{pt:3,pb:10}}>No existen registros</Typography>}
    </React.Fragment>
  )
}

export default TicketxEstado