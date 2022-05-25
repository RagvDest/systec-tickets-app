import * as React from 'react';
import { styled } from '@mui/material/styles';
import styled1 from 'styled-components';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import { Alert, AlertTitle, Button, Container, Dialog, Grid, Snackbar, Tooltip, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LaptopIcon from '@mui/icons-material/Laptop';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ButtonProfile from './ButtonProfile';
import {Link as LinkRoute, Outlet} from 'react-router-dom';
import Perfil from './Perfil';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logicLogout } from '../features/actions/userActions';
import { selectUser } from '../features/userSlice';
import { clearPedidoState } from '../features/pedidoSlice';
import { clearTicketState } from '../features/ticketSlice';
import { clearUser } from '../features/userSlice';
import { clearUsers } from '../features/searchUsersSlice';
import { searchNotifis } from '../features/actions/appActions';
import { clearApp, selectApp,  setTrigger } from '../features/appSlice';
import { clearDash } from '../features/dashboardSlice';

const drawerWidth = 240;

const Systec = styled1.div`
    color:white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));


const mapStateToProps = state => {
  return {
      user:state.user.user
  };
};


function SideBar(props) {
  const [openPerfil, setOpenPerfil] = React.useState(false);

   // Para SnackBar
   const [openToast,setOpenToast] = React.useState(false);
   const [mensaje,setMensaje] = React.useState([]);
   const [tipoAlert,setTipoAlert] = React.useState("info");


  const userLogin = useSelector(selectUser);



  const appItems = useSelector(selectApp);
  const dispatch = useDispatch();
  
 
 /* React.useEffect(()=>{
    debugger;
    setMensaje(currentMensaje => currentMensaje.concat(toast));
    setOpenToast(true);
    setTipoAlert("error");
  },[toast])*/

  React.useEffect(async ()=>{
    if(appItems.trigger) await handleToast();
  },[appItems.trigger===true])

  const handleToast = () =>{
    setOpenToast(false);
    setMensaje(currentMensaje => []);
    setMensaje(currentMensaje => currentMensaje.concat(appItems.mensaje));
    setTipoAlert(appItems.tipoMensaje);
    setOpenToast(true);
    dispatch(setTrigger(false));
  }

  React.useEffect(async ()=>{
    const getNotificationFromServer= async (data) =>{
      debugger;
      setOpenToast(false);
      setMensaje(currentMensaje => []);
      setMensaje(currentMensaje => currentMensaje.concat(data));
      setOpenToast(true);
      setTipoAlert("info");

      await dispatch(searchNotifis());
    }

    if(props.socket!=null){
      props.socket.on('getNotificationFromServer', getNotificationFromServer)
      props.socket.emit('connected',userLogin.username['_id']);
    }
    
    return () => props.socket.off('getNotificationFromServer',getNotificationFromServer);

  },[props.socket]);

  const handleClose = () =>{
    setMensaje([]);
    setOpenToast(false);
  }

  const togglePerfil = () => {
    debugger;
    setOpenPerfil(!openPerfil);
  };

  const closePerfil = () =>{
    setOpenPerfil(false);
  }

  const logOut = () =>{
    dispatch(logicLogout())
    dispatch(clearPedidoState());
    dispatch(clearTicketState());
    dispatch(clearUsers());
    dispatch(clearUser());
    dispatch(clearApp());
    dispatch(clearDash());
  }

 
  // AppBar
  const Pages = () =>{
    const pagesEmpl = [
      {
        link:'/',
        name:'Resumen'
      },
      {
        link:'users',
        name:'Usuarios'
      },
      {
        link:'pedidos',
        name:'Pedidos'
      },
      {
        link:'#',
        name:'Manual'
      }
    ];
    const pagesCli = [
      {
        link:'/',
        name:'Resumen'
      },
      {
        link:'pedidos',
        name:'Pedidos'
      },
      {
        link:'#',
        name:'Manual'
      }
    ]
    if(['Administrador','Empleado'].includes(userLogin.rol))
      return(
        <React.Fragment>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md:'flex' } }}>
              {pagesEmpl.map((page,index) => (
                <LinkRoute to={page.link} className="anchor-no-line">
                <Button
                  key={index}
                  sx={{  my: 2, color: '#fff', display: 'block'}}
                  >
                  {page.name}
                </Button>
                </LinkRoute>
              ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md:'none' } }}>
              {pagesEmpl.map((page,index) => (
                <Tooltip title={page.name}>
                  <IconButton
                    key={index}
                    sx={{mb:1,mx:'auto', color: 'white', display: 'block' }}
                  >
                    <LinkRoute to={page.link} className="anchor-no-line">
                      {page.name === 'Resumen' && <DashboardIcon  sx={{color:'white'}}/>}
                      {page.name === 'Usuarios' && <PersonIcon sx={{color:'white'}}/>}
                      {page.name === 'Pedidos' && <LaptopIcon  sx={{color:'white'}}/>}
                      {page.name === 'Manual' && <LibraryBooksIcon  sx={{color:'white'}}/>}
                    </LinkRoute>
                  </IconButton>
                </Tooltip>
              ))}
          </Box>
        </React.Fragment>
        
      )
    else return(
      <React.Fragment>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex' } }}>
                {pagesCli.map((page,index) => (
                  <LinkRoute to={page.link} className="anchor-no-line">
                  <Button
                    key={index}
                    sx={{  my: 2, color: '#fff', display: 'block'}}
                    >
                    {page.name}
                  </Button>
                  </LinkRoute>
                ))}
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md:'none' } }}>
              {pagesEmpl.map((page,index) => (
                <Tooltip title={page.name}>
                  <IconButton
                    key={index}
                    sx={{  my: 2, mx:'auto', color: 'white', display: 'block'}}
                  >
                    <LinkRoute to={page.link} className="anchor-no-line">
                      {page.name === 'Resumen' && <DashboardIcon  sx={{color:'white'}}/>}
                      {page.name === 'Pedidos' && <LaptopIcon   sx={{color:'white'}}/>}
                      {page.name === 'Manual' && <LibraryBooksIcon   sx={{color:'white'}}/>}
                    </LinkRoute>
                  </IconButton>
                </Tooltip>
              ))}
          </Box>
        </React.Fragment>
    )
  }

  
  return (
    <Box sx={{ display: 'flex', my:2 }}>
      <CssBaseline />
      <AppBar sx={{backgroundColor:'#254E58'}}>
      <Toolbar>
        <Container maxWidth="x0.9" sx={{mt:2}}>
            <Grid container>
              <Grid item  xs={9} md={3} lg={2} sx={{display:'flex',my:'auto'}}>
                <LinkRoute to='/' className="anchor-no-line">
                  <Box sx={{display:'flex',alignContent: 'center'}}>
                  <Box  component="img" 
                        sx={{
                          height: 50,
                          width: 50,
                          mx:1,
                          flexGrow:1
                        }}
                        alt="Logo" src="https://images.vexels.com/media/users/3/157564/isolated/preview/d7d05c7c1070e49a5385019c254901a6-icono-de-portatil-simple.png"
                  />
                  
                    <Typography variant="h4" component="h1" sx={{ ml:2, my:'auto'}}>
                        <Systec>SYSTEC</Systec>
                    </Typography>
                  
                  </Box>
                </LinkRoute>
              </Grid>
              <Grid item md={6} lg={7} sx={{margin:'auto', display:{xs:'none',md:'flex'}}}>
                <Pages/>
              </Grid>
              <Grid item xs={3} md={2} sx={{margin:'auto'}}>
                <Box sx={{textAlign:'end'}}>
                    <ButtonProfile user={userLogin} togglePerfil={togglePerfil} logOut={logOut}/>
                </Box>
              </Grid>
              <Grid item xs={12} md={0} sx={{margin:'auto',display:{xs:'flex',md:'none'}}}>
                  <Pages/>
              </Grid>
            </Grid>
        </Container>
        </Toolbar>
      </AppBar>

      <Outlet/>
      
      <Dialog
                  open={openPerfil}
                  onClose={closePerfil}
                  fullWidth
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><Perfil user={userLogin} closeModal={closePerfil} /></Dialog>
    
    
    
    <Snackbar open={openToast} 
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
    </Box>
  );
}

export default connect(mapStateToProps)(SideBar)