import React, { useEffect, useRef } from 'react'
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
import {Box} from '@mui/material';
import { Typography } from '@mui/material';


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const TicketXCliente = (props) => {


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      }
    },
  };

  const labels = props.txClientes.map((it)=>{return it.cliente});

  const data = {
    labels,
    datasets: [
      {
        label: '# de tickets',
        data: labels.map((it,index) => {
          let arr = props.txClientes.map((ot)=>{return ot.num});
          return arr[index];
        }),
        backgroundColor: 'rgba(21, 171, 38, 0.5)',
      }
    ],
  };

  return (
    <React.Fragment>
      <Typography variant='h6'><b>Tickets por cliente</b></Typography>
      <Bar options={options} data={data} />
    </React.Fragment>
  )
}

export default TicketXCliente;