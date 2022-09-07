import { Alert, Autocomplete, Button, ButtonGroup, Card, CardActions, CardContent, CardHeader, Checkbox, DialogTitle, Divider, FormControl, FormControlLabel, Grid, InputLabel, MenuItem, Select, Snackbar, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import { Control, Form, Errors} from 'react-redux-form';


//validations
const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length<=len);
const minLength = (len) => (val) => (val) && (val.length>=len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z09._]+\.[A-Z]{2,4}$/i.test(val);


const filtros = [
    {label:'EMPLEADO',value:'61e7dc21aed590273949963d', id:0},
    {label:'CLIENTE',value:'61e7dc27aed590273949963f', id:1}
]

class FormUsuario extends React.Component{

    constructor(props) {
        super(props);

        this.state = {
            open:false,
            mensaje:'',
            rol:'CLIENTE',
            activo:true
        }
debugger;
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleSelect = this.handleSelect.bind(this);
        this.handleCheck = this.handleCheck.bind(this);

    };

    handleCheck = (e) => {
        this.setState({
            activo:e.target.checked
        });
    }

    handleClose = (e) =>{
        this.toast ={open:false,mensaje:''};
    }

    handleSelect = (e) =>{
        let value = e.target.value;
        if(!e) return;
        
        console.log(value);
        this.setState({
            rol:value
        });
        console.log(this.state);
    }
    
    handleSubmit = async (values,e) =>{
        debugger;
        e.preventDefault();
        if(this.props.mode==='u'){
            await this.props.updateUser(values,this.state.activo,this.props.modo);
            await this.props.closeForm();

        }else{
            let rol = document.getElementById('combo-box') != null ? document.getElementById('combo-box').value : 'CLIENTE';
            await this.props.addUser(values,rol);
            this.props.resetForm();
            this.props.closeModal();
        }
            
    }

    
    render(){
        const RolInput = (props) =>{
            if(this.props.mode==='u'){
                    return(<React.Fragment/>);
            }else{
            return (
                <React.Fragment sx={{m:'auto'}}>
                <Autocomplete
                    disablePortal
                    disableClearable
                    id="combo-box"
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
                <Box className="">
                <Card>
                <Form model='userInfo' onSubmit={(values,e) => {this.handleSubmit(values,e)}}>
                    <CardHeader title={this.props.mode==='u' ? 'Actualizar Usuario' : 'Crear Usuario'} sx={{p:3, px:4, borderBottom:'1px solid',position:'sticky'}}/>
                    <CardContent>
                            <Grid container direction="column" spacing={2} sx={{px:3,py:1}}>
                                    <Grid item container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel sx={{py:1}} htmlFor='username'>Usuario</InputLabel>
                                            <Control.text   className="form-control" 
                                                            sx={{width:'100%'}} 
                                                            id='username' name="username" 
                                                            validators={{
                                                                required, minLength:minLength(4), maxLength: maxLength(8)
                                                            }}
                                                            model=".username"
                                                            defaultValue={this.props.mode==='u' ? this.props.userSelected.username.u_usuario : ''} />
                                            <Errors 
                                                className="text-danger"
                                                model=".username"
                                                show="touched"
                                                messages={{
                                                    required:'Requerido. '
                                                }}
                                            />
                                            <Errors 
                                                className="text-danger"
                                                model=".username"
                                                show="touched"
                                                messages={{
                                                    minLength: 'Debe ser mayor a 3 caracteres',
                                                    maxLength: 'Debe ser menor de 9 caracteres'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={0} md={6}/>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel sx={{py:1}} htmlFor='nombres'>Nombres</InputLabel>
                                            <Control.text   className="form-control" 
                                                            sx={{width:'100%'}} 
                                                            id='nombres' name="nombres" 
                                                            validators={{
                                                                required
                                                            }}
                                                            model=".nombres"
                                                            defaultValue={this.props.mode==='u' ? this.props.userSelected.persona.p_nombres : ''} />
                                            <Errors 
                                                className="text-danger"
                                                model=".nombres"
                                                show="touched"
                                                messages={{
                                                    required:'Requerido',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel sx={{py:1}} htmlFor='apellidos'>Apellidos</InputLabel>
                                            <Control.text   className='form-control'
                                                            sx={{width:'100%'}} 
                                                            id='apellidos' name="apellidos" 
                                                            validators={{required}}
                                                            model='.apellidos'
                                                            defaultValue={this.props.mode==='u' ? this.props.userSelected.persona.p_apellidos : ''} />                                            <Errors
                                                className="text-danger"
                                                model=".apellidos"
                                                show="touched"
                                                messages={{
                                                    required:'Requerido',
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12}><Divider/></Grid>
                                    </Grid>
                                    <Grid item container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel sx={{py:1}} htmlFor='cedula'>Cedula</InputLabel>
                                            <Control.text   className='form-control'
                                                            sx={{width:'100%'}} 
                                                            id='cedula' name="cedula" 
                                                            validators={{required,isNumber}}
                                                            model='.cedula'
                                                            readOnly={this.props.mode==='u'}
                                                            defaultValue={this.props.mode==='u' ? this.props.userSelected.persona.p_cedula : ''} />
                                            <Errors 
                                                className="text-danger"
                                                model=".cedula"
                                                show="touched"
                                                messages={{
                                                    required:'Requerido.  '
                                                }}
                                            />
                                            <Errors 
                                                className="text-danger"
                                                model=".cedula"
                                                show="touched"
                                                messages={{
                                                    isNumber:'Solo números'
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={0} md={6}/>
                                        <Grid item xs={12} md={12}>
                                            <Divider textAlign="left">Contacto</Divider>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <InputLabel sx={{py:1}} htmlFor='mail'>Correo</InputLabel>
                                            <Control.text   className='form-control'
                                                            sx={{width:'100%'}} 
                                                            id='mail' name="mail" 
                                                            validators={{required,validEmail}}
                                                            model='.mail'
                                                            defaultValue={this.props.mode==='u' ? this.props.userSelected.username.u_mail : ''} />
                                            <Errors 
                                                className="text-danger"
                                                model=".mail"
                                                show="touched"
                                                messages={{
                                                    required:'Requerido.  ',
                                                    validEmail:'Correo inválido'
                                                }}
                                            />
                                        </Grid>
                                        
                                        {this.props.modo && 
                                        <Grid item xs={6} lg={3}>
                                            <Box sx={{pt:3}}>
                                                <RolInput mode={this.props.mode}/>
                                            </Box>
                                        </Grid>}
                                        <Grid item xs={6} lg={3}>
                                            {this.props.modo && this.props.mode==='u' && 
                                            <Box sx={{pt:3}}>
                                            <FormControlLabel
                                                control={
                                                    <Checkbox 
                                                        defaultChecked 
                                                        checked={this.activo}
                                                        onChange={this.handleCheck}
                                                        inputProps={{ 'aria-label': 'controlled' }}
                                                        color="success" />
                                                }
                                                label="Activo"
                                                />
                                            </Box>}
                                        </Grid>
                                        <Grid item xs={0} md={0}>
                                                <Control.text hidden
                                                model='.id'
                                                defaultValue={this.props.mode==='u' ? this.props.userSelected.username._id : ''} />

                                        </Grid>
                                    </Grid>
                            </Grid>
                        
                    </CardContent>
                    <CardActions sx={{justifyContent:'right',px:4, pb:3}}>
                        <Button size="middle" variant='contained' type=''>
                            Guardar
                        </Button>
                    </CardActions>
                    </Form>
                </Card>
                </Box> 
                <Snackbar
                        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                        open={this.state.open}
                        autoHideDuration={6000}
                        onClose={this.handleClose}
                        message={this.state.mensaje}
                        key='top-right'
                    >
                        <Alert severity="error">{this.state.mensaje}</Alert>
                    </Snackbar>
            </React.Fragment>
        )
    }
};

export default FormUsuario;
