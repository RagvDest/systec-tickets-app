import { Button, Card, CardContent, Dialog, Divider, Grid, TextField, Typography } from '@mui/material';
import {  Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';

import {round10} from '../../app/utils';
import FormTicket from '../FormTicket';
import { useDispatch, useSelector } from 'react-redux';
import { selectTicketOne, changeEstadoSelected } from '../../features/ticketSlice';
import FormAvance from '../Avance/FormAvance';
import Historial from '../Avance/Historial';

const TicketInfo = (props) => {

    const [openModal,setOpenModal] = useState(false);
    const ticket = useSelector(selectTicketOne);
    const [modeAvance,setModeAvance] = useState("c");
    const [avance,setAvance] = useState({});

    const [last,setLast] = useState(false);

    const dispatch = useDispatch()
    
    const [openAvance,setOpenAvance] = useState(false);

    useEffect(async ()=>{
        console.log(ticket)
        closeUpdate();
    },[ticket]);

    const toggleUpdate = () =>{
        setOpenModal(!openModal);
    }
    
    const closeUpdate = () =>{
        setOpenModal(false);
    }

    const closeAvance = () =>{
        setOpenAvance(false);
    }

    const toggleAvance = async (mode,info,last) =>{
            setModeAvance(mode);
            setLast(last);
            setAvance(info);
            await dispatch(changeEstadoSelected(info));
            setOpenAvance(!openAvance);
    }

    const BotonNuevo = () =>{
        if(props.estado_pedido==='CERRADO')
            return (<React.Fragment/>);
        if(props.user.rol==='Empleado'){
            return(
                <Grid item xs={12} sx={{textAlign:'end',px:3}}>
                    <Button variant='contained' onClick={()=>toggleAvance('c')}>Nuevo</Button>
                </Grid>
            )
        }
        return (<React.Fragment/>);
    }

  return (
    <React.Fragment>
            <Box className="">
                <Card>
                    <CardContent sx={{p:0.5}}>
                        <Grid container direction="column">
                            <Grid item container sx={{px:3.5,pt:2}}>
                                <Grid item xs={10} md={11}>
                                    <Typography sx={{fontSize:{xs:'1.3rem',md:'1.75rem'}}} variant='h6' component='span'><i>Ticket: {ticket.ticket.t_num}</i></Typography>
                                </Grid>
                                {props.user.rol!=='Cliente' && ticket.ticket.t_estado!=='CERRADO' && <Grid item xs={2} md={1} sx={{textAlign:'end '}}>
                                    <Button color="inherit" onClick={toggleUpdate}><EditIcon/></Button>
                                </Grid>}
                            </Grid>
                            <Grid item spacing={2} container sx={{px:3, py:1}}>
                                <Grid item xs={12}><Divider/></Grid>
                                <Grid item xs={12} md={6} sx={{pt:0}}>
                                    <Typography sx={{fontSize:'1.05rem'}} variant='subtitle2' component='span'>Cliente: {ticket.nombre}</Typography>
                                </Grid>
                                <Grid item xs={12} md={6} sx={{width:'100%'}}>
                                    <Typography sx={{fontSize:'1.05rem'}} variant='subtitle2' component='span'>Equipo: {ticket.ticket.t_tipo_equipo}</Typography>
                                </Grid>
                                <Grid item xs={12} md={12} sx={{width:'100%'}}>
                                    <Typography sx={{fontSize:'1.05rem'}} variant='subtitle2' component='span'><i>Detalle:</i></Typography>
                                    <TextField
                                    id="detalle"
                                    value={ticket.ticket.t_detalle}
                                    multiline
                                    rows={3}
                                    variant="filled"
                                    sx={{width:'100%'}}
                                    inputProps={{style: {fontSize: 12}}} // font size of input text
                                    InputProps={{sx:{pt:1}}}
                                    InputLabelProps={{style: {fontSize: 12}}} // font size of input label
                                    />
                                </Grid>
                                <Grid item xs={12} md={12} sx={{width:'100%'}}>
                                    <Typography variant='subtitle2' component='span'>HISTORIAL</Typography>
                                </Grid>
                                <Grid item container spacing={2} xs={12} md={12} sx={{width:'100%'}}>
                                    <Grid item xs={12}>
                                        <Historial idTicket={ticket} openAvance={toggleAvance} setLast={setLast}/>
                                    </Grid>
                                    <BotonNuevo/>
                                    <Grid item xs={12}>
                                    <Divider/>
                                    </Grid>
                                </Grid>
                                <Grid item container xs={12} sx={{textAlign:'center'}}>
                                    <Grid item xs={12} sm={4} >
                                        Total a pagar: {ticket.ticket.t_total}
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        Abono: {ticket.ticket.t_abono}
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        Saldo: {round10('round',ticket.ticket.t_total - ticket.ticket.t_abono,-2)}
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                        
                    </CardContent>
                </Card>
            </Box>
            <Dialog
                  open={openModal}
                  onClose={toggleUpdate}
                  fullWidth
                  PaperProps={{sx:{height:'100%'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><FormTicket mode='u' ticket={ticket} closeUpdate={closeUpdate}/></Dialog>
            <Dialog
                  open={openAvance}
                  onClose={closeAvance}
                  fullWidth
                  PaperProps={{sx:{width:'25rem'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><FormAvance 
                    mode={modeAvance} 
                    closeAvance={closeAvance} 
                    ticket={ticket.ticket}
                    info={avance}
                    last={last}
                    /></Dialog>
        </React.Fragment>
  )
}

export default TicketInfo