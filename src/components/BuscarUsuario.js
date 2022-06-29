import { Autocomplete, Box,  ButtonGroup,  Grid, InputAdornment,  OutlinedInput, TextField } from '@mui/material';
import React, { useState } from 'react';
import styled from 'styled-components';
import {styled as styled1} from '@mui/material/styles';

import SearchIcon from '@mui/icons-material/Search';
import { useDispatch } from 'react-redux';
import { searchUsers } from '../features/actions/searchUsersActions';

const Container = styled.div`
    flex-direction: column;
    
`

const BuscarUsuario = (props) => {
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
    <Box component="main" sx={{px:8}}>
        <Container>
            <Grid container spacing={4}>
                <Grid item xs={5} md={2} sx={{mx:'auto',width:'100%'}} style={{paddingLeft:0, maxWidth:'100%'}}>
                    <ButtonGroup variant="contained" aria-label="outlined primary button group" sx={{width:'100%'}}>
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
                <Grid item xs={7} md={6}>
                    <OutlinedInput
                    id="outlined-adornment-weight"
                    placeholder="Buscar . . ."
                    label=''
                    onKeyDown={handleSearch}
                    endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>} sx={{mx:3, width:'100%', size:'small'}}/>
                </Grid>
                <Grid item xs={0} md={1}></Grid>
            </Grid>
        </Container>
      </Box>
  );
};

export default BuscarUsuario;
