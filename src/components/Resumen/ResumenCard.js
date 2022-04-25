import { Card, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MDBox from "../../3rdCode/components/MDBox";
import MDTypography from "../../3rdCode/components/MDTypography"
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifis } from '../../features/appSlice';
import {fcConvert} from '../../app/utils'


const colNotificacion = [
  { id: 'doc', label: 'Documento', minWidth: 100, align: 'center' },
  { id: 'cod', label: 'Código', minWidth: 100, align: 'center' },
  { id: 'tipo', label: 'Tipo', minWidth:100},
  { id: 'fc', label: 'Fecha', minWidth:100},
  { id: 'act', label: 'Action', minWidth:100, align: 'center' }];


const ResumenCard = () => {
  const [notifis,setNotifis] = useState([]);
  const notificaciones = useSelector(selectNotifis);

  useEffect(()=>{
    setNotifis(notificaciones);
  },[notificaciones]);

    const Celdas = (params) =>{
      let value; 
      let colorEstado = 'inherent';
      if(params.column.id === 'doc'){
          value = params.row['n_documento'];
          value = <b>{value}</b>
      }else if(params.column.id === 'cod'){
          value = params.row['n_codigo'];
      }else if(params.column.id === 'tipo'){
          value = params.row['n_tipo'];
      }else if(params.column.id === 'fc'){
        value = fcConvert(new Date(params.row['n_fc_creado']));
      }else if(params.column.id === 'act'){
        value = <IconButton aria-label="delete">
        <SearchIcon />
      </IconButton>
      }
      
      return(
              <TableCell key={params.column.id} 
                        align={params.column.align} 
                        sx={{paddingY:"0.3em"}}>
                  {value}
              </TableCell>
      )
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={1.5}
            px={2}
            variant="gradient"
            bgColor="warning"
            borderRadius="lg"
            coloredShadow="info"
          >
            <MDTypography variant="subtitle1" color="white">
              Últimas notificaciones
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
          <TableContainer sx={{ maxHeight: 220 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                  <TableRow>
                  {colNotificacion.map((column) => (
                      <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth,paddingTop:"0" }}
                      >
                      {column.label}
                      </TableCell>
                  ))}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {notifis.map((row,index)=>{
                      return (
                          <TableRow hover 
                          role='checkbox' 
                          tabIndex={-1} 
                          key={index}
                          >
                              {colNotificacion.map((column)=>{
                                  return (
                                      <Celdas column={column} row={row}/>
                                  )
                              })}

                          </TableRow>
                      )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </MDBox>
        </Card>
      </Grid>
    </Grid>
  )
}

export default ResumenCard