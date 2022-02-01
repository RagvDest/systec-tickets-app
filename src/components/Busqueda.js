import React, { useState } from 'react';
import styled from 'styled-components';
import {styled as styled1} from '@mui/material/styles';
import SortIcon from '@mui/icons-material/Sort';
import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import SearchIcon from '@mui/icons-material/Search';
import { Autocomplete, Box, ButtonGroup, FormControl, Grid, InputAdornment, InputLabel, MenuItem, OutlinedInput, Select, TextField, Typography } from '@mui/material';
import { searchPedidos } from '../features/actions/pedidoActions';

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

const Busqueda = () => {
    const dispatch = useDispatch();
    const [filtro,setFiltro] = useState("");
    const [orden,setOrden] = useState("desc");
    const [estado,setEstado] = useState("TODOS");
  
    const filtros = [
        {label:'Nombres', id:0},
        {label:'Cédula', id:1}
    ]

    const handleSearch = (e) => {
        if(e.key == 'Enter'){
           dispatch(searchPedidos(filtro,e.target.value,orden,estado));
        }
            
    }

    const changeOrden = (e) =>{
        setOrden(e.target.value);
    }

    const handleSelect = (e) => {
        setFiltro(e.target.value);
    }
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 5, mr:4 }}>
    <DrawerHeader />
    <Container>
        <Grid container spacing={4}>
            <Grid item xs={12} md={3} sx={{m:'auto'}}>
                <ButtonGroup variant="contained" aria-label="" sx={{width:'100%'}}>
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
            <Grid item xs={12} md={6} sx={{margin:'auto'}}>
                <OutlinedInput
                id="outlined-adornment-weight"
                label={null}
                placeholder="Buscar . . ."
                onKeyDown={handleSearch}
                endAdornment={<InputAdornment position="end"><SearchIcon/></InputAdornment>} sx={{width:'100%', size:'small'}}/>
            </Grid>
            <Grid item xs={12} md={2} sx={{m:'auto',minWidth:''}}>
                <FormControl sx={{}}>
                <InputLabel id="demo-multiple-name-label">Ordenar por:</InputLabel>
                    <Select 
                    value={orden}
                    onChange={changeOrden}
                    label='Ordenar:'
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={'desc'} selected>Más nuevos</MenuItem>
                    <MenuItem value={'asc'}>Más antiguos</MenuItem>
                    </Select>
                </FormControl>
            </Grid>
        </Grid>
    </Container>
  </Box>
  )
};

export default Busqueda;
