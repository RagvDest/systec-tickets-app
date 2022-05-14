import React from 'react';
import styled from 'styled-components'
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Link, Typography } from '@mui/material';
import { Box } from '@mui/system';

const Container = styled.div`
    position:fixed;
    width: 100%;
    left: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    background-color: rgb(17,45,50,0.76);
    z-index: 1300;
`

const RedesContainer = styled.div`
    display:flex;
    flex:1;
    padding: 5px;
    text-align: left;
    float:right;
    color:white;
`

const RightsContainer = styled.div`
    display:flex;
    flex:1;
    justify-content: right;
    align-items: center;
    padding: 15px;
    color:#FFF;
`

const Footer = () => {
  return (
      <Container>
          <RedesContainer>
              <Box sx={{m:0.7, ml:2}}>
                  <Link href="#" color="inherit"><FacebookIcon/></Link>
              </Box>
              <Box sx={{m:0.7}}>
                <Link href="#" color="inherit"><TwitterIcon/></Link>
              </Box>
              <Box sx={{m:0.7}}>
                <Link href="#" color="inherit"><EmailIcon/></Link>
              </Box>
          </RedesContainer>
          <RightsContainer>
            <Typography variant="caption" component="span" fontSize={10} sx={{opacity:0.6}}>
                © SYSTEC 2021.TODOS LOS DERECHOS RESERVADOS
            </Typography>
          </RightsContainer>
      </Container>
  );
};

export default Footer;
