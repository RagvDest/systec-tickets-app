import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import styled1 from 'styled-components';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import { Button, Link, Typography } from '@mui/material';
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
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

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

export default function SideBar(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar position="fixed" open={open} sx={{backgroundColor:'#254E58'}}>
        <Toolbar>
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
                    <Box component="img" sx={{
                            height: 50,
                            mx:2,
                            width: 50
                        }}
                        alt="Logo" src="https://images.vexels.com/media/users/3/157564/isolated/preview/d7d05c7c1070e49a5385019c254901a6-icono-de-portatil-simple.png"
                    />
                    <Typography   variant="h4" component="h1" sx={{ flexGrow: 1, mx:3}}>
                        <Systec>SYSTEC</Systec>
                    </Typography>
                    <Box>
                        <Button color="inherit">
                            <AccountCircleIcon/>
                                <Typography   variant="caption" component="h1" sx={{ flexGrow: 1, mx:2}}>
                                    {props.user.username}
                                </Typography>
                        </Button>
                    </Box>
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
            <ListItem button key={'Usuarios'} sx={{p:3}}>
              <ListItemIcon>
                <PersonIcon sx={{color:'white'}}/>
              </ListItemIcon>
              <ListItemText >USUARIOS</ListItemText>
            </ListItem>
            <ListItem button key={'Pedidos'} sx={{p:3}}>
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
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Typography paragraph>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
          enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
          imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
          Convallis convallis tellus id interdum velit laoreet id donec ultrices.
          Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
          adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
          nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
          leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
          feugiat vivamus at augue. At augue eget arcu dictum varius duis at
          consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
          sapien faucibus et molestie ac.
        </Typography>
        <Typography paragraph>
          Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
          eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
          neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
          tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
          sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
          tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
          gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
          et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
          tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
          eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
          posuere sollicitudin aliquam ultrices sagittis orci a.
        </Typography>
      </Box>
    </Box>
  );
}