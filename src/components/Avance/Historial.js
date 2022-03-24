import { Button, Card, CardContent, Dialog, Divider, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getAvances } from '../../features/actions/ticketActions';
import { selectHistorial, selectResult } from '../../features/ticketSlice';

const columns = [
    { id: 'estado', label: 'Estado', minWidth: 100, align: 'center' },
    { id: 'tecnico', label: 'Técnico', minWidth: 100, align: 'center' },
    { id: 'observacion', label: 'Observación', minWidth:200}];

const Historial = (props) => {
    const historial = useSelector(selectHistorial);
    const resultado = useSelector(selectResult);
    const dispatch = useDispatch();

    useEffect(async ()=>{
        await dispatch(getAvances(props.idTicket.ticket['_id']));
    },[resultado]);

    const Celdas = (params) =>{
        let value; 
        let colorEstado = 'inherent';
        if(params.column.id === 'estado'){
            value = params.row['e_nombre'];
            if(value=='COMPLETO')
                colorEstado = 'lightgreen';
            if(value=='REPARACIÓN')
                colorEstado = 'royalblue';
            if(value=='DIAGNÓSTICO')
                colorEstado = '#F0EF71';
            value = <b>{value}</b>
        }else if(params.column.id === 'tecnico'){
            value = params.row['e_usuario'];
        }else if(params.column.id === 'observacion'){
            value = params.row['e_detalle'];
        }
        
        return(
                <TableCell key={params.column.id} align={params.column.align} sx={{backgroundColor:params.column.id=='estado' ? colorEstado: 'inherent'}}>
                    {value}
                </TableCell>
        )
    }

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 220 }}>
            <Table stickyHeader aria-label="sticky table">
            <TableHead>
                <TableRow>
                {columns.map((column) => (
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    >
                    {column.label}
                    </TableCell>
                ))}
                </TableRow>
            </TableHead>
            <TableBody>
                {historial.map((row,index)=>{
                    return (
                        <TableRow hover 
                        role='checkbox' 
                        tabIndex={-1} 
                        key={index}
                        sx={{cursor:'pointer'}}
                        onClick={()=>{props.openAvance('q',row)}}
                        >
                            {columns.map((column)=>{
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
    </Paper>
  )
}

export default Historial