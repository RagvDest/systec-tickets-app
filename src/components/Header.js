import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import styled from 'styled-components';


const Container = styled.div`
    position:absolute;
    width:100%;
`

const Systec = styled.div`
    color:white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

`
    


function Header() {
  return (
      <Container>
          <Box sx={{flexGrow:1, textAlign:'left'}}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                    <Box
                        component="img"
                        sx={{
                            height: 50,
                            mx:2,
                            width: 50
                        }}
                        alt="Logo"
                        src="https://images.vexels.com/media/users/3/157564/isolated/preview/d7d05c7c1070e49a5385019c254901a6-icono-de-portatil-simple.png"
                    />
                    <Typography 
                    variant="h4" 
                    component="h1"
                    sx={{ flexGrow: 1, mx:3}}>
                        <Systec>SYSTEC</Systec>
                    </Typography>
                </Toolbar>
            </AppBar>
        </Box>
      </Container>
  );
}

export default Header;