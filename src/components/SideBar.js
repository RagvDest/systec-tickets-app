import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import styled1 from 'styled-components';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Dialog, Grid, Link, Typography } from '@mui/material';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';

import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import LaptopIcon from '@mui/icons-material/Laptop';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import ButtonProfile from './ButtonProfile';
import Panel from './Panel';
import {Link as LinkRoute} from 'react-router-dom';
import Usuarios from '../pages/Usuarios';
import Perfil from './Perfil';
import { connect, useDispatch, useSelector } from 'react-redux';
import { logicLogout } from '../features/actions/userActions';
import Pedidos from '../pages/Pedidos';
import { selectPag, setPagina } from '../features/pagSlice';
import PedidoContainer from '../pages/PedidoContainer';

const drawerWidth = 240;

const Systec = styled1.div`
    color:white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;
`

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(9)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

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

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const FooterContainer = styled1.div`
  background-color:#254E58;
  height:100%;
  display:flex;
  flex-direction: column;
  position:relative;
`

const RedesContainer = styled1.div`
    color:white;
    flex-wrap: wrap;
    text-align: left;
    margin:auto;
`
const RightsContainer = styled1.div`
  display:flex;
  margin:auto;
`

const RedContainer = styled1.div`
  margin: 15px;
  text-align:center;
  
`

const mapStateToProps = state => {
  return {
      user:state.user.user
  };
};


function SideBar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [openPerfil, setOpenPerfil] = React.useState(false);
  const pag = useSelector(selectPag);
  const dispatch = useDispatch();
  
  React.useEffect(()=>{
    console.log(pag);
  },[pag]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const togglePerfil = () => {
    debugger;
    setOpenPerfil(!openPerfil);
  };

  const logOut = () =>{
    dispatch(logicLogout())
  }

  const handleChangePag = (e) =>{
    dispatch(setPagina(e));
  } 

  /*
  const Lista = () => {
    const text = ['RESUMEN','USUARIOS','PEDIDOS','MANUAL'];
    
    const lista = text.map(
      (item) =>{
        return (
          <ListItem button key={item,index} sx={{p:3}}>
              <ListItemIcon>
                {() => {
                  switch (item){
                    case "RESUMEN": return <DashboardIcon sx={{color:'white'}}/>;
                    case "USUARIOS": return  <PersonIcon sx={{color:'white'}}/>;
                    case "PEDIDOS": return  <LaptopIcon sx={{color:'white'}}/>;
                    case "MANUAL": return  <LibraryBooksIcon sx={{color:'white'}}/>
                  }
                } 
              }
              </ListItemIcon>
              <ListItemText >{item}</ListItemText>
          </ListItem>
        );
      }
    );

    return (
      {lista}
    )
  }*/

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:'#254E58'}}>
        <Toolbar>
          <Grid container>
            <Grid item xs={2} md={1} sx={{margin:'auto'}}>
              <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  onClick={handleDrawerOpen}
                  edge="start"
                  sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                  }}>
                  <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item xs={8} md={10} sx={{display:'flex',margin:'auto'}}>
              <Box component="img" sx={{
                            height: 50,
                            width: 50,
                            mx:3
                        }}
                        alt="Logo" src="https://images.vexels.com/media/users/3/157564/isolated/preview/d7d05c7c1070e49a5385019c254901a6-icono-de-portatil-simple.png"
                    />
                    <Typography   variant="h4" component="h1" sx={{ flexGrow: 1}}>
                        <Systec>SYSTEC</Systec>
                    </Typography>
            </Grid>
            <Grid item xs={2} md={1} sx={{margin:'auto'}}>
               <Box>
                        <ButtonProfile user={props.user} togglePerfil={togglePerfil} logOut={logOut}/>
                    </Box>
            </Grid>
          </Grid>
            
                    
                   
        </Toolbar>
      </AppBar>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader sx={{backgroundColor:"#254E58"}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon sx={{color:'white'}}/> : <ChevronLeftIcon  sx={{color:'white'}}/>}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List sx={{backgroundColor:"#254E58",color:'white'}}>
            <ListItem button key={'Resumen'} sx={{p:3}}>
              <ListItemIcon>
                <DashboardIcon sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText >RESUMEN</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>{handleChangePag('us')}} key={'Usuarios'} sx={{p:3}}>
                <ListItemIcon>
                  <PersonIcon sx={{color:'white'}}/>
                </ListItemIcon>
                  <ListItemText >USUARIOS</ListItemText>
            </ListItem>
            <ListItem button onClick={()=>{handleChangePag('ped')}} key={'Pedidos'} sx={{p:3}}>
              <ListItemIcon>
                <LaptopIcon sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText >PEDIDOS</ListItemText>
            </ListItem>
            <ListItem button key={'Manual'} sx={{p:3}}>
              <ListItemIcon>
                <LibraryBooksIcon sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText >MANUAL</ListItemText>
            </ListItem>
        </List>
        <Divider />
        <FooterContainer>
        <RedesContainer>
              <RedContainer>
                  <Link href="#" color="inherit"><FacebookIcon sx={{fontSize:'medium'}}/></Link>
              </RedContainer>
              <RedContainer >
                <Link href="#" color="inherit"><TwitterIcon sx={{fontSize:'medium'}}/></Link>
              </RedContainer>
              <RedContainer >
                <Link href="#" color="inherit"><EmailIcon sx={{fontSize:'medium'}}/></Link>
              </RedContainer>
          </RedesContainer>
          <RightsContainer>
            <Typography variant="caption" component="span" color="white" fontSize={10} sx={{opacity:0.6, whiteSpace:'normal', p:1, textAlign:'center'}}>
                    {open ? '© SYSTEC 2022.TODOS LOS DERECHOS RESERVADOS' : '© SYSTEC 2022'}
            </Typography>
          </RightsContainer>
        </FooterContainer>
      </Drawer>
      {pag==='us' ? <Usuarios/> : null }
      {pag==='ped' ? <Pedidos/> : null}
      {pag==='pedinfo' ? <PedidoContainer/> : null}
      
      <Dialog
                  open={openPerfil}
                  onClose={togglePerfil}
                  fullWidth
                  PaperProps={{sx:{height:'100%',maxWidth:'70vw'}}}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                ><Perfil user={props.user}/></Dialog>
    </Box>
  );
}

export default connect(mapStateToProps)(SideBar)