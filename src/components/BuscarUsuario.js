import { Autocomplete, Box, Button, ButtonGroup, ClickAwayListener, Grid, InputAdornment, MenuItem, MenuList, OutlinedInput, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import {styled as styled1} from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../features/actions/searchUsersActions';

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

const BuscarUsuario = () => {
    const dispatch = useDispatch();
    const [filtro,setFiltro] = useState("");
  
    const filtros = [
        {label:'Username', id:0},
        {label:'Nombres', id:1},
        {label:'Cédula', id:2},
        {label:'Correo',id:3}
    ]

    const handleSearch = (e) => {
        if(e.key == 'Enter'){
            dispatch(searchUsers(filtro,e.target.value));
        }
            
    }

    const handleSelect = (e) => {
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
                        disableClearable
                        isOptionEqualToValue={(option, value) => option.id === value.id}
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
