import { Alert, AlertTitle, Button, Card, CardActions, CardContent, CardHeader, Grid, MenuItem, Select, Snackbar, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { equipos, round10 } from '../app/utils';
import TextField from '@mui/material/TextField';
import { addTicket, updateTicket } from '../features/actions/ticketActions';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';


const FormTicket = (props) => {
    const dispatch = useDispatch();

    const [equipo,setEquipo] = useState("");
    const [detalle,setDetalle] = useState("");
    const [nombres,setNombres] = useState("");
    const [total,setTotal] = useState(0.00);
    const [abono,setAbono] = useState(0.00);
    const [reabierto, setReabierto] = useState(false);
    const [saldo,setSaldo] = useState(0.00);
    const [open,setOpen] =useState(false);
    const [mensaje,setMensaje] = useState([]);
    const [tipoAlert,setTipoAlert] = useState("success");

    let detalleHelperText;
    const saldoHelperText = document.getElementById('saldo-helper-text');

    const changeCheck = (e) =>{
        debugger;
        detalleHelperText = document.getElementById('detalle-helper-text');
        setReabierto(e.target.checked);
        if(e.target.checked){
            detalleHelperText.innerText="Ingrese UNICAMENTE el nro del ticket a re-abrir";
        }else{
            detalleHelperText.innerText="";
        }
    }

    useEffect(()=>{
        debugger;
        if(props.mode==='u'){
            setEquipo(props.ticket.ticket.t_tipo_equipo);
            setDetalle(props.ticket.ticket.t_detalle);
            setNombres(props.ticket.nombre);
            setTotal(props.ticket.ticket.t_total);
            setAbono(props.ticket.ticket.t_abono);
            //Saldo
            let saldoX = (props.ticket.ticket.t_total==='' ? 0: props.ticket.ticket.t_total) - (props.ticket.ticket.t_abono==='' ? 0:props.ticket.ticket.t_abono);
            setSaldo(round10('round',saldoX,-2));
        }else if(props.mode==='c'){
            setNombres(props.p_nombres);
        }
    },[])

    const changeEquipo = (e) =>{
        setEquipo(e.target.value);
    }
    const validarDecimales = (valor) =>{
        let parts = valor.toString().split('.',2), decimalPart = parts[1];
        if(decimalPart!= null && decimalPart.length>2){
            decimalPart = decimalPart.substring(0,2);
            valor = parseFloat(parts[0]+'.'+decimalPart);
        }
        return valor;
    };
    const changeTotal = (e) =>{
        debugger;
        let totalX;
        if(e.target.value===''){
            totalX='';
        }else
            totalX = parseFloat(e.target.value);
        if(totalX < 0){
            totalX = total;
        }
        totalX = validarDecimales(totalX);
        setTotal(totalX);
        calcularSaldo(totalX,abono);
    }
    const changeAbono = (e) =>{
        let abonoX;
        if(e.target.value===''){
            abonoX='';
        }else
            abonoX = parseFloat(e.target.value);
        if(abonoX < 0){
            abonoX = abono;
        }
        abonoX = validarDecimales(abonoX);
        setAbono(abonoX);
        calcularSaldo(total,abonoX);
    }
    const calcularSaldo = (total,abono) => {
        debugger;
        let saldoX = (total==='' ? 0: total) - (abono==='' ? 0:abono);
        saldoHelperText.innerHTML='';
        setSaldo(round10('round',saldoX,-2));
        
    }
    const changeDetalle = (e) =>{
        setDetalle(e.target.value);
    }

    const onSubmit = (e) =>{
        debugger;
        console.log("Aca");
        if(!validar())
            console.log("Error validacion");
        else{
            if(props.mode==='c')
                dispatch(addTicket(props.idPed,detalle,total,abono,equipo,reabierto));
            else if(props.mode==='u'){
                dispatch(updateTicket(props.ticket.ticket._id,detalle,total,abono,equipo));
            }
        }
    }

    const validar = () =>{
        debugger;
        let valido=true, msj=[];
        if(detalle===""){
            msj.push("Detalle no debe estar vacío");
            valido=false;
        }
        if(total<0){
            msj.push("Total no debe ser negativo.");
            valido=false;
        }
        if(abono<0){
            msj.push("Abono no debe ser negativo.");
            valido=false;
        }
        if(equipo===""){
            msj.push("Elija el tipo de equipo");
            valido=false;
        }
        if(!valido){
            setMensaje(msj);
            setTipoAlert("error")
            setOpen(true);
        }
            

        return valido;
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
  return (
      <React.Fragment >
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
          <Card sx={{overflow:'auto'}}>
                <CardHeader 
                        title={props.mode==='u' ? 'Ticket: '+props.ticket.ticket.t_num: 'Ticket: ###-###-###'} 
                        sx={{fontSize:6, p:3, px:4, borderBottom:'1px solid',position:'sticky'}}/>
                <CardContent sx={{p:3}}>
                    <Grid container spacing={3}>
                        <Grid item container xs={12} sx={{}}>
                            <Grid item xs={12} sm={2}>
                                <Typography variant='subtitle1' fontSize={16} marginY='auto'><b>Cliente:</b></Typography>
                            </Grid>
                            <Grid item xs={12} sm={10}>
                                <Typography variant='subtitle1' fontSize={16} marginY='auto'>{nombres}</Typography>
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{display:'flex'}}>
                            <Grid item  xs={12} sm={2} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Equipo:</b></Typography>
                            </Grid>
                            <Grid item  xs={12} sm={6} sx={{marginBlock:'auto'}}>
                                <Select 
                                    value={equipo}
                                    onChange={changeEquipo}
                                    displayEmpty
                                    label=" "
                                    variant='standard'
                                    sx={{ width: '100%' }}
                                    inputProps={{ 'aria-label': 'Without label'}}
                                    >
                                        {equipos.map((it)=>{
                                            if(props.mode==='u' && it.eq_nombre===equipo)
                                                return (<MenuItem value={it.eq_nombre} selected>{it.eq_nombre}</MenuItem>)
                                            else
                                                return (<MenuItem value={it.eq_nombre}>{it.eq_nombre}</MenuItem>)
                                        })}
                                    </Select>
                            </Grid> 
                            <Grid item xs={0} sm={1}/>
                            {props.mode==='c' && <Grid item sm={3}>
                            <FormGroup>
                                <FormControlLabel control={<Checkbox onChange={changeCheck}/>} value={reabierto} label="RE-ABIERTO" />
                            </FormGroup>
                            </Grid>}
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{textAlign:'center'}}>
                            <Grid item xs={12} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Detalle:</b></Typography>
                            </Grid>
                            <Grid item xs={12} sx={{marginBlock:'auto',px:3}}>
                                <TextField
                                    id="detalle"
                                    label=""
                                    value={detalle}
                                    onChange={changeDetalle}
                                    multiline
                                    helperText=' '
                                    rows={4}
                                    defaultValue=""
                                    sx={{width:'100%'}}
                                    />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{textAlign:'center'}}>
                            <Grid item xs={4} md={3} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Total a pagar:</b></Typography>
                            </Grid>
                            <Grid item xs={8} md={3} sx={{marginBlock:'auto',px:3}}>
                            <TextField
                            id="total"
                            label=""
                            value={total}
                            type="number"
                            variant='standard'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{'step':0.01,sx:{p:1}}}
                            onChange={changeTotal}
                            />
                            </Grid>
                        </Grid>
                        <Grid item container xs={12} md={12} sx={{textAlign:'center'}}>
                            <Grid item xs={4} md={3} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Abono:</b></Typography>
                            </Grid>
                            <Grid item xs={8} md={3} sx={{marginBlock:'auto',px:3}}>
                            <TextField
                            id="abono"
                            label=""
                            helperText=" "
                            value={abono}
                            type="number"
                            variant='standard'
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{'step':0.01,sx:{p:1}}}
                            onChange={changeAbono}
                            />
                            </Grid>
                            <Grid item xs={4} md={3} sx={{marginBlock:'auto'}}>
                                <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Saldo:</b></Typography>
                            </Grid>
                            <Grid item xs={8} md={3} sx={{marginBlock:'auto',px:3}}>
                            <TextField
                            id="saldo"
                            disabled
                            label=""
                            helperText=" "
                            value={saldo}
                            variant='standard'
                            type="number"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            inputProps={{'step':0.01,sx:{p:1}}}
                            />
                            </Grid>
                        </Grid>
                    </Grid>
                </CardContent>
                <CardActions sx={{justifyContent:'right',px:4, pb:3}}>
                        <Button size="middle" variant='contained' type='button' onClick={onSubmit}>
                            Guardar
                        </Button>
                </CardActions>
            </Card>
      </React.Fragment>
  );
};

export default FormTicket;
