import { Box, Button, Divider, Grid, IconButton, Input, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import SendIcon from '@mui/icons-material/Send';
import { styled } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { addComentario } from '../../features/actions/ticketActions';
import { selectUser } from '../../features/userSlice';
import { selectEstado, selectHistorial } from '../../features/ticketSlice';

const BotonMobil = styled('div')(({theme})=>({
  [theme.breakpoints.up('sm')]:{
    display:'none'
  },
  [theme.breakpoints.down('sm')]:{
    display:'block'
  },
}))

const BotonPc = styled('div')(({theme})=>({
  [theme.breakpoints.up('sm')]:{
    display:'block'
  },
  [theme.breakpoints.down('sm')]:{
    display:'none'
  },
}))

const Comentarios = ({last}) => {
  const [comentarios,setComentarios] = useState([]);
  const [comentario,setComentario] = useState("");
  const userLogin = useSelector(selectUser)
  const dispatch = useDispatch();  
  let comentContainer;
  const estadoSelected = useSelector(selectEstado);

  useEffect(()=>{
    debugger;
    setComentarios(estadoSelected.e_comentarios);
    comentContainer = document.getElementById("comentarios-div");
    comentContainer.scrollTop = comentContainer.scrollHeight;
  },[estadoSelected])

  const addComen = async () =>{
    let usuario = userLogin.persona.p_nombres+" "+userLogin.persona.p_apellidos;
    await dispatch(addComentario(estadoSelected['_id'],comentario,usuario, userLogin.username['_id']));
    setComentario("");
  }

  const changeComentario = (e) =>{
    setComentario(e.target.value);
  }

  const Comentario = (info,index) =>{
    return(
      <Grid item container key={index} 
        sx={{border:'1px solid black',borderRadius:10,
              margin:'2px',backgroundColor:'#ebebeb'}}>
         
        <Grid item xs={12} sx={{textAlign:'left', fontSize:'0.7rem',pl:2,pt:0.5}}>
          <span><b>{info.info.c_usuario}</b></span>
        </Grid>
        <Grid item xs={12} sx={{textAlign:'left',fontSize:'0.7rem',pl:2,py:0.5}}>
          <span>{info.info.c_detalle}</span>
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid item container xs={12} md={12}
          sx={{textAlign:'center'}}>
          <Divider/>
          <Grid item xs={12} sx={{marginBlock:'auto'}}>
              <Typography variant='subtitle1' sx={{float:'left'}} fontSize={16} marginY='auto'><b>Comentarios:</b></Typography>
          </Grid>
          <Grid item xs={12} sx={{marginBlock:'auto', maxHeight:'30rem'}}>
            <Box id="comentarios-div" sx={{maxHeight:'17vh',overflowX:'hidden',overflowY:'auto',
                      borderTop:'1px solid black'}}>
                {comentarios.map(
                    (item,index)=>{
                        return (
                            <Comentario info={item} index={index}/>
                        )
                    }
                )}
            </Box>
            { last && <Grid item container sx={{pt:3}}>
              <Grid item xs={10} sm={8}>
                <Input size='small' onKeyDown={(e)=>{if(e.key==='Enter') addComen();}} onChange={changeComentario} value={comentario} sx={{fontSize:'0.8rem', width:'100%'}} placeholder='Añadir comentario..' inputProps={{ 'aria-label': 'description' }} />
              </Grid> 
              <Grid item xs={2} sm={4}>
                  <BotonPc>
                    <Button variant="contained" onClick={addComen} size='small' endIcon={<SendIcon />}>
                      Enviar
                    </Button>
                  </BotonPc>
                  <BotonMobil>
                    <IconButton color="primary" onClick={addComen} aria-label="Agregar comentario">
                      <SendIcon />
                    </IconButton>
                  </BotonMobil>
              </Grid> 
            </Grid>}
          </Grid>
      </Grid>
  )
}

export default Comentarios