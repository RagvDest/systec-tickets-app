import { Button, ClickAwayListener, Fade, Grow, MenuItem, MenuList, Paper, Popper, Typography } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';



const MenuContainer = styled.div`
    position:fixed;
    inset:40 auto;
    visibility:hidden;
    display:block;
`

const ButtonProfile = (props) => {
  const [open, setOpen] = useState(false);
  const menuContainer = document.getElementById("menu-container")


  const handleToggle = () => {
      debugger;
    setOpen((prevOpen)=> !prevOpen);
    if(open) menuContainer.style.visibility='visible';
    else menuContainer.style.visibility='hidden';
  };

  const handleClose = (event) => {
        setOpen(false);
        if(open) menuContainer.style.visibility='visible';
        else menuContainer.style.visibility='hidden';
  };


  return (
      <React.Fragment>
          <Button id="button-profile" color="inherit" aria-controls={open ? 'split-button-menu' : undefined}
                    onClick={handleToggle}>
                <AccountCircleIcon />
                    <Typography   variant="caption" component="h1" sx={{ flexGrow: 1, mx:2}}>
                        {props.user.username.u_usuario}
                    </Typography>
            </Button>
            <MenuContainer id='menu-container'>
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
