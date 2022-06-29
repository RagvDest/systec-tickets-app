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

  useEffect(()=>{
    async function fetchData(){
      await dispatch(searchNotifis());
    }
    fetchData();
  },[]);

  useEffect(()=>{
    async function fetchData(){
      await dispatch(searchDatos());
    }
    fetchData();
  },[])

  useEffect(() =>{
    async function searchAsync(){
      if(props.user.rol !== 'Cliente')
        await dispatch(searchTrabajosPendientes());
    };
    searchAsync();
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
              count={datos.txActivos}
            />
          </MDBox>
        </Grid>
        <Grid item xs={12} sm={6} lg={4}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon={<AccountCircleIcon fontSize="medium" color="inherit"/>}
              title="Nuevos Usuarios"
              count={datos.nUsers.n}
              color="light"
              percentage={{
                color: "dark",
                amount: `${datos.nUsers.p}%`,
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
              count={`$ ${datos.totalVentas}`}
              color="success"
            />
          </MDBox>
        </Grid>
      </React.Fragment>
    )
  };

  
  return (
    <Grid container sx={{mt:{xs:20,md:12},px:3}}> 
      {props.user.rol === 'Administrador' && <Grid item container xs={12} spacing={3}>
        <PanelesComponent/>
      </Grid>}
      <Grid item container sx={{mt:3}} xs={12} spacing={5}>
        <ResumenCard user ={props.user} md={props.user.rol !== 'Cliente' ? 6:12}/>
      </Grid>
      {props.user.rol==='Administrador' && <Grid item container sx={{mt:3}} xs={12} spacing={3}>
        <GraficosContainer datos={datos}/>
      </Grid>}
    </Grid>
  )
}

export default Dashboard