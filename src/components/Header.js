import React from 'react';
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Container = styled.div`
    position:absolute;
    width:100%;
    z-index: 2;
`

const Systec = styled.div`
    color:white;
    text-shadow: -1px 0 black, 0 1px black, 1px 0 black, 0 -1px black;

`
    


function Header() {
    const navigate = useNavigate();

    const clickHeader = () =>{
        debugger;
        navigate(`/`);
    }

  return (

    
      <Container>
          <Box sx={{flexGrow:1, textAlign:'left',cursor:'pointer'}}>
            <AppBar position="static" color="transparent" elevation={0}>
                <Toolbar>
                <Link to='/' className="anchor-no-line">
                  <Box sx={{display:'flex',alignContent: 'center'}}>
                  <Box  component="img" 
                        sx={{
                          height: 50,
                          width: 50,
                          mx:1,
                          flexGrow:1
                        }}
                        alt="Logo" src="/logo.png"
                  />
                  
                    <Typography variant="h4" component="h1" sx={{ ml:2, my:'auto'}}>
                        <Systec>SYSTEC</Systec>
                    </Typography>
                  
                  </Box>
                </Link>
                </Toolbar>
            </AppBar>
        </Box>
      </Container>
  );
}

export default Header;
