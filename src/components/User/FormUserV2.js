import { Autocomplete, Box, Button, Card, CardActions, CardContent, CardHeader, Checkbox, CircularProgress, Divider, FormControlLabel, Grid, Input, InputLabel, TextField } from '@mui/material';
import { green } from '@mui/material/colors';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { isMail, isMinMax, isNull, isNumber } from '../../app/utils';
import { addUser, updateUser } from '../../features/actions/searchUsersActions';
import { setLoading, setMensaje } from '../../features/appSlice';
import { setToast } from '../../features/pagSlice';
import { selectUser } from '../../features/userSlice';


const filtros = [
    {label:'EMPLEADO',value:'61e7dc21aed590273949963d', id:0},
    {label:'CLIENTE',value:'61e7dc27aed590273949963f', id:1}
]

const FormUserV2 = (props) => {

    const [json, setJson] = useState(
        {
            id:'',
            username:'',
            mail:'',
            nombres:'',
            cedula:'',
            apellidos:'',
            telefono:''
        }
    );

    const [errorText, setErrorText] = useState(
        {
            username:'',
            mail:'',
            nombres:'',
            cedula:'',
            apellidos:'',
            telefono:''
        }
    );

    const [activo, setActivo] = useState(true);
    const [rol, setRol] = useState('CLIENTE');
    const [userLogged, setUserLogged] = useState({});

    const usuarioLogeado = useSelector(selectUser);

    const dispatch = useDispatch();


    useEffect(()=>{
        debugger;
        if(usuarioLogeado){
            setUserLogged(usuarioLogeado);
        }
        if(props.mode=='u'){
            let update = {
                username:props.userSelected.username.u_usuario,
                mail:props.userSelected.username.u_mail,
                nombres:props.userSelected.persona.p_nombres,
                apellidos:props.userSelected.persona.p_apellidos,
                cedula:props.userSelected.persona.p_cedula,
                telefono:props.userSelected.persona.p_tel == null ? '':props.userSelected.persona.p_tel,
                id:props.userSelected.username._id,
            };
            setJson(json =>({
                ...json,
                ...update
                })
            );
            setActivo(props.userSelected.username.u_activo);
        }
    },[]);

    const handleRol = (e) => {
        debugger;
        setRol(e.target.textContent);
    }

    const handleCheck = (e) =>{
        debugger;
        setActivo(e.target.checked);
    }

    const changeUsername = (e) =>{
        setJson(json=>({...json,...{username:e.target.value}}));
        if(isNull(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{username:"No puede estar vacio"}}))
            return;
        }
        if(isMinMax(e.target.value,4,10)){
            setErrorText(errorText => ({...errorText, ...{username:"Debe contener de 4 a 10 caracteres"}}))
            return;
        }
        setErrorText(errorText => ({...errorText, ...{username:""}}));
    }

    const changeNombres = (e) =>{
        setJson(json=>({...json,...{nombres:e.target.value}}));
        if(isNull(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{nombres:"No puede estar vacio"}}))
            return;
        }
        setErrorText(errorText => ({...errorText, ...{nombres:""}}));
    }

    const changeApellidos = (e) =>{
        setJson(json=>({...json,...{apellidos:e.target.value}}));
        if(isNull(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{apellidos:"No puede estar vacio"}}))
            return;
        }
        setErrorText(errorText => ({...errorText, ...{apellidos:""}}));
    }

    const changeCedula = (e) =>{
        setJson(json=>({...json,...{cedula:e.target.value}}));
        if(isNull(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{cedula:"No puede estar vacio"}}))
            return;
        }
        if(isNumber(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{cedula:"Solo números"}}))
            return;
        }
        setErrorText(errorText => ({...errorText, ...{cedula:""}}));
    }

    const changeMail = (e) =>{
        setJson(json=>({...json,...{mail:e.target.value}}));
        if(isNull(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{mail:"No puede estar vacio"}}));
            return;
        }
        if(isMail(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{mail:"Formato mail no válido"}}))
            return;
        }
        setErrorText(errorText => ({...errorText, ...{mail:""}}));
    }

    const changeTelefono = (e) =>{
        setJson(json=>({...json,...{telefono:e.target.value}}));
        if(isNull(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{telefono:"No puede estar vacio"}}));
            return;
        }
        if(isNumber(e.target.value)){
            setErrorText(errorText => ({...errorText, ...{telefono:"Solo números"}}));
            return;
        }
        setErrorText(errorText => ({...errorText, ...{telefono:""}}));
    }

    const validar = () =>{
        let error = false;

        if(isNull(json.username)    || isNull(json.nombres) ||
            isNull(json.apellidos)  || isNull(json.cedula) ||
            isNull(json.telefono)   || isNull(json.mail) ||
            isMail(json.mail)       || isMinMax(json.username,4,10) ||
            isNumber(json.cedula)   || isNumber(json.telefono)
        ){
            error = true;
            dispatch(setMensaje({mensaje:"Errores en campos",tipo:"error"}));
        }
        return error;
    }


    const handleSubmit = async (e) =>{
        debugger;
        e.preventDefault();
        if(validar())
            return;
        if(props.mode==='u'){
            await dispatch(setLoading({loading:true,block:true}));
            await dispatch(updateUser(json,activo,props.modo));
            await dispatch(setLoading({loading:false,block:false}));
            props.toggleUpdate();
        }else{
            let rol = document.getElementById('combo-box') != null ? document.getElementById('combo-box').value : 'CLIENTE';

            await dispatch(setLoading({loading:true,block:true}));
            await dispatch(addUser(json,rol));
            await dispatch(setLoading({loading:false,block:false}));
            props.closeModal();
        }    
    }

    
    const RolInput = (props) => {
        debugger;
        if(props.mode==='u' ||
        userLogged.rol != 'Administrador'
        ){
                return(<React.Fragment/>);
        }else{
        return (
            <React.Fragment>
            <Autocomplete
                disablePortal
                disableClearable
                id="combo-box"
                onChange={handleRol}
                value={rol}
                options={filtros}
                sx={{ width: '100%' }}
                renderInput={(params) => <TextField {...params} label="Rol" />}
            />
            </React.Fragment>
        )
        }
    }

  return (
    <React.Fragment>
        <Card>
            <CardHeader title={props.mode==='u' ? 'Actualizar Usuario' : 'Crear Usuario'} sx={{p:3, px:4, borderBottom:'1px solid',position:'sticky'}}/>
            <CardContent>
                    <Grid container direction="column" spacing={2} sx={{px:3,py:1}}>
                            <Grid item container spacing={1}>
                                <Grid item xs={12} md={6}>
                                    <InputLabel sx={{py:1}} htmlFor='username'>Usuario</InputLabel>
                                    <TextField      className="form-control" 
                                                    sx={{width:'90%'}} 
                                                    id='username' value={json.username}
                                                    required
                                                    variant='standard'
                                                    size='small'
                                                    onChange={changeUsername}
                                                    helperText={errorText.username}
                                                    error={isMinMax(json.username,4,10)}
                                    />
                                </Grid>
                                <Grid item xs={0} md={6}/>
                                <Grid item xs={12} md={6}>
                                    <InputLabel sx={{py:1}} htmlFor='nombres'>Nombres</InputLabel>
                                    <TextField      className="form-control" 
                                                    sx={{width:'90%'}} 
                                                    size='small'
                                                    variant='standard'
                                                    id='nombres' value={json.nombres}
                                                    onChange={changeNombres}
                                                    required />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel sx={{py:1}} htmlFor='apellidos'>Apellidos</InputLabel>
                                    <TextField      className='form-control'
                                                    sx={{width:'90%'}} 
                                                    required
                                                    size='small'
                                                    variant='standard'
                                                    onChange={changeApellidos}
                                                    id='apellidos' value={json.apellidos} />
                                </Grid>
                                <Grid item xs={12}><Divider/></Grid>
                            </Grid>
                            <Grid item container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <InputLabel sx={{py:1}} htmlFor='cedula'>Cedula</InputLabel>
                                    <TextField      className='form-control'
                                                    sx={{width:'90%'}} 
                                                    size='small'
                                                    id='cedula' value={json.cedula}
                                                    onChange={changeCedula}
                                                    helperText={errorText.cedula}
                                                    error={isNumber(json.cedula)}
                                                    required
                                                    variant='standard'
                                                    disabled={props.mode==='u'} />
                                </Grid>
                                <Grid item xs={0} md={6}/>
                                <Grid item xs={12} md={12}>
                                    <Divider textAlign="left">Contacto</Divider>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel sx={{py:1}} htmlFor='mail'>Correo</InputLabel>
                                    <TextField      className='form-control'
                                                    sx={{width:'90%'}} 
                                                    id='mail' value={json.mail}
                                                    size='small'
                                                    variant='standard'
                                                    onChange={changeMail}
                                                    error={isMail(json.mail)}
                                                    helperText={errorText.mail}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InputLabel sx={{py:1}} htmlFor='telefono'>Celular</InputLabel>
                                    <TextField      className='form-control'
                                                    sx={{width:'90%'}} 
                                                    id='telefono' value={json.telefono} 
                                                    size='small'
                                                    variant='standard'
                                                    onChange={changeTelefono}
                                                    helperText={errorText.telefono}
                                                    error={isNumber(json.telefono)}
                                     />
                                </Grid>
                                
                                {props.modo && 
                                <Grid item xs={6} lg={6}>
                                    <Box sx={{pt:3}}>
                                        <RolInput mode={props.mode}/>
                                    </Box>
                                </Grid>}
                                <Grid item xs={6} lg={3}>
                                    {props.modo && props.mode==='u' && 
                                    <Box sx={{pt:3}}>
                                    <FormControlLabel
                                        control={
                                            <Checkbox 
                                                checked={activo}
                                                onChange={handleCheck}
                                                inputProps={{ 'aria-label': 'controlled' }}
                                                color="success" />
                                        }
                                        label="Activo"
                                        />
                                    </Box>}
                                </Grid>
                                <Grid item xs={0} md={0}>
                                        <TextField hidden
                                        value={json.id} />

                                </Grid>
                            </Grid>
                    </Grid>
                
            </CardContent>
            <CardActions sx={{justifyContent:'right',px:4, pb:3}}>
                <Button 
                size="middle" 
                variant='contained' 
                onClick={handleSubmit}
                >
                    Guardar
                </Button>
            </CardActions>
        </Card>
    </React.Fragment>
  )
}

export default FormUserV2