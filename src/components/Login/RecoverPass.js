import { Box, Button, CircularProgress, Divider, FormControl, Input, InputAdornment, InputLabel, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import HelpIcon from '@mui/icons-material/Help';
import EmailIcon from '@mui/icons-material/Email';
import { logicRecoverPass } from '../../features/actions/userActions';
import { green } from '@mui/material/colors';
import { setLoading as setLoadingApp } from '../../features/appSlice';
import { Loading } from '../LoadingComponent';


const RecoverPass = (props) => {
  const [loading, setLoading] = useState(false);


  const [email,setEmail] = useState("");
  const [error,setError] = useState("");

  const dispatch = useDispatch();

  const handleSubmit = async (e) =>{
    debugger;
    e.preventDefault();
    if(emailValidation(email)){
        let json = {
            mail:email
        }
        if (!loading) {
          dispatch(setLoadingApp({loading:true,block:false}));
          await dispatch(logicRecoverPass(json));
          dispatch(setLoadingApp({loading:false,block:false}));
        }
    }else{
      alert("Email no válido");
    }
};
const onChangeEmail = async (e) =>{
    await setEmail(e.target.value);    
    emailValidation(e.target.value);
};

const emailValidation = (input) =>{
  const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if(input==""  || !input || regex.test(input)){
    setError("");
    return true;
  }else if(regex.test(input) === false ){
      setError("Email no válido");
      return false;
  }
}

  return (
    <Box component="form" onSubmit={(e) =>{handleSubmit(e)}} sx={{textAlign:'justify'}}>
      <Loading/>
        <Typography variant="h5" sx={{fontWeight:'bold', p:2}}>
            Recuperar contraseña
        </Typography>
        <Box sx={{backgroundColor:'#ededed',p:2}}>
            <Box>
              <HelpIcon/> <b>¿Has olvidado tu contraseña?</b>
            </Box>
            <Box>
              Para renovar tu contraseña, introduce la dirección de correo electrónico que proporcionaste durante el proceso de registro
            </Box>
        </Box>
        <Box sx={{mb:3,mt:2,color:'red'}}>
            <FormControl variant="standard" fullWidth>
                <InputLabel htmlFor="correo">Ingrese su correo</InputLabel>
                <Input  id="correo" sx={{}} 
                        value={email} 
                        fullWidth
                        onChange={onChangeEmail} 
                        endAdornment={<InputAdornment sx={{mr:1.5}}><EmailIcon/></InputAdornment>}
                        />
                        <Box fontSize={13}>{error}</Box>
            </FormControl>
        </Box>
        <Box sx={{flexDirection:'column', display:'flex', alignItems:'center', mb:4}}>
            <Button 
            type='submit' 
            disabled={loading}
            variant='contained'>
              Confirmar
            </Button>
            {loading && (
              <CircularProgress
                size={68}
                sx={{
                  color: green[500],
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  marginTop: '-34px',
                  marginLeft: '-34px'
                }}
              />
            )}
        </Box>
        <Divider/>
    </Box>
  )
}

export default RecoverPass