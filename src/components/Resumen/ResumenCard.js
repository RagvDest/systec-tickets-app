import { Card, Grid, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import MDBox from "../../3rdCode/components/MDBox";
import MDTypography from "../../3rdCode/components/MDTypography"
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { useDispatch, useSelector } from 'react-redux';
import { selectNotifis, selectTPendiente } from '../../features/appSlice';
import {getPedInfo} from '../../features/actions/pedidoActions';
import {fcConvert} from '../../app/utils'
import { Link } from 'react-router-dom';


const colNotificacion = [
  { id: 'doc', label: 'Documento', minWidth: 100, align: 'center' },
  { id: 'cod', label: 'Código', minWidth: 100, align: 'center' },
  { id: 'tipo', label: 'Tipo', minWidth:100},
  { id: 'fc', label: 'Fecha', minWidth:100, align: 'center'},
  { id: 'act', label: 'Action', minWidth:100, align: 'center' }];

const colTrabajoPendiente = [
  {id:'nom', label: 'Cliente', minWidth: 100, align: 'center' },
  {id:'cod', label: '#Orden', minWidth: 100, align: 'center' },
  {id:'fcEnd', label: 'Fc. Entrega', minWidth: 100, align: 'center' },
  {id:'nmT', label: '#Tickets', minWidth: 100, align: 'center' },
  {id:'act', label: 'Action', minWidth: 100, align: 'center' },
]

const ResumenCard = (props) => {
  const [notifis,setNotifis] = useState([]);
  const [tPendiente, setTpendiente] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const trabajosPendientes = useSelector(selectTPendiente);
  const notificaciones = useSelector(selectNotifis);

  useEffect(()=>{
    setNotifis(notificaciones);
  },[notificaciones]);

  useEffect(()=>{
    if(props.user.rol != 'Cliente')
      setTpendiente(trabajosPendientes);
  },[trabajosPendientes]);

  const goToPedido = async (idPedido) =>{
    await dispatch(getPedInfo(idPedido));
    navigate(`/pedido-info/${idPedido}`);
  }

  const checkValueNotifi = (params) =>{
    let value;
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
      value = <IconButton aria-label="watch" onClick={() => goToPedido(params.row['pedido_id'])}>
      <SearchIcon  />
    </IconButton>
    }
    return value;
  }

  const checkValuePendientes = (params) =>{
    let value;
    if(params.column.id === 'nom'){
      value = params.row.usuario_id.persona_id.p_nombres;
      value = <i>{value}</i>
    }else if(params.column.id === 'cod'){
      value = params.row.ped_nro_orden;
    }else if(params.column.id === 'fcEnd'){
      if(params.row.ped_fc_fin==null)
        value = "No definido";
        else
          value = fcConvert(new Date(params.row.ped_fc_fin));
        value = <b>{value}</b>
    }else if(params.column.id === 'nmT'){
      value = params.row.ped_nro_tickets;
    }else if(params.column.id === 'act'){
      value = <IconButton aria-label="delete">
      <SearchIcon />
    </IconButton>
    }
    return value;
  }

    const Celdas = (params) =>{
      let value;
      if(params.tipo=="notifi")
        value= checkValueNotifi(params);
      else if(params.tipo=="pendientes")
        value = checkValuePendientes(params);
      
      return(
              <TableCell key={params.column.id} 
                        align={params.column.align} 
                        sx={{paddingY:"0.3em"}}>
                  {value}
              </TableCell>
      )
  }

  const TablaResumen = ({nombre,tipo,columnas,data,tabla}) =>{
    return(
      <Grid item xs={12}>
        <Card>
          <MDBox
            mx={2}
            mt={-3}
            py={1.5}
            px={2}
            variant="gradient"
            bgColor={tipo}
            borderRadius="lg"
            coloredShadow={tipo}
          >
            <MDTypography variant="subtitle1" color="white">
              {nombre}
            </MDTypography>
          </MDBox>
          <MDBox pt={3}>
          <TableContainer sx={{ maxHeight: 220, minWidth:220 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                  <TableRow>
                  {columnas.map((column) => (
                      <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ minWidth: column.minWidth,paddingTop:"0",paddingBottom:"0.2em" }}
                      >
                      {column.label}
                      </TableCell>
                  ))}
                  </TableRow>
              </TableHead>
              <TableBody>
                  {data.map((row,index)=>{
                      return (
                          <TableRow hover 
                          role='checkbox' 
                          tabIndex={-1} 
                          key={index}
                          >
                              {columnas.map((column)=>{
                                  return (
                                      <Celdas column={column} row={row} tipo={tabla}/>
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
    )
  }

  return (
    <React.Fragment>
      <Grid item container xs={12} md={props.md}>
        <TablaResumen nombre="Últimas notificaciones"
                      tipo="info" columnas={colNotificacion}
                      data={notifis} tabla="notifi"/>
      </Grid>
      {props.user.rol != 'Cliente' && <Grid item container xs={12} md={props.md}>
        <TablaResumen nombre="Trabajo pendiente"
                      tipo="warning" columnas={colTrabajoPendiente}
                      data={tPendiente} tabla="pendientes"/>
      </Grid>}
    </React.Fragment> 
  )
}

export default ResumenCard