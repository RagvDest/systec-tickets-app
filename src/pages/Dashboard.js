import { Grid } from '@mui/material'
import React, { useEffect } from 'react'
import MDBox from "../3rdCode/components/MDBox";
import FactCheckIcon from '@mui/icons-material/FactCheck';
import ComplexStatisticsCard from '../3rdCode/Cards/StatisticsCards/ComplexStatisticsCard'
import { DoneAll } from '@mui/icons-material';
import ResumenCard from '../components/Resumen/ResumenCard';
import { useDispatch } from 'react-redux';
import { searchNotifis } from '../features/actions/appActions';

const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(async ()=>{
    await dispatch(searchNotifis());
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
                color: "success",
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
        <Grid item xs={6}/>
        <Grid item xs={6}>
          <ResumenCard/>
        </Grid>
      </React.Fragment>
    )
  };

  
  return (
    <Grid container sx={{mt:12,mx:3}}> 
      <Grid item container xs={12} spacing={3}>
        <PanelesComponent/>
      </Grid>
      <Grid item container xs={12} spacing={3}>
        
      </Grid>
    </Grid>
  )
}

export default Dashboard