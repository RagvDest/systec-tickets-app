import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import MDBox from "../3rdCode/components/MDBox";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ComplexStatisticsCard from '../3rdCode/Cards/StatisticsCards/ComplexStatisticsCard'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ResumenCard from '../components/Resumen/ResumenCard';
import { useDispatch, useSelector } from 'react-redux';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { searchNotifis, searchTrabajosPendientes } from '../features/actions/appActions';
import GraficosContainer from '../components/Graficos/GraficosContainer';
import { searchDatos } from '../features/actions/dashActions';
import { selectDash } from '../features/dashboardSlice';

const Dashboard = (props) => {
  const dispatch = useDispatch();
  const datos = useSelector(selectDash);

  useEffect(async ()=>{
    await dispatch(searchNotifis());
  },[]);

  useEffect(async ()=>{
    // Get Datos para el dashBoard
    await dispatch(searchDatos());
  },[])

  useEffect(async () =>{
    debugger;
    if(props.user.rol != 'Cliente')
      await dispatch(searchTrabajosPendientes());
  },[])

  const PanelesComponent = () =>{
    return(
      <React.Fragment>
        <Grid item xs={12} sm={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              color="info"
              icon={<FactCheckIcon fontSize="medium" color="inherit"/>}
              title="Pedidos Activos"
              count={12}
              percentage={{
                color: "info",
                amount: "+55%",
                label: "than lask week",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon={<AccountCircleIcon fontSize="medium" color="inherit"/>}
              title="Nuevos Usuarios"
              count="23"
              color="light"
              percentage={{
                color: "dark",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item justify='center' xs={12} sm={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon={<AttachMoneyIcon fontSize="medium" color="inherit"/>}
              title="Ventas mensuales"
              count={datos.totalVentas}
              color="success"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
      </React.Fragment>
    )
  };

  
  return (
    <Grid container sx={{mt:12,mx:3}}> 
      <Grid item container xs={12} spacing={3}>
        <PanelesComponent/>
      </Grid>
      <Grid item container sx={{mt:3}} xs={12} spacing={3}>
        <ResumenCard user ={props.user} md={props.user.rol != 'Cliente' ? 6:12}/>
      </Grid>
      <Grid item container sx={{mt:3}} xs={12} spacing={3}>
        <GraficosContainer datos={datos}/>
      </Grid>
    </Grid>
  )
}

export default Dashboard