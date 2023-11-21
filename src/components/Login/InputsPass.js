import { useNavigate, useParams } from 'react-router';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Button, IconButton, InputAdornment } from '@mui/material';
import { Card, CardContent, CardHeader, Divider, FormControl, Input, InputLabel, Paper, Typography } from '@mui/material'
import { Box } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react'
import { logicPass } from '../../features/actions/userActions';
import { selectRedirect, setRedirect } from '../../features/appSlice';

const InputsPass = (props) => {

    const [pass,setPass] = useState("");
    const [rePass,setRepass] = useState("");
    const [showPass,setShowpass] = useState(false);
    const [mensaje,setMensaje] = useState("");

    const navigate = useNavigate();
    const params = useParams();
    const dispatch = useDispatch();
    const redirect = useSelector(selectRedirect);

    useEffect(async ()=>{
        debugger;
        if(redirect!==""){
            let urlAux = redirect;
            await dispatch(setRedirect(""));
            await navigate(urlAux);

        }
    },[redirect]);

    const handleSubmit = async (e) =>{
        debugger;
        e.preventDefault();
        if(valid(pass,'p')){
            let json = {
                user_id:params['idUser'],
                hash_id:params['hashPassword'],
                pass:pass,
                repass:rePass
            }
            console.log(json);
            await dispatch(logicPass(json));
        };
    };
    const onChangePass = async (e) =>{
        await setPass(e.target.value);        
        valid(e.target.value,'p');
    };
    const onChangeRepass= async (e) =>{
        await setRepass(e.target.value);
        valid(e.target.value,'r');

    };
    const onChangeShowpass = () =>{
        setShowpass(!showPass);
    }

    const valid = (current,o) =>{
        debugger;
        let result = true;
        let other = o=='p' ? rePass:pass;
        if(current!==other){
            setMensaje("Contraseñas no son iguales");
            result = false;
        }
        else if(current===other){
            setMensaje("");
        }
        if(current.length<6 && o==='p'){
            setMensaje("Debe tener ser de 6 o más caracteres");
            result = false;
        }
        return result;
    }


  return (
    <Box component="form" onSubmit={(e) =>{handleSubmit(e)}}>
        <Typography variant="h5" sx={{fontWeight:'bold', p:2}}>
            {props.mode=='c'    && "Registrar contraseña"}
            {props.mode=='u'  && "Recuperar contraseña"}
        </Typography>
        <Box sx={{my:3}}>
            <FormControl variant="standard">
                <InputLabel htmlFor="password">{props.mode=='u' ? 'Nueva ' : ''}Contraseña</InputLabel>
                <Input  id="password" sx={{width:250}} 
                        value={pass} 
                        onChange={async (e)=>await onChangePass(e)} 
                        type= {showPass ? 'text' : 'password'}
                        />
            </FormControl>
        </Box>
        <Box sx={{mt:3}}>
            <FormControl variant="standard">
                <InputLabel htmlFor="repass">Repita su contraseña</InputLabel>
                <Input id="repass" sx={{width:250}} value={rePass} onChange={async (e)=>await onChangeRepass(e)} 
                        type= {showPass ? 'text' : 'password'}
                        />
                        <span style={{color:"red"}}>{mensaje}</span>
            </FormControl>
        </Box>
        <Box sx={{textAlign:'right'}}>
            <IconButton
                aria-label="toggle password visibility"
                onClick={onChangeShowpass}
            >
                {showPass ? <VisibilityOff /> : <Visibility />}
            </IconButton>
        </Box>
        <Box sx={{flexDirection:'column', display:'flex', alignItems:'center', mb:4}}>
            <Button type='submit' variant='contained'>Guardar</Button>
        </Box>
        <Divider/>
    </Box>
  )
}

export default InputsPass