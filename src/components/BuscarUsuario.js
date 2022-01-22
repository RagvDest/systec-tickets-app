import { Autocomplete, Box, Button, ButtonGroup, ClickAwayListener, Grid, InputAdornment, MenuItem, MenuList, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import {styled as styled1} from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';

const DrawerHeader = styled1('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  }));

const Container = styled.div`
    flex-direction: column;
    
`
const MenuContainer = styled.div`
    position:fixed;
    inset:40 auto;
    display:none;
`

const BuscarUsuario = () => {
    const [filtro,setFiltro] = useState("");
    const [text,setText] = useState("");
  
    const filtros = [
        {label:'Username'},
        {label:'Nombres'}
    ]

    const handleSearch = (e) => {
        if(e.key == 'Enter'){
            setText(e.target.value);
        }
            
    }

    const handleSelect = (e) => {
        console.log(e.target.value);
        setFiltro(e.target.value);
    }

  return (
    <Box component="main" sx={{ flexGrow: 1, p: 5, mr:4 }}>
        <DrawerHeader />
        <Container>
            <Grid container spacing={1}>
                <Grid item xs={12} md={4} sx={{m:'auto'}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{mx:3, width:'100%'}}>
                        <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={filtros}
                        sx={{ width: '100%' }}
                        onSelect={handleSelect}
                        renderInput={(params) => <TextField label="Buscar por:" {...params}/>}
                        />
                    </ButtonGroup>
                </Grid>
                <Grid item xs={12} md={8}>
                    <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder="Buscar . . ."
                    onKeyDown={handleSearch}
                    endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>} sx={{mx:3, width:'100%', size:'small'}}/>
                </Grid>
            </Grid>
        </Container>
      </Box>
  );
};

export default BuscarUsuario;
