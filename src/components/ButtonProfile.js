import { Button, ClickAwayListener, Menu, MenuItem, MenuList, Paper, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';



const MenuContainer = styled.div`
    position:fixed;
    inset:40 auto;
    visibility:hidden;
    z-index: 1;
    display:block;
`

const ButtonProfile = (props) => {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const menuContainer = document.getElementById("menu-container")

  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

    useEffect(()=>{
        debugger;
        setUsername(props.user.username==null ? "": props.user.username.u_usuario);
    },[props.user]);

  const handleClose = (event) => {
        setOpen(false);
        if(menuContainer===null) return;
        if(open) menuContainer.style.visibility='visible';
        else menuContainer.style.visibility='hidden';
  };


  return (
      <React.Fragment>
          <Button id="button-profile" color="inherit" aria-controls={open ? 'split-button-menu' : undefined}
                    onClick={handleClick}>
                <AccountCircleIcon />
                    <Typography   variant="caption" component="h1" sx={{ flexGrow: 1, mx:2}}>
                        {username}
                    </Typography>
            </Button>

            <Menu
                open={openMenu}
                anchorEl={anchorEl}
                onClose={handleCloseMenu}
                MenuListProps={{
                  'aria-labelledby': 'basic-button',
                }}
            >
                <Button color='inherit' sx={{width:'100%'}} onClick={props.togglePerfil}>
                    <MenuItem key='1'>
                      Perfil
                    </MenuItem>
                </Button>
                <Button color='inherit' sx={{width:'100%'}} onClick={props.logOut}>
                    <MenuItem key='2'>
                        Cerrar sesión
                    </MenuItem>
                </Button>
            </Menu>

            <MenuContainer id='menu-container' sx={{zIndex:1}}>
                <Paper>
                    <ClickAwayListener onClickAway={handleClose}>
                        <MenuList id="split-button-menu">
                            <Button color='inherit' sx={{width:'100%'}} onClick={props.togglePerfil}>
                            <MenuItem
                                key='1'
                            >
                            Perfil
                            </MenuItem>
                            </Button>
                            <Button color='inherit' sx={{width:'100%'}} onClick={props.logOut}>
                            <MenuItem
                                key='2'
                            >
                            Cerrar sesión
                            </MenuItem>
                            </Button>
                        </MenuList>
                    </ClickAwayListener>
                </Paper>
                </MenuContainer>
      </React.Fragment>
  )
};

export default ButtonProfile;
