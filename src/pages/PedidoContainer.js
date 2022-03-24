import React, { useEffect, useState } from 'react';
import { Alert, AlertTitle, Button, Dialog, Grid, Snackbar } from '@mui/material';
import PedidoInfo from '../components/PedidoInfo';
import { Box } from '@mui/system';
import ListaContainer from '../components/ListaContainer';
import FormTicket from '../components/FormTicket';
import { useDispatch, useSelector } from 'react-redux';
import { selectPedidoOne } from '../features/pedidoSlice';
import { selectResult, selectTicketOne, selectTickets, ticketSelect } from '../features/ticketSlice';
import { getAvances, searchTickets } from '../features/actions/ticketActions';
import TicketInfo from '../components/Ticket/TicketInfo';



const PedidoContainer = (props) => {
  const [openModal,setOpenModal] = useState(false);
  const [open,setOpen] =useState(false);

  const [openTicket, setOpenTicket] = useState(false);

  const [mensaje,setMensaje] = useState([]);
  const [tipoAlert,setTipoAlert] = useState("info");
  const resultado = useSelector(selectResult);


  const pedSelect = useSelector(selectPedidoOne);
  const ticketSelected = useSelector(selectTicketOne);

  const tickets = useSelector(selectTickets);
  const dispatch = useDispatch();

  useEffect(async()=>{
    dispatch(searchTickets(pedSelect.pedido._id))
  },[]);

  useEffect(()=>{
    toast();
  },[resultado]);

  const toast = async () =>{
    if(resultado.mostrar){
      setMensaje(resultado.mensajes);
      setTipoAlert(resultado.tipo);
      closeModal();
      setOpen(true);
    }
    console.log(mensaje);
  }

  const toggleModal = (e,result,mensajes,tipo) =>{
    debugger;
    setOpenModal(!openModal);
  }

  const closeModal = () =>{
    dispatch(searchTickets(pedSelect.pedido._id));
    setOpenModal(false);
  }

  const handleOpenTicket = async (value, modo) => {
    debugger;
    await dispatch(ticketSelect({ticket:value,nombre:pedSelect.p_nombres}));
    await dispatch(getAvances(value['_id']));
    console.log(ticketSelected);
    setOpenTicket(true);
  }
  const closeTicket = () =>{
    setOpenTicket(false);
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  return (
            <Grid container>
              <Snackbar open={open} 
                    autoHideDuration={6000} 
                    onClose={handleClose}
                    anchorOrigin={{vertical: "top",
                    horizontal: "right"}}>
                <Alert onClose={handleClose} severity={tipoAlert} sx={{ width: '100%' }}>
                {mensaje.map((item,index)=>{
                    return(
                        <AlertTitle key={index}>{item}</AlertTitle>
                    )
                })}            
                </Alert>
              </Snackbar>
                <Grid item xs={12}>
                    <PedidoInfo pedidoSelect={pedSelect}/>
                </Grid>
                <Grid item xs={12} sx={{textAlign:'center',py:3}}>
                    <Button variant='contained' onClick={toggleModal}>Nuevo Ticket</Button>
                    <Dialog
                      open={openModal}
                      onClose={closeModal}
                      fullWidth
                      PaperProps={{sx:{overflow:'auto'}}}
                      aria-labelledby="modal-modal-title"
                      aria-describedby="modal-modal-description"
                    ><FormTicket mode='c' p_nombres={pedSelect.p_nombres} idPed={pedSelect.pedido._id} closeModal={toggleModal}/></Dialog>
                </Grid>
                <Grid item xs={12}>
                    <ListaContainer items={tickets} tipo="ti" mode="ti" handleTicket={handleOpenTicket} />
                </Grid>
                <Grid item xs={12} p={2} sx={{textAlign:'center'}}>
                  <Dialog
                    open={openTicket}
                    onClose={closeTicket}
                    fullWidth
                    PaperProps={{sx:{height:'100%'}}}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <TicketInfo ticket={ticketSelected}/>
                  </Dialog>
              </Grid>
            </Grid>
  );
};

export default PedidoContainer;
