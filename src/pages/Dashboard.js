import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import MDBox from "../3rdCode/components/MDBox";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ComplexStatisticsCard from '../3rdCode/Cards/StatisticsCards/ComplexStatisticsCard'
import { DoneAll } from '@mui/icons-material';
import ResumenCard from '../components/Resumen/ResumenCard';
import { useDispatch } from 'react-redux';
import { searchNotifis, searchTrabajosPendientes } from '../features/actions/appActions';

const Dashboard = (props) => {
  const dispatch = useDispatch();

  useEffect(async ()=>{
    await dispatch(searchNotifis());
  },[])

  useEffect(async () =>{
    debugger;
    if(props.user.rol != 'Cliente')
      await dispatch(searchTrabajosPendientes());
  },[])

  const PanelesComponent = () =>{
    return(
      <React.Fragment>
        <Grid item xs={12} md={6} lg={3}>
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
        <Grid item xs={12} md={6} lg={3}>
          <MDBox mb={1.5}>
            <ComplexStatisticsCard
              icon={<DoneAll fontSize="medium"/>}
              title="Today's Users"
              count="2,300"
              color="success"
              percentage={{
                color: "success",
                amount: "+3%",
                label: "than last month",
              }}
            />
          </MDBox>
        </Grid>
        <Grid item xs={0} md={6}/>
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
    </Grid>
  )
}

export default Dashboard